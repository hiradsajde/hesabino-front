"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { SubmitButton } from "./SubmitButtons";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { editInvoice } from "../actions";
import { convertCurrency, formatCurrency } from "../utils/formatCurrency";
import { Prisma } from "@prisma/client";
import { formatError } from "../utils/formatError";
import { format } from "date-fns-jalali";
import { Calendar } from "@/components/ui/persian-calendar";
import { prisma } from "../utils/db";

interface iAppProps {
  data: Prisma.InvoiceGetPayload<{}>;
}

export function EditInvoice({ data }: iAppProps) {
  const [lastResult, action] = useActionState(editInvoice, undefined);
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


  const [selectedDate, setSelectedDate] = useState(data.date);
  const [selectedDueDate, setSelectedDueDate] = useState(data.dueDate);

  const [rate, setRate] = useState(data.invoiceItemRate.toString());
  const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
  const [total , setTotal] = useState(data.total)
  const [currency, setCurrency] = useState(data.currency);

  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
        <input
            type="hidden"
            name={fields.dueDate.name}
            value={selectedDueDate.toISOString()}
          />
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />
          <input type="hidden" name="id" value={data.id} />
          <input
            type="hidden"
            name={fields.total.name}
            value={total}
          />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{data.status == "PAID" ? "فاکتور" : "پیش‌نویس"}</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={data.invoiceName}
                placeholder="تست 123"
              />
            </div>
            <p className="text-sm text-red-500">{formatError(fields.invoiceName.errors)}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label>شماره فاکتور</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={data.invoiceNumber}
                  className="rounded-l-none"
                  placeholder="5"
                />
              </div>
              <p className="text-red-500 text-sm">
                {formatError(fields.invoiceNumber.errors)}
              </p>
            </div>

            <div>
              <Label>ارز مبنا</Label>
              <Select
                defaultValue={data.currency}
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={async (value) => {
                  const res = await fetch("/api/currency", {
                    method: "POST", 
                    body: JSON.stringify({
                      fromValue: Number(quantity) * Number(rate), 
                      fromCurrencyName: data.currency, 
                      toCurrencyName: value
                    })
                  }).then(res => res.json()) 
                  setTotal(res.value)
                  setCurrency(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب ارز" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IRR">تومان</SelectItem>
                  <SelectItem value="USD">دلار آمریکا</SelectItem>
                  <SelectItem value="EUR">یورو</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{formatError(fields.currency.errors)}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>از</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  placeholder="نام شما"
                  defaultValue={data.fromName}
                />
                <p className="text-red-500 text-sm">{formatError(fields.fromName.errors)}</p>
                <Input
                  placeholder="ایمیل شما"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={data.fromEmail}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.fromEmail.errors)}
                </p>
                <Input
                  placeholder="آدرس شما"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={data.fromAddress}
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
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={data.clientName}
                  placeholder="نام مشتری"
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.clientName.errors)}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={data.clientEmail}
                  placeholder="ایمیل مشتری"
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.clientEmail.errors)}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={data.clientAddress}
                  placeholder="آدرس مشتری"
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
                      <span>انتخاب تاریخ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date : any) => {
                      if(selectedDueDate < date) {
                        setSelectedDueDate(date)
                      }
                      setSelectedDate(date || new Date())
                    }}
                    mode="single"
                    fromDate={new Date()}
                    disabled={{before: new Date()}}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{formatError(fields.date.errors)}</p>
            </div>

            <div>
              <div>
                <Label>تاریخ سررسید</Label>
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
                      <span>تاریخ سررسید</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDueDate}
                    onSelect={(date: any) => setSelectedDueDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                    disabled={{before: selectedDate}}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{formatError(fields.dueDate.errors)}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">توضیحات</p>
              <p className="col-span-2">تعداد</p>
              <p className="col-span-2">قیمت هر عدد</p>
              <p className="col-span-2">جمع کل</p>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={data.invoiceItemDescription}
                  placeholder="نام و توضیحات محصول"
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.invoiceItemDescription.errors)}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value)
                    setTotal((Number(e.target.value) || 0) * (Number(rate) || 0));
                  }}
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.invoiceItemQuantity.errors)}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  value={rate}
                  onChange={(e) => {
                    setRate(e.target.value)
                    setTotal((Number(quantity) || 0) * (Number(e.target.value) || 0));
                  }}
                  type="number"
                  placeholder="0"
                />
                <p className="text-red-500 text-sm">
                  {formatError(fields.invoiceItemRate.errors)}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatCurrency({
                    amount: total,
                    currency: currency as any,
                  })}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>مبلغ فاکتور</span>
                <span>
                  {formatCurrency({
                    amount: total,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>مبلغ قابل پرداخت ({currency.replace("IRR","IRT")})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency({
                    amount: total,
                    currency: currency as any,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>متن</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={data.note ?? undefined}
              placeholder="اینجا می‌توانید توضیحات/متن اضافه کنید"
            />
            <p className="text-red-500 text-sm">{formatError(fields.note.errors)}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="ویرایش فاکتور" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}