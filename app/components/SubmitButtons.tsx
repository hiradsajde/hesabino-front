"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

 interface iAppProps {
    text?: string; 
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
 }

export function SubmitButton({ text = "ارسال" , variant} : iAppProps){
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button disabled className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin"/> صبر کنید...
                </Button>
            ) : (
                <Button type="submit" className="w-full" variant={variant}>{ text }</Button>
            )}
        </>
    )
}