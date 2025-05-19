"use client"

import { cn } from "@/lib/utils"
import { HomeIcon, ReceiptText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const dashboardLinks = [
    {
        id: 0, 
        name: 'داشبورد', 
        href: '/dashboard', 
        icon: HomeIcon
    }, 
    {
        id: 1, 
        name: 'فاکتور‌ها', 
        href: '/dashboard/invoices',
        icon: ReceiptText
    }
]

export function DashboardLinks() {
    const pathname = usePathname()
    return (
        <>
            {dashboardLinks.map((link) => (
                <Link
                    href={link.href} 
                    key={link.id} 
                    className={cn(
                        pathname == link.href
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground", 
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                    )}
                >
                    <link.icon className="size-4"/>
                    {link.name}
                </Link>
            ))}
        </>
    )
}