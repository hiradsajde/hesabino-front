"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "../components/Header";
import { Faq } from "@/components/blocks/faq";
import { FAQData } from "../constants";


export default function Page() {
  return (
    <main className="container mx-auto px-4 pt-12 grid md:grid-cols-4 gap-8 lg:gap-24">
      <div className="md:cols-span-1">
        <Header
          title="همراه شماییم، همیشه"
          description="منتظر شنیدن صدای شما هستیم"
          breadcrumbs={[
            {
              name: "حسابینو",
              url: "/",
            },
            {
              name: "تماس با ما",
              url: "/contact-us",
              active: true,
            },
          ]}
          isMain
          className="lg:absolute"
        />
      </div>
      <ScrollArea className="flex justify-center md:col-span-3 md:mx-36">
        <Faq {...FAQData} />
      </ScrollArea>
    </main>
  );
}
