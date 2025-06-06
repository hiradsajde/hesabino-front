"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Minus, Plus, RefreshCcw } from "lucide-react";
import Header from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Page() {
  const [total,setTotal] = useState(0)

  const form = useForm();

  function onSubmit(values: any) {
    setTotal(values.rooms * 5000 + values.beds * 3000)
  }

  const [rooms , setRooms] : any = useState("")
  const [beds, setBeds] : any = useState("")

  return (
    <main className="container mx-auto px-4 py-12 grid lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Header
          title="بر اساس مصرف پرداخت کنید"
          description="تعرفه‌های پویا، پرداخت بر حسب نیاز شما"
          breadcrumbs={[
            {
              name: "حسابینو",
              url: "/",
            },
            {
              name: "وبلاگ",
              url: "/blog",
              active: true,
            },
          ]}
          className="lg:absolute"
          isMain
        />
        
      </div>
      <ScrollArea className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:h-[85vh] flex flex-col justify-center items-center lg:col-span-1">
        <h2 className="text-3xl font-bold">ماشین حساب حسابینو</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-8 text-center w-full"
          >
  <Label>در مجموع چند اتاق دارید؟</Label>
<div className="flex justify-between items-center gap-4">
                    <div className="w-12 h-9 rounded-full flex items-center justify-center border-1 hover:bg-secondary" onClick={() => setRooms(String(Number(rooms) + 1))}>
                      <Plus className="w-4 h-4" />
                    </div>
                                          <Input
                        type="number"
                        className="!ring-0 text-center ltr"
                        placeholder="تعداد تخت ها"
                        disabled={total > 0}
                        value={rooms}
                        onChange={(v) => setRooms(v.target.value)}
                      />
                      
                    <div className={cn(`w-12 h-9 rounded-full flex items-center justify-center border-1 hover:bg-secondary` , rooms <= 1 && "bg-secondary blur-[2px]")} onClick={() => rooms > 1 ? setRooms(String(Number(rooms) - 1)) : ""}>
                      <Minus className="w-4 h-4 p-0" />
                    </div>
                  </div>
                      <Label>در مجموع چند تخت دارید؟</Label>
<div className="flex justify-between items-center gap-4">
                    <div className="w-12 h-9 rounded-full flex items-center justify-center border-1 hover:bg-secondary" onClick={() => setBeds(String(Number(beds) + 1))}>
                      <Plus className="w-4 h-4" />
                    </div>
                                          <Input
                        type="number"
                        className="!ring-0 text-center ltr"
                        placeholder="تعداد تخت ها"
                        disabled={total > 0}
                        value={beds}
                        onChange={(v) => setBeds(v.target.value)}
                      />
                      
                    <div className={cn(`w-12 h-9 rounded-full flex items-center justify-center border-1 hover:bg-secondary` , beds <= 1 && "bg-secondary blur-[2px]")} onClick={() => beds > 1 ? setBeds(String(Number(beds) - 1)) : ""}>
                      <Minus className="w-4 h-4 p-0" />
                    </div>
                  </div>

            {
              total == 0 ? (
                  <Button type="submit">محاسبه هزینه </Button>
              ) : (
                <>
                  <div className="grid grid-cols-5 gap-2">
                    <Input 
                      className="col-span-4 text-center border-none ring-0 text-lg"
                      value={`${beds * 1500 + rooms * 7000} تومان / ماه`}
                      min={0}
                      disabled
                    />
                    <Button className="col-span-1" onClick={() => setTotal(0)}>
                      <RefreshCcw/>
                    </Button>
                  </div>
                </>
              )
            }
          </form>
        </Form>
      </ScrollArea>
    </main>
  );
}
