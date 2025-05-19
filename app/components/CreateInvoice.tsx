"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/persian-calendar";
import { format } from "date-fns-jalali";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChevronsUpDown,
  DotSquare,
  PanelBottom,
  PlusCircle,
  Settings2Icon,
  Trash,
} from "lucide-react";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { createInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, productSchema } from "../utils/zodSchemas";
import { formatCurrency, getCurrencyName } from "../utils/formatCurrency";
import { formatError } from "../utils/formatError";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";

interface iAppProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

export default function CreateInvoice({
  address,
  firstName,
  lastName,
  email,
}: iAppProps) {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDueDate, setSelectedDueDate] = useState(new Date());
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("USD");
  const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);
  const [currencyPopover, setCurrencyPopover] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const [items, setItems]: any = useState([
    {
      title: "",
      quantity: "",
      price: "",
      errors: {},
    },
  ]);

  useEffect(() => {
    fetch("/api/currency")
      .then((data) => data.json())
      .then((data) => setCurrencies(data));
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent>
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />
          <input
            type="hidden"
            name={fields.dueDate.name}
            value={selectedDueDate.toISOString()}
          />
          <input
            type="hidden"
            name={fields.total.name}
            value={calculateTotal}
          />
          <input type="hidden" name={fields.currency.name} value={currency} />
          <div className="p-6 flex flex-col mb-2">
            <div className="flex items-center w-fit gap-4">
              <Badge variant="secondary">پیش‌نویس</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="تست 123"
              />
            </div>
            <p className="text-sm text-red-500">
              {formatError(fields.invoiceName.errors)}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label>شماره فاکتور</Label>
              <div className="flex">
                <span className="px-3 border border-l-0 rounded-r-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  className="rounded-l-none"
                  placeholder="5"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                />
              </div>
              <p className="text-red-500 text-sm">
                {formatError(fields.invoiceNumber.errors)}
              </p>
            </div>
            <div className="flex flex-col">
              <Label>ارز مبنا</Label>
              <Popover open={currencyPopover} onOpenChange={setCurrencyPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-[200px] justify-between"
                  >
                    {currency ? getCurrencyName(currency) : "انتخاب ارز"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="جستجو..." />
                    <CommandList>
                      <CommandEmpty>گشتم نبود نگرد نیست</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[200px]">
                          {currencies.map((currency: any) => (
                            <CommandItem
                              key={currency.id}
                              value={
                                currency.name + "||" + currency.currencyName
                              }
                              className="justify-end pr-3"
                              onSelect={(currentValue) => {
                                setCurrency(currentValue.split("||")[1]);
                                setCurrencyPopover(false);
                              }}
                            >
                              {currency.name}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <p className="text-red-500 text-sm">
                {formatError(fields.currency.errors)}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>از</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  placeholder="نام شما"
                  defaultValue={firstName + " " + lastName}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.fromName.errors)}
                </p>
                <Input
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  placeholder="ایمیل شما"
                  defaultValue={email}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.fromEmail.errors)}
                </p>
                <Input
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  placeholder="آدرس شما"
                  defaultValue={address}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.fromAddress.errors)}
                </p>
              </div>
            </div>
            <div>
              <Label>به</Label>
              <div className="space-y-2">
                <Input
                  placeholder="نام مشتری"
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.clientName.errors)}
                </p>
                <Input
                  placeholder="ایمیل مشتری"
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.clientEmail.errors)}
                </p>
                <Input
                  placeholder="آدرس مشتری"
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.clientAddress.errors)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div>
                <Label>تاریخ صدور</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />
                    {selectedDate ? (
                      format(selectedDate, "yyyy MMMM d")
                    ) : (
                      <span>تاریخ انتخاب کنید</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date: any) => {
                      if (selectedDueDate < date) {
                        setSelectedDueDate(date);
                      }
                      setSelectedDate(date || new Date());
                    }}
                    mode="single"
                    fromDate={new Date()}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">
                {formatError(fields.date.errors)}
              </p>
            </div>
            <div>
              <div>
                <Label>مهلت پرداخت</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />
                    {selectedDueDate ? (
                      format(selectedDueDate, "yyyy MMMM d")
                    ) : (
                      <span>تاریخ انتخاب کنید</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDueDate}
                    onSelect={(date: any) =>
                      setSelectedDueDate(date || new Date())
                    }
                    mode="single"
                    disabled={{ before: selectedDate }}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">
                {formatError(fields.dueDate.errors)}
              </p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-1 flex justify-center items-center"><PanelBottom/></p>
              <p className="col-span-5">توضیحات</p>
              <p className="col-span-3">تعداد</p>
              <p className="col-span-3">قیمت</p>
            </div>
            <div>
              {items.map((item: any, key: number) => (
                <div key={key} className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={items.length == 1}>
                        <Button variant="outline">
                          <DotSquare />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="flex flex-col items-end">
                        <DropdownMenuLabel>عملیات‌ها</DropdownMenuLabel>
                        <DropdownMenuGroup className="w-full">
                          <DropdownMenuItem
                            className="flex items-center justify-end"
                            onClick={() => {}}
                          >
                            حذف <Trash />
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="col-span-5">
                    <Input
                      placeholder="نام و توضیحات محصول / خدمات"
                      defaultValue={item.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const changedItems = items;
                        changedItems[key].quantity = e.target.value;
                        if (
                          e.target.value == ""
                        ) {
                          changedItems[key].errors.description =
                            "این فیلد نمی‌تواند خالی باشد";
                        } else {
                          changedItems[key].errors.description = "";
                        }
                        setItems(() => [...changedItems]);
                      }}
                    />
                    <p className="text-red-500 text-sm ">
                      {item?.errors?.description}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const changedItems = items;
                        changedItems[key].quantity = e.target.value;
                        if (
                          Number(e.target.value) <= 0 &&
                          e.target.value != "-"
                        ) {
                          changedItems[key].errors.quantity =
                            "قیمت باید مثبت باشد";
                        } else {
                          changedItems[key].errors.quantity = "";
                        }
                        setItems(() => [...changedItems]);
                      }}
                      type="number"
                      placeholder="0"
                    />
                    <p className="text-red-500 text-sm">
                      {items[key]?.errors?.quantity}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <Input
                      defaultValue={item.rate}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const changedItems = items;
                        changedItems[key].rate = e.target.value;
                        if (
                          Number(e.target.value) <= 0 &&
                          e.target.value != "-"
                        ) {
                          changedItems[key].errors.rate = "قیمت باید مثبت باشد";
                        } else {
                          changedItems[key].errors.rate = "";
                        }
                        setItems(() => [...changedItems]);
                      }}
                      type="number"
                      placeholder="0"
                    />{" "}
                    <p className="text-red-500 text-sm">
                      {items[key]?.errors?.rate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => {
                const toPush = {
                  title: "",
                  quantity: "",
                  price: "",
                  errors: {},
                };
                setItems([...items, toPush]);
              }}
            >
              <PlusCircle /> افزودن کالا / خدمت
            </Button>
          </div>
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>مبلغ فاکتور</span>
                <span>
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>مبلغ قابل پرداخت ({currency.replace("IRR", "IRT")})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Label>دفترچه یادداشت</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder="اینجا می‌توانید یادداشت اضافه کنید"
            />
            <p className="text-red-500 text-sm">
              {formatError(fields.note.errors)}
            </p>
          </div>
          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="ارسال فاکتور برای مشتری" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
