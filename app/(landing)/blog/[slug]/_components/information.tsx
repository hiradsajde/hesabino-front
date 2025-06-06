"use client"

import ShareButton from "./share";
import { motion } from "motion/react";
import * as variants from "@/lib/motionVariants";

interface informationProps {
  date: Date | string;
  author: string;
}

export default function Information(props: informationProps) {
  return (
    <div className="col-span-1">
      <motion.div
        variants={variants.fadeInUp}
        initial="start"
        whileInView="end"
        viewport={{ once: true }}
        className="flex flex-wrap max-md:justify-between md:flex-col gap-4 text-sm"
      >
        <div className="flex md:flex-col max-md:gap-1">
          <p className="mb-1 text-fd-muted-foreground">نویسنده </p>
          <p className="font-medium">{props.author}</p>
        </div>
        <div className="flex md:flex-col max-md:gap-1">
          <p className="mb-1 text-sm text-fd-muted-foreground">در تاریخ </p>
          <p className="font-medium">
            {new Intl.DateTimeFormat("fa-IR").format(new Date(props.date))}
          </p>
        </div>
        <ShareButton />
      </motion.div>
    </div>
  );
}
