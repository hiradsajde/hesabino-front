import { z } from "zod"

export const onboardingSchema = z.object({
    firstName: z.string({message: "نام اجباری است"}).min(2, "نام اجباری است"),
    lastName: z.string({message: "نام خانوادگی اجباری است"}).min(2,"نام خانوادگی اجباری است"), 
    address: z.string({message: "آدرس اجباری است"}).min(2 , "آدرس اجباری است"), 
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(1,"Invoice Name is required"), 
    total: z.number().min(1 , "1$ is minimum"), 
    status: z.enum(["PAID","PENDING"]).default("PENDING"), 
    date: z.string().min(1, "Date is required"), 
    dueDate: z.string().min(0, "Due Date is requried"), 
    fromName: z.string().min(1, "Your name is required"), 
    fromEmail: z.string().email("Invalid Email adddress"), 
    fromAddress: z.string().min(1,"Your address is required"), 
    clientName: z.string().min(1,"Client name is required"), 
    clientEmail: z.string().email("Invalid Email address"), 
    clientAddress: z.string().min(1,"Client address is required"), 
    currency: z.string().min(1, "Currency is required"), 
    invoiceNumber: z.number().min(1, "Minimum invoice number of 1"), 
    note: z.string().optional(),
}) 

export const productSchema = z.object({
    invoiceItemDescription: z.string().min(1, "Description is required"), 
    invoiceItemQuantity: z.number().min(1, "Quantity min 1"), 
    invoiceItemRate: z.array(z.coerce.number().min(1,"Rate min 1"))
})