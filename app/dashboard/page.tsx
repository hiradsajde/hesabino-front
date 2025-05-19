import DashboardBlocks from "../components/DashboardBlocks"
import EmptyState from "../components/EmptyState"
import { InvoiceGraph } from "../components/InvoiceGraph"
import { RecentInvoices } from "../components/RecentInvoices"
import { signOut } from "../utils/auth"
import { prisma } from "../utils/db"
import { requiredUser } from "../utils/hooks"

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId
        }, 
        select: {
            id: true, 
        }
    })
    return data;
}

export default async function DashboardRoute(){
    const session = await requiredUser()
    const data = await getData(session.user?.id as string)

    return (
        <>
            {data.length < 1 ? (
                <EmptyState
                    title="فاکتوری پیدا نشد"
                    description="اینجا می‌توانید فاکتور های خود را ببینید" 
                    buttontext="ساخت فاکتور" 
                    href="/dashboard/invoices/create"
                />
            ) : (
                <>
                    <DashboardBlocks/>
                    <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                        <InvoiceGraph/>
                        <RecentInvoices/>
                    </div>   
                </> 
            )}
        </>
    )
}