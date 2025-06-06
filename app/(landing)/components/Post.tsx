"use client";

import * as variants from "@/lib/motionVariants";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar, PenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  url: string;
  alt?: string;
  title: string;
  description?: string;
  image?: string;
  date: string | Date;
  author: string;
}

export default function Post(props: PostProps) {
  return (
    <motion.div variants={variants.fadeInUp} initial="start" whileInView="end">
      <Link
        href={props.url}
        className="flex flex-col gap-4 bg-fd-secondary rounded-xl shadow-md overflow-hidden p-6"
      >
        {props.image && (
          <Image
            src={props.image}
            alt={props.title}
            className="rounded-xl"
            width={1280}
            height={720}
          />
        )}
        <h2 className="text-xl font-semibold mb-2">{props.title}</h2>
        <p className="mb-4 line-clamp-2">{props.description}</p>
        <div className="flex justify-between">
          <div className="flex text-muted-foreground gap-2 items-center text-sm">
            <PenLine className="w-4" /> {props.author}
          </div>
          <div className="flex text-muted-foreground gap-2 text-sm items-center">
            {new Intl.DateTimeFormat("fa-IR").format(new Date(props.date))}
            <Calendar className="w-4" />
          </div>
        </div>
        <Button variant="outline">
          <ArrowUpRight />
          کشف بیشتر
        </Button>
      </Link>
    </motion.div>
  );
}
