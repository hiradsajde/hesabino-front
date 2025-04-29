import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceActions } from "./InvoiceActions";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";
import { Badge } from "@/components/ui/badge";
import EmptyState from "./EmptyState";
import { format } from "date-fns-jalali";

export async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function InvoiceList() {
  const session = await requiredUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
    {data.length === 0 ? (
        <EmptyState
            title="صورت‌حساب ای پیدا نشد" 
            description="برای شروع صورت‌حساب جدیدی بسازید" 
            buttontext="ساخت صورت حساب" 
            href="/dashboard/invoices/create"
        />
    ) : (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>شناسه</TableHead>
            <TableHead>مشتری</TableHead>
            <TableHead>مبلغ</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>عملیات‌ها</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>#{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>
                {formatCurrency({
                  amount: invoice.total,
                  currency: invoice.currency as any,
                })}
              </TableCell>
              <TableCell>
                <Badge>{invoice.status == "PENDING" ? "درانتظار پرداخت" : "پرداخت شده"}</Badge>
              </TableCell>
              <TableCell>
                {format(invoice.createdAt, "yyyy MMMM d")}
              </TableCell>
              <TableCell className="text-right">
                <InvoiceActions id={invoice.id} status={invoice.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
    </>
  );
}
