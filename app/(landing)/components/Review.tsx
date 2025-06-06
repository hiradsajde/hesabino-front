"use client"

import { motion } from 'motion/react';
import { reviewData } from '@/app/(landing)/constants';
import * as variants from '@/lib/motionVariants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const Review = () => {
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
            {reviewData.sectionSubtitle}
          </motion.p>
          <motion.h2 className='text-center text-foreground text-3xl font-semibold leading-snug py-4 md:text-[40px]'>
            {reviewData.sectionTitle}
          </motion.h2>
        </div>
        <motion.div variants={variants.staggerContainer} initial="start" whileInView="end" viewport={{once: true}}  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviewData.reviewCard.map(({title, text, reviewAuthor, date} , index) => (
                <motion.div key={index} variants={variants.fadeInUp}>
                    <Card className='relative'>
                        <CardHeader>
                            <CardTitle className='text-lg'>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">{text}</p>
                        </CardContent>
                        <CardFooter className='block'>
                            <p>{reviewAuthor}</p>
                            <p className="text-xs text-muted-foreground">{date}</p>
                        </CardFooter>
                        <div className="absolute bottom-0 right-3 opacity-[0.02]">
                            <Quote size={80}/>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
