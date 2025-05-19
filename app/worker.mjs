import { PrismaClient } from "@prisma/client";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import "dotenv/config";

const connection = new IORedis({ maxRetriesPerRequest: null });

const prisma = new PrismaClient();

const worker = new Worker(
  "jobs",
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    switch (job.data.task) {
      case "update-currency":
        try {
          const data = await fetch(
            "https://api.navasan.tech/latest?" +
              new URLSearchParams({
                api_key: process.env.NAVASAN_API_KEY,
              }),
            {
              next: {
                revalidate: 60 * 60 * 4,
              },
            }
          ).then((data) => data.json());
          prisma.$transaction([
            prisma.curency.deleteMany({}),
            prisma.curency.createMany({
              data: [
                { currencyName: "USD", value: Number(data.usd.value) },
                { currencyName: "EUR", value: Number(data.eur.value) },
                { currencyName: "GBP", value: Number(data.gbp.value) },
                { currencyName: "AED", value: Number(data.aed.value) },
                { currencyName: "TRY", value: Number(data.try.value) },
                { currencyName: "CNY", value: Number(data.cny.value) },
                { currencyName: "JPY", value: Number(data.jpy.value) },
                { currencyName: "CAD", value: Number(data.cad.value) },
                { currencyName: "AUD", value: Number(data.aud.value) },
                { currencyName: "CHF", value: Number(data.chf.value) },
                { currencyName: "SEK", value: Number(data.sek.value) },
                { currencyName: "NOK", value: Number(data.nok.value) },
                { currencyName: "DKK", value: Number(data.dkk.value) },
                { currencyName: "SAR", value: Number(data.sar.value) },
                { currencyName: "KWD", value: Number(data.kwd.value) },
                { currencyName: "BHD", value: Number(data.bhd.value) },
                { currencyName: "OMR", value: Number(data.omr.value) },
                { currencyName: "QAR", value: Number(data.qar.value) },
                { currencyName: "INR", value: Number(data.inr.value) },
                { currencyName: "RUB", value: Number(data.rub.value) },
                { currencyName: "HKD", value: Number(data.hkd.value) },
                { currencyName: "SGD", value: Number(data.sgd.value) },
                { currencyName: "MYR", value: Number(data.myr.value) },
                { currencyName: "THB", value: Number(data.thb.value) },
                { currencyName: "KRW", value: Number(data.krw.value) },
                { currencyName: "ZAR", value: Number(data.zar.value) },
                { currencyName: "NZD", value: Number(data.nzd.value) },
                { currencyName: "MXN", value: Number(data.mxn.value) },
                { currencyName: "BRL", value: Number(data.brl.value) },
                { currencyName: "ARS", value: Number(data.ars.value) },
                { currencyName: "EGP", value: Number(data.egp.value) },
                { currencyName: "PKR", value: Number(data.pkr.value) },
                { currencyName: "IDR", value: Number(data.idr.value) },
                { currencyName: "TWD", value: Number(data.twd.value) },
                { currencyName: "PHP", value: Number(data.php.value) },
                { currencyName: "PLN", value: Number(data.pln.value) },
                { currencyName: "CZK", value: Number(data.czk.value) },
                { currencyName: "HUF", value: Number(data.huf.value) },
                { currencyName: "RON", value: Number(data.ron.value) },
                { currencyName: "UAH", value: Number(data.uah.value) },
                { currencyName: "NGN", value: Number(data.ngn.value) },
                { currencyName: "VND", value: Number(data.vnd.value) },
                { currencyName: "BDT", value: Number(data.bdt.value) },
                { currencyName: "LKR", value: Number(data.lkr.value) },
                { currencyName: "MAD", value: Number(data.mad.value) },
                { currencyName: "DZD", value: Number(data.dzd.value) },
                { currencyName: "TND", value: Number(data.tnd.value) },
                { currencyName: "IRR", value: Number(data.irr.value) },
              ],
            }),
          ]);
        } catch (err) {
          console.info("an error happend on currency job");
          console.error(err.message);
        }
        break;
    }
  },
  { connection }
);
