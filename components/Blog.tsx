"use client"

import { motion } from 'motion/react';
import * as variants from '@/lib/motionVariants';
import { blogData } from '@/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const Blog = () => {
  return (
    <section className='py-8 md:py-16'>
      <div className='container'>
        <div className='pb-8 text-center md:pb-16 lg:max-w-screen-sm lg:mx-auto'>
          <motion.p
            className='text-center text-primary text-sm font-medium uppercase'
            initial='start'
            whileInView='end'
            viewport={{
              once: true,
            }}
            variants={variants.fadeInUp}
          >
            {blogData.sectionSubtitle}
          </motion.p>
          <motion.h2 className='text-center text-foreground text-3xl font-semibold leading-snug py-4 md:text-[40px]'>
            {blogData.sectionTitle}
          </motion.h2>
          <motion.p className='section-text'>{blogData.sectionText}</motion.p>
        </div>
        <motion.div 
          variants={variants.staggerContainer}
          initial="start"
          whileInView="end" 
          viewport={{once: true}}
          className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
        >
            {
                blogData.blogs.map(({imgSrc, title, badge, author: {avatarSrc, authorName, publishDate, readingTime}}, index) => (
                    <motion.div key={index} variants={variants.fadeInUp}>
                        <Card className='group'>
                            <CardHeader>
                              <figure className='rounded-lg overflow-hidden'>
                                <Image src={imgSrc} alt={title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'/>
                              </figure>
                            </CardHeader>
                            <CardContent>
                              <Badge className='mb-3 text-secondary-foreground'>{badge}</Badge>
                              <CardTitle className='leading-normal'>
                                <a href="#" className='hover:text-primary transition-colors'>{title}</a>
                              </CardTitle>
                            </CardContent>
                            <CardFooter className='gap-3'>
                              <Avatar>
                                <AvatarImage src={avatarSrc.src}/>
                                <AvatarFallback>{authorName}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm">{authorName}</p>
                                <div className="flex items-center gap-1.5">
                                  <time dateTime={publishDate} className='text-xs text-muted-foreground'>{publishDate}</time>
                                  <span className="w-1 h-1 bg-muted-foreground/50 rounded-full"></span>
                                  <p className="text-xs text-muted-foreground">{readingTime}</p>
                                </div>
                              </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))
            }
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
