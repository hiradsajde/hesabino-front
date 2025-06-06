"use client"

import { motion } from 'motion/react';
import { featureData } from '@/app/(landing)/constants';

import FeatureCard from '@/app/(landing)/components/FeatureCard';
import { Button } from '@/components/ui/button';

import { ArrowRight, ArrowUpRight } from 'lucide-react';

import * as variants from '@/lib/motionVariants'
import Image from 'next/image';

function Feature() {
  return (
    <section className='py-8 md:py-16'>
      <div className='container'>
        <div className='pb-8 text-center md:pb-16 lg:max-w-screen-sm lg:mx-auto'>
          <motion.p
            className='text-center text-primary text-sm font-medium uppercase'
            initial='start'
            whileInView='end'
            viewport={{
              once: true
            }}
            variants={variants.fadeInUp}
          >
            {featureData.sectionSubtitle}
          </motion.p>
          <motion.h2 className='text-center text-foreground text-3xl font-semibold leading-snug py-4 md:text-[40px]'>
            {featureData.sectionTitle}
          </motion.h2>
          <motion.p className='section-text'>
            {featureData.sectionText}
          </motion.p>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-6 mt-8'>
          {featureData.features.map(
            ({ icon, iconBoxColor, title, desc, imgSrc }, index) => (
              <FeatureCard key={index} classes={index < 2 ? "md:col-span-2 lg:col-span-1 xl:col-span-3" : "xl:col-span-2"}>
                <>
                  <div className='p-8'>
                    <motion.div 
                      variants={variants.fadeInUp}
                      className={`w-16 h-16 grid place-items-center rounded-full flex-shrink-0 ${iconBoxColor}`}
                    >
                      {icon}
                    </motion.div>
                    <motion.h3 
                      variants={variants.fadeInUp}
                      className='text-foreground text-xl font-medium mt-4 mb-3'
                    >{title}</motion.h3>
                    <motion.p variants={variants.fadeInUp}  className='text-muted-foreground line-clamp-2'>{desc}</motion.p>
                    <motion.div variants={variants.fadeInUp}>
                      <Button
                        variant='link'
                        className='p-0 h-auto mt-3'
                      >
                        پیش نمایش <ArrowUpRight />
                      </Button>
                    </motion.div>
                  </div>
                  {imgSrc && (
                    <motion.figure variants={variants.fadeInUp} className='p-6 pt-0'>
                      <Image
                        src={imgSrc}
                        alt={title}
                      />
                    </motion.figure>
                  )}
                </>
              </FeatureCard>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Feature;
