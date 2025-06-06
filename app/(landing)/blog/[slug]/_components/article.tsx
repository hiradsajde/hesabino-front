"use client"

import Image from "@/components/ui/image";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import * as variants from "@/lib/motionVariants"
import { motion } from "motion/react";

interface ArticleProps {
    image?: string; 
    title: string; 
    toc?: any; 
    mdx: any; 
}

export default function Article({
    image, 
    title, 
    toc, 
    mdx
}: ArticleProps){
    return (
        <motion.article 
              variants={variants.fadeInUp}
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
            className="col-span-1 md:col-span-3"
        >
          <div className="prose min-w-0 text-justify">
            {image && (
              <Image
                src={image}
                alt={title}
                width={1280}
                height={720}
                className="rounded-xl"
              />
            )}
            <InlineTOC items={toc}>
              آنچه در این مقاله می‌خوانید
            </InlineTOC>
            {mdx}
          </div>
        </motion.article>
    )
}