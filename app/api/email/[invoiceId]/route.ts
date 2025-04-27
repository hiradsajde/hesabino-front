import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import emailClient from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(request:Request , {params} : {params: Promise<{invoiceId: string}>}) {
    try {
        const session = await requiredUser() 

        const { invoiceId } = await params
    
        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id
            }
        })
    
        if(!invoiceData) {
            return NextResponse.json({error: 'Invoice not found'} , {status: 404})
        }
    
        const sender = {
            email: process.env.EMAIL_SERVER_SENDER!,
            name: "Mailtrap Test"
        }
    
        emailClient.send({
            from: sender,
            to: [{ email: "hi@hiradsajde.ir" }],
            template_uuid: "c92862fc-7cb3-4c37-b127-75e0d579d52f",
            template_variables: {
              "first_name": invoiceData.clientName,
              "company_info_name": "InvoiceMarshal",
              "company_info_address": "Chad street 124",
              "company_info_city": "Munich",
              "company_info_zip_code": "345345",
              "company_info_country": "Germany"
            }
        })
        return NextResponse.json({success: true})    
    } catch(error) {
        return NextResponse.json({error: "Failed to send Email reminder"} , {
            status: 500
        })
    }
}