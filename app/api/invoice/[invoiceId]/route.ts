import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf"
import { formatCurrency } from "@/app/utils/formatCurrency";
import { readFileSync } from "fs";
import path from "path";
import { boldFont, normalFont } from "./vazirmatn";
import { format } from "date-fns-jalali";

export async function GET(request: Request,{params} : {params: Promise<{invoiceId: string}>}) {
    const { invoiceId } = await params

    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId
        }, 
        select: {
            invoiceName: true, 
            invoiceNumber: true, 
            currency: true, 
            fromName: true, 
            fromEmail: true, 
            fromAddress: true, 
            clientName: true, 
            clientEmail: true, 
            clientAddress: true,
            date: true, 
            dueDate: true,
            invoiceItemDescription: true, 
            invoiceItemQuantity: true, 
            invoiceItemRate: true, 
            total: true, 
            note: true,
        }
    })

    if(!data) {
        return NextResponse.json({error: "Invoice not found"} , {status: 404})
    }

    const pdf = new jsPDF({
        orientation: "portrait", 
        unit: "mm",
        format: "a4",
    })

    pdf.addFileToVFS("vazirmatn-normal.ttf", normalFont);
    pdf.addFileToVFS("vazirmatn-bold.ttf", boldFont);

    pdf.addFont("vazirmatn-normal.ttf", "vazirmatn", "normal")
    pdf.addFont("vazirmatn-bold.ttf", "vazirmatn", "bold")

    // set header
    pdf.setFont("vazirmatn")
    pdf.setFontSize(24) 
    pdf.text(data.invoiceName, 190 , 20 , {align: "right"})

    // from section 
    pdf.setFontSize(12)
    pdf.text("فروشنده محصول / خدمت", 190, 40, {align: "right"}); 
    pdf.setFontSize(10) 
    pdf.text([data.fromName, data.fromEmail, data.fromAddress], 190, 45, {align: "right"})

    // Client Section 
    pdf.setFontSize(12)
    pdf.text("مشتری / کارفرما" , 190, 70, {align: "right"})
    pdf.setFontSize(10) 
    pdf.text([data.clientName, data.clientEmail, data.clientAddress], 190, 75, {align: "right"})

    // Invocie details
    pdf.setFontSize(10) 
    pdf.text(`شناسه فاکتور: #${data.invoiceNumber}`, 90, 40, {align: "right"})
    pdf.text(`تاریخ صدور: ${format(new Date(data.date), "yyyy MMMM d")}`, 90, 45, {align: "right"})
    pdf.text(`تاریخ سررسید: ${format(new Date(data.dueDate), "yyyy MMMM d")}`, 90, 50, {align: "right"})

    // Item table head 
    pdf.setFontSize(10) 
    pdf.setFont("vazirmatn","bold") 
    pdf.text("توضیحات کالا / خدمات", 190, 100, {align: "right"})
    pdf.text("تعداد", 110, 100, {align: "right"}) 
    pdf.text("قیمت هر عدد" , 80, 100, {align: "right"})
    pdf.text("مبلغ کل", 50, 100, {align: "right"})

    // draw header line 
    pdf.line(20, 102, 190, 102)

    // item details
    pdf.setFont("vazirmatn","normal") 
    pdf.text(data.invoiceItemDescription, 190, 110, {align: "right"})
    pdf.text(data.invoiceItemQuantity.toString(), 110, 110, {align: "right"})
    pdf.text(formatCurrency({
        currency: data.currency as any, 
        amount: data.invoiceItemRate
    }), 80, 110, {align: "right"})
    pdf.text(formatCurrency({amount: data.total, currency: data.currency as any}), 50, 110, {align: "right"})

    // total section 
    pdf.line(20, 115, 190, 115)
    pdf.setFont("vazirmatn","bold")
    pdf.text(`(${data.currency}) مبلغ کل`, 80, 130, {align: "right"})
    pdf.text(formatCurrency({amount: data.total, currency: data.currency as any}), 50, 130, {align: "right"})

    // additional note
    if(data.note) {
        pdf.setFont("vazirmatn", "normal")
        pdf.setFontSize(10)
        pdf.text("متن:", 190, 150)
        pdf.text(data.note, 190, 155)
    }

    // generate pdf as buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"))

    // return pdf as download
    return new NextResponse(pdfBuffer, {
        headers: {
            // "Content-Type": "applicaion/pdf", 
            "Content-Disposition": "inline",
        }
    })
}