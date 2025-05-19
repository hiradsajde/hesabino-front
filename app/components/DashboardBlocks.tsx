import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { prisma } from "../utils/db";
import { getUser, requiredUser } from "../utils/hooks";
import { convertToUserCurrency, formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
    
    
    const [data, openInvoices, paidinvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: userId,
            }, 
            select: {
                total: true,
                currency: true
            }, 
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId, 
                status: "PENDING",
            },
            select: {
                id: true, 
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId, 
                status: "PAID",
            }, 
            select: {
                id: true
            }
        })
    ])

    return {
        data, 
        openInvoices, 
        paidinvoices,
    }
}



export default async function DashboardBlocks() {
    const session = await requiredUser()
    const user = await getUser(session.user?.id as string)
    const {data, openInvoices, paidinvoices} = await getData(session.user?.id as string)

    let amount_obj = data.map(async (invoice) => await convertToUserCurrency(invoice.total,invoice.currency))
    let total_amount = 0
    for (const amount of amount_obj) {
        total_amount += await amount
    }

    const total_invoices_value = formatCurrency({
        amount: total_amount,
        currency: user?.currencyName as string
    })

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">کل درآمد</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{total_invoices_value}</h2>
                    <p className="text-xs text-muted-foreground">بر اساس 30 روز اخیر</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">کل فاکتور ها</CardTitle>
                    <Users className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{data.length}+</h2>
                    <p className="text-xs text-muted-foreground">فاکتور داشتیم</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">فاکتور بسته</CardTitle>
                    <CreditCard className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{paidinvoices.length}+</h2>
                    <p className="text-xs text-muted-foreground">فاکتور پرداخت شده</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">فاکتور باز</CardTitle>
                    <Activity  className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{openInvoices.length}+</h2>
                    <p className="text-xs text-muted-foreground">فاکتور هنوز پرداخت نشده</p>
                </CardContent>
            </Card>
        </div>
    )
}