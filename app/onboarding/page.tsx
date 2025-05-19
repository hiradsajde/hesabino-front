"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButtons";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";
import { useActionState } from "react";

export default function Onboarding() { 
    const [lastResult, action] = useActionState(onboardUser, undefined);
    const [form , fields] = useForm({
        lastResult, 
        onValidate({formData}) {
            return parseWithZod(formData,{
                schema: onboardingSchema,
            })
        },
        shouldValidate: "onBlur", 
        shouldRevalidate: "onInput"
    })
    return (
        <>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">آخر خطه...</CardTitle>
                    <CardDescription>اطلاعات خود را جهت ساخت اکانت وارد کنید</CardDescription>
                </CardHeader>
                <CardContent>
                    <form 
                        className="grid gap-4" 
                        action={action} 
                        id={form.id} 
                        onSubmit={form.onSubmit} 
                        noValidate
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>نام</Label>
                                <Input 
                                    name={fields.firstName.name} 
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    placeholder="آرام"
                                />
                                <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>نام خانوادگی</Label>
                                <Input
                                    name={fields.lastName.name} 
                                    placeholder="رضایی"
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue}
                                />
                                <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
                            </div>
                        </div>
                        <div>
                            <Label>آدرس</Label>
                            <Input 
                                name={fields.address.name} 
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue} 
                                placeholder="خیابان شاد ۱۲۳"
                            />
                            <p className="text-red-500 text-sm">{fields.address.errors}</p>
                        </div>
                        <SubmitButton text="ثبت‌نام"/>
                    </form>
                </CardContent>
            </Card>
        </div>
        </>
    ) 
}