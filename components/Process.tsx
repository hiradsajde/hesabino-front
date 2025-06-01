"use client"

import { motion } from 'motion/react';
import * as variants from '@/lib/motionVariants';
import { processData } from '@/constants';
import { processBanner } from "@/assets"
import Image from 'next/image';

function Process() {
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
            {processData.sectionSubtitle}
          </motion.p>
          <motion.h2 className='text-center text-foreground text-3xl font-semibold leading-snug py-4 md:text-[40px]'>
            {processData.sectionTitle}
          </motion.h2>
          <motion.p className='section-text'>
            {processData.sectionText}
          </motion.p>
        </div> 
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="grid gap-7 lg:gap-10">
          {processData.list.map(({icon,text,title}, index) => (
            <motion.div className='flex flex-col gap-4 md:flex-row lg:gap-7' key={index} variants={variants.staggerContainer} initial="start" whileInView="end" viewport={{once: true}}>
              <motion.div className="w-16 h-16 grid place-items-center rounded-full border border-foreground/5 shrink-0" variants={variants.fadeInScale}>{icon}</motion.div>
              <div className="grid gap-2 md:gap-3">
                <motion.h3 className="text-xl lg:text-2xl" variants={variants.fadeInLeft}>{title}</motion.h3>
                <motion.p className="text-sm text-muted-foreground md:text-base" variants={variants.fadeInLeft}>{text}</motion.p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="max-lg:-order-1">
          <motion.figure variants={variants.fadeInUp} viewport={{once: true}} className="mx-auto bg-primary rounded-3xl max-w-[580px] overflow-hidden p-8 !pb-0 lg:p-12">
            <Image 
              src={processBanner} 
              width={500}
              height={528}
              alt="" 
              className="w-full h-full object-contain object-bottom" 
            />
          </motion.figure>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Process;
