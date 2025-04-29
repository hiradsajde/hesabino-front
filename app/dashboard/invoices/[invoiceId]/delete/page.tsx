import { prisma } from "@/app/utils/db"
import { requiredUser } from "@/app/utils/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { redirect } from "next/navigation"
import WarningGif from "@/public/warning-gif.gif"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SubmitButton } from "@/app/components/SubmitButtons"
import { DeleteInvoice } from "@/app/actions"

async function Authorize(invoiceId : string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId, 
        }, 
    })

    if(!data) {
        return redirect("/dashboard/invoices")
    }
}

type Params = Promise<{invoiceId: string}>

export default async function DeleteInvoiceRoute({params} : {params: Params}) {
    const session = await requiredUser()
    const { invoiceId } = await params
    await Authorize(invoiceId, session.user?.id as string)
    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>حذف صورت‌حساب</CardTitle>
                    <CardDescription>
                        آیا مطمئن هستید می‌خواهید این صورت‌حساب را پاک کنید؟?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={WarningGif} alt="Warning Gif" className="rounded-lg"/>
                </CardContent>
                <CardFooter className="flex items-center justify-between flex-row-reverse">
                    <Link className={buttonVariants({variant: "secondary"})} href="/dashboard/invoices">برگشت</Link>
                    <form action={async () => {
                        "use server"
                        await DeleteInvoice(invoiceId)
                    }}>
                        <SubmitButton text="مطمئنم" variant="destructive"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}