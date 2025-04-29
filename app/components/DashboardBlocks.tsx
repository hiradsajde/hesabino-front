import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
    const [data, openInvoices, paidinvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: userId,
            }, 
            select: {
                total: true,
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
    const {data, openInvoices, paidinvoices} = await getData(session.user?.id as string)

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">کل درآمد</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{formatCurrency({
                        amount: data.reduce((acc,  invoice) => acc + invoice.total,0), 
                        currency: 'USD'
                    })}</h2>
                    <p className="text-xs text-muted-foreground">بر اساس 30 روز اخیر</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">کل صورت‌حساب ها</CardTitle>
                    <Users className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{data.length}+</h2>
                    <p className="text-xs text-muted-foreground">صورت حساب داشتیم</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">صورت‌حساب بسته</CardTitle>
                    <CreditCard className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{paidinvoices.length}+</h2>
                    <p className="text-xs text-muted-foreground">صورت‌حساب پرداخت شده</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">صورت‌حساب باز</CardTitle>
                    <Activity  className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{openInvoices.length}+</h2>
                    <p className="text-xs text-muted-foreground">صورت‌حساب هنوز پرداخت نشده</p>
                </CardContent>
            </Card>
        </div>
    )
}