
import { prisma } from "./db";

interface iAppProps {
    amount: number; 
    currency: string; 
}

export function formatCurrency({amount, currency} : iAppProps) {
    return new Intl.NumberFormat("fa-IR", {
        style: "currency", 
        currency: currency, 
    }).format(amount)
}

export function getCurrencyName(currencyName: string) {
  switch (currencyName) {
    case "USD": return "دلار آمریکا";
    case "EUR": return "یورو";
    case "GBP": return "پوند بریتانیا";
    case "AED": return "درهم امارات";
    case "TRY": return "لیر ترکیه";
    case "CNY": return "یوان چین";
    case "JPY": return "ین ژاپن";
    case "CAD": return "دلار کانادا";
    case "AUD": return "دلار استرالیا";
    case "CHF": return "فرانک سوئیس";
    case "SEK": return "کرون سوئد";
    case "NOK": return "کرون نروژ";
    case "DKK": return "کرون دانمارک";
    case "SAR": return "ریال عربستان";
    case "KWD": return "دینار کویت";
    case "BHD": return "دینار بحرین";
    case "OMR": return "ریال عمان";
    case "QAR": return "ریال قطر";
    case "INR": return "روپیه هند";
    case "RUB": return "روبل روسیه";
    case "HKD": return "دلار هنگ‌کنگ";
    case "SGD": return "دلار سنگاپور";
    case "MYR": return "رینگیت مالزی";
    case "THB": return "بات تایلند";
    case "KRW": return "وون کره جنوبی";
    case "ZAR": return "رند آفریقای جنوبی";
    case "NZD": return "دلار نیوزیلند";
    case "MXN": return "پزوی مکزیک";
    case "BRL": return "رئال برزیل";
    case "ARS": return "پزوی آرژانتین";
    case "EGP": return "پوند مصر";
    case "PKR": return "روپیه پاکستان";
    case "IDR": return "روپیه اندونزی";
    case "TWD": return "دلار تایوان";
    case "PHP": return "پزوی فیلیپین";
    case "PLN": return "زلوتی لهستان";
    case "CZK": return "کرون چک";
    case "HUF": return "فورینت مجارستان";
    case "RON": return "لئوی رومانی";
    case "UAH": return "گریونا اوکراین";
    case "NGN": return "نایرای نیجریه";
    case "VND": return "دونگ ویتنام";
    case "BDT": return "تاکای بنگلادش";
    case "LKR": return "روپیه سری‌لانکا";
    case "MAD": return "درهم مراکش";
    case "DZD": return "دینار الجزایر";
    case "TND": return "دینار تونس";
    case "IRR": return "ریال ایران";
    default: return "نامشخص";
  }
}

export async function convertToUserCurrency(fromValue : number, fromCurrencyName: string): Promise<number> {
    const fromCurrency = await prisma.curency.findUnique({
        where: {
            currencyName: fromCurrencyName
        }, 
        select: {
            value: true
        }
    })
    if(fromCurrency){
        return fromCurrency.value * fromValue
    }
    throw Error("can't calculate currency value")
}

export async function convertCurrency(fromValue : number, fromCurrencyName: string, toCurrencyName: string): Promise<number> {
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
        return (toCurrency?.value / fromCurrency.value) * fromValue
    }
    throw Error("can't calculate currency value")
}

