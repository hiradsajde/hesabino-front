import { prisma } from "@/app/utils/db"
import { getCurrencyName } from "@/app/utils/formatCurrency"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const {fromValue , fromCurrencyName, toCurrencyName} = await req.json()
    const fromCurrency = await prisma.curency.findUnique({
        where: {
            currencyName: fromCurrencyName
        }, 
        select: {
            value: true
        }
    })
    const toCurrency = await prisma.curency.findUnique({
        where: {
            currencyName: toCurrencyName
        }, 
        select: {
            value: true
        }
    })
    if(fromCurrency && toCurrency){
        return NextResponse.json({
            value: (fromCurrency.value / toCurrency.value) * fromValue, 
            currency: fromCurrency
        })
    }
    throw Error("can't calculate currency value")
}

export async function GET(req: NextRequest) { 
    const currencies: any = await prisma.curency.findMany()
    for(const currency of currencies){
        currency.name = getCurrencyName(currency.currencyName)
    }
    return NextResponse.json(currencies)
}