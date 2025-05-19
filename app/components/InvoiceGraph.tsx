import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Graph } from "./Graph";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import EmptyState from "./EmptyState";
import { Receipt } from "lucide-react";

async function getInvoices(userId: string) {
    const rawData = await prisma.invoice.findMany({
        where: {
            status: "PAID",
            userId: userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30*24*60*60*1000)
            }
        }, 
        select: {
            createdAt: true, 
            total: true,
        }, 
        orderBy: {
            createdAt: "asc", 
        }
    })

    // Group and aggrigate data by date 
    const aggregatedData = rawData.reduce(
        (acc : {[key: string]: number}, curr) => {
            const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
                month: "short", 
                day: "numeric"
            })
            acc[date] = (acc[date] || 0) + curr.total

            return acc        
        }, 
        {}
    )
    const transformData = Object.entries(aggregatedData).map(([date , amount]) => (
        {
            date , 
            amount, 
            originalDate: new Date(date + ", " + new Date().getFullYear())
        }
    )).sort((a , b) => a.originalDate.getTime() - b.originalDate.getTime()).map(({date , amount}) => ({
        date,
        amount,
    }))
    return transformData
}

export async function InvoiceGraph() {
    const session = await requiredUser()
    const data = await getInvoices(session.user?.id as string)
    return (
        <Card className="lg:col-span-2">

{            data.length === 0 ? (
                                <EmptyState
                                    title="فاکتور پرداخت شده ای یافت نشد"
                                    description="موردی را به عنوان پرداخت شده علامتگذاری کنید تا آن را همینجا ببینید" 
                                    buttontext="کاوش در فاکتور‌ها" 
                                    href="/dashboard/invoices"
                                    icon={<Receipt className="size-4 mr-2"/>}
                                />
                
            ) : (
                <>
                <CardHeader>
                    <CardTitle>نمودار درآمدی</CardTitle>
                    <CardDescription>
                        بر اساس فاکتور های پرداخت شده یک ماه اخیر
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Graph data={data}/>
                </CardContent>
                </>
    
            )
}            </Card>

    )
}