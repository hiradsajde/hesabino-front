"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as variants from "@/lib/motionVariants";
import { cn } from "@/lib/utils";
import { ChevronLeft, CirclePlay } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Fragment } from "react";
import ReactPlayer from "react-player";

interface BreadcrumbProp {
  name: string;
  url?: string;
  active?: boolean;
}

interface MetaProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbProp[];
  className?: string;
  isMain?: boolean;
  video?: string;
}

export default function Header(props: MetaProps) {
  return (
    <header className={`mb-8 -mt-6`}>
      <motion.div
        viewport={{ once: true }}
        variants={variants.fadeIn}
        initial="start"
        animate="end"
        className={cn(props.isMain && "lg:fixed", props.className)}
      >
        <Breadcrumb>
          <BreadcrumbList>
            {props.breadcrumbs &&
              props.breadcrumbs.map((breadcrumb: BreadcrumbProp, index) => (
                <Fragment key={index}>
                  {breadcrumb.active ? (
                    <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbItem>
                      {breadcrumb.url ? (
                        <Link href={breadcrumb.url}>{breadcrumb.name}</Link>
                      ) : (
                        breadcrumb.name
                      )}
                    </BreadcrumbItem>
                  )}
                  {index < BreadcrumbSeparator.length && (
                    <BreadcrumbSeparator>
                      <ChevronLeft />
                    </BreadcrumbSeparator>
                  )}
                </Fragment>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
      <div
        className={cn(
          props.isMain && "top-1/2 lg:fixed lg:-translate-y-1/2 text-center",
          props.className
        )}
      >
        <motion.h1
          className={cn(
            `text-4xl font-bold my-8`,
            props.isMain ? "lg:text-5xl" : "lg:text-4xl"
          )}
          viewport={{ once: true }}
          variants={variants.fadeIn}
          initial="start"
          animate="end"
        >
          {props.title}
        </motion.h1>
        {props.description && (
          <motion.p
            className={cn(
              "text-muted-foreground",
              props.isMain ? "lg:text-2xl" : "lg:text-xl"
            )}
            viewport={{ once: true }}
            variants={variants.fadeIn}
            initial="start"
            animate="end"
          >
            {props.description}
          </motion.p>
        )}
        {props.video && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="mt-6">
                <CirclePlay /> مشاهده ویدیو
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden max-w-[640px] xl:max-w-[900px]">
              <AspectRatio ratio={16 / 9}>
                <ReactPlayer
                  url={props.video}
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    maxHeight: "100%",
                  }}
                />
              </AspectRatio>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
}
