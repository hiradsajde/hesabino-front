"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/persian-calendar";
import { format } from "date-fns-jalali";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { createInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { formatCurrency } from "../utils/formatCurrency";
import { formatError } from "../utils/formatError";

interface iAppProps {
  firstName: string; 
  lastName: string; 
  address: string;
  email: string;
}

export default function CreateInvoice({address,firstName,lastName,email} : iAppProps) {
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
  const [rate, setRate] = useState("")
  const [quantity, setQuantity] = useState("")
  const [currency , setCurrency] = useState("USD")
  const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0)
  
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
            <p className="text-sm text-red-500">{formatError(fields.invoiceName.errors)}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label>شماره صورت‌حساب</Label>
                <div className="flex">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
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
                <p className="text-red-500 text-sm">{formatError(fields.invoiceNumber.errors)}</p>
              </div>
              <div>
                <Label>ارز مبنا</Label>
                <Select 
                    defaultValue="USD" 
                    name={fields.currency.name} 
                    key={fields.currency.key}
                    onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ارز انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">
                      دلار آمریکا
                    </SelectItem>
                    <SelectItem value="EUR">یورو</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{formatError(fields.currency.errors)}</p>
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
                  <p className="text-red-500 text-sm">{formatError(fields.fromName.errors)}</p>
                  <Input 
                    name={fields.fromEmail.name} 
                    key={fields.fromEmail.key} 
                    placeholder="ایمیل شما" 
                    defaultValue={email}
                  />
                  <p className="text-red-500 text-sm">{formatError(fields.fromEmail.errors)}</p>
                  <Input 
                    name={fields.fromAddress.name} 
                    key={fields.fromAddress.key}
                    placeholder="آدرس شما" 
                    defaultValue={address}
                  />
                  <p className="text-red-500 text-sm">{formatError(fields.fromAddress.errors)}</p>
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
                  <p className="text-red-500 text-sm">{formatError(fields.clientName.errors)}</p>
                  <Input 
                    placeholder="ایمیل مشتری" 
                    name={fields.clientEmail.name}
                    key={fields.clientEmail.key} 
                    defaultValue={fields.clientEmail.initialValue}
                  />
                  <p className="text-red-500 text-sm">{formatError(fields.clientEmail.errors)}</p>
                  <Input
                    placeholder="آدرس مشتری" 
                    name={fields.clientAddress.name} 
                    key={fields.clientAddress.key} 
                    defaultValue={fields.clientAddress.initialValue}
                  />
                  <p className="text-red-500 text-sm">{formatError(fields.clientAddress.errors)}</p>
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
                      onSelect={(date : any) => setSelectedDueDate(date || new Date())}
                      mode="single"
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
                <p className="col-span-2">حمع کل</p>
              </div>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-6">
                  <Textarea 
                    placeholder="نام و توضیحات محصول / خدمات" 
                    name={fields.invoiceItemDescription.name} 
                    key={fields.invoiceItemDescription.key} 
                    defaultValue={fields.invoiceItemDescription.initialValue}
                  />
                  <p className="text-red-500 text-sm ">{formatError(fields.invoiceItemDescription.errors)}</p>
                </div>
                <div className="col-span-2">
                  <Input 
                    name={fields.invoiceItemQuantity.name} 
                    key={fields.invoiceItemQuantity.key} 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number" 
                    placeholder="0" 
                  />
                  <p className="text-red-500 text-sm">{formatError(fields.invoiceItemQuantity.errors)}</p>
                </div>
                <div className="col-span-2">
                  <Input 
                    name={fields.invoiceItemRate.name}
                    key={fields.invoiceItemRate.key}
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)}
                    type="number" 
                    placeholder="0" 
                  />
                  <p className="text-red-500 text-sm">{formatError(fields.invoiceItemRate.errors)}</p>
                </div>
                <div className="col-span-2">
                  <Input value={formatCurrency({amount: calculateTotal, currency: currency as any})} placeholder="0" disabled />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-1/3">
                <div className="flex justify-between py-2">
                  <span>مبلغ فاکتور</span>
                  <span>{formatCurrency({amount: calculateTotal, currency: currency as any})}</span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span>مبلغ قابل پرداخت ({currency})</span>
                  <span className="font-medium underline underline-offset-2">
                    {formatCurrency({amount: calculateTotal, currency: currency as any})}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Label>توضیحات</Label>
              <Textarea name={fields.note.name} key={fields.note.key} defaultValue={fields.note.initialValue} placeholder="اینجا می‌توانید یادداشت اضافه کنید" />
              <p className="text-red-500 text-sm">{formatError(fields.note.errors)}</p>
            </div>
            <div className="flex items-center justify-end mt-6">
              <div>
                <SubmitButton text="ارسال صورت‌حساب برای مشتری" />
              </div>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
