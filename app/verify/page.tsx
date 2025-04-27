import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
    return (
        <>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>{" "}
        <div className="min-h-screen w-full flex justify-center items-center">
            <Card className="w-[400px] px-5">
                <CardHeader className="text-center">
                    <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
                        <Mail className="size-12 text-blue-500"/>
                    </div>
                    <CardTitle className="text-2xl font-bold">Check your Email</CardTitle>
                    <CardDescription>We have sent a verification link to your email address</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
                        <div className="flex items-center">
                            <AlertCircle className="size-5 text-yellow-400"/>
                            <p className="text-sm font-medium text-yellow-700 ml-3">Be sure to check your spam folder!</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link 
                        href="/" 
                        className={buttonVariants({
                        className: "w-full", 
                        variant: "outline"
                    })}>
                        <ArrowLeft className="size-4 mr-2"/> Back to Homepage
                    </Link>
                </CardFooter>
            </Card>
        </div>
        </>
    )
}