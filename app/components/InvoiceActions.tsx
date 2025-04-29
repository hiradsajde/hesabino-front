"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface iAppProps {
    id: string; 
    status: string;
}

export function InvoiceActions({ id , status} : iAppProps) { 

    const handleSetReminder = async () => {
        toast.promise(
            fetch(`/api/email/${id}` , {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            }
        }) , {
            loading: "Sending reminder email...", 
            success: "Reminder email sent successfully", 
            error: "Failed to send reminder email"
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild className="justify-start flex-row-reverse hover:cursor-pointer gap-1">
                    <Link href={`/dashboard/invoices/${id}`}>
                        <Pencil className="size-4 mr-2"/> ویرایش صورت‌حساب
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="justify-start flex-row-reverse hover:cursor-pointer gap-1">
                    <Link href={`/api/invoice/${id}`} target="_blank">
                        <DownloadCloudIcon className="size-4 mr-2"/> دانلود صورت‌حساب
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSetReminder} className="justify-start flex-row-reverse hover:cursor-pointer gap-1">
                        <Mail className="size-4 mr-2"/> ارسال ایمیل یاد‌آوری
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="justify-start flex-row-reverse hover:cursor-pointer gap-1">
                    <Link href={`/dashboard/invoices/${id}/delete`}>
                    <Trash className="size-4 mr-2"/>  حذف صورت‌حساب
                    </Link>
                </DropdownMenuItem>
                {
                    status !== "PAID" && <DropdownMenuItem asChild className="justify-start flex-row-reverse hover:cursor-pointer gap-1">
                    <Link href={`/dashboard/invoices/${id}/paid`}>
                        <CheckCircle className="size-4 mr-2"/> پرداخت شده
                    </Link>
                </DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}