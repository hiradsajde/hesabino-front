import { redirect } from "next/navigation"
import { auth } from "./auth"
import { prisma } from "./db"

export async function requiredUser() {
    const session = await auth()

    if(!session?.user) {
        redirect("/login")
    }

    return session
}

export async function getUser(userId: string) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            currencyName: true
        }
    })
}