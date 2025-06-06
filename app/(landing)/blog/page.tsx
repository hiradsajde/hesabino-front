import Link from "next/link";
import { blog } from "@/lib/source";
import Image from "@/components/ui/image";
import { motion } from 'motion/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowUpRight, Calendar, ChevronLeft, Pen, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Post from "../components/Post";
import Header from "../components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Blog() {
  const posts = blog.getPages();
  return (
    <main className="container mx-auto px-4 py-12 grid md:grid-cols-3">
      <div className="md:cols-span-1">
        <Header
          title="آخرین نوشته ها"
          description="داده‌های دقیق، روابط اثربخش"
          breadcrumbs={[
              {
                  name: "حسابینو", 
                  url: "/"
              }, 
              {
                  name: "وبلاگ", 
                  url: "/blog",
                  active: true,
              }
          ]}
          isMain
        />
      </div>
      <ScrollArea className="grid gap-6 md:grid-cols-2 md:col-span-2">
        {posts.map((post, index) => (
            <Post
                title={post.data.title}
                description={post.data.description} 
                image={post.data.image} 
                author={post.data.author} 
                date={post.data.date} 
                url={post.url}
                key={index}
            />
        ))}
      </ScrollArea>
    </main>
  );
}
