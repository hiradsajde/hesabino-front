"use client"

import { motion } from 'motion/react';
import * as variants from '@/lib/motionVariants';
import { Button } from '@/components/ui/button';
import { overviewData } from '@/app/(landing)/constants';
import { overviewBanner } from '@/app/(landing)/assets';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactPlayer from 'react-player';
import Image from 'next/image';

function Overview() {
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
            {overviewData.sectionSubtitle}
          </motion.p>
          <motion.h2 className='text-center text-foreground text-3xl font-semibold leading-snug py-4 md:text-[40px]'>
            {overviewData.sectionTitle}
          </motion.h2>
          <motion.p className='section-text'>
            {overviewData.sectionText}
          </motion.p>
        </div>
        <div>
          <motion.div             initial='start'
            whileInView='end'
            viewport={{
              once: true,
            }}
            variants={variants.fadeInScale}
 className='relative max-w-4xl mx-auto shadow-xl'>
            <figure>
              <Image
                src={overviewBanner}
                width={900}
                height={601}
                alt=''
              />
            </figure>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='secondary'
                  size='icon'
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150'
                >
                  <div className='sr-only'>Play video</div>
                  <Play
                    fill='#fff'
                    size={50}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className='p-0 overflow-hidden max-w-[640px] xl:max-w-[900px]'>
                <AspectRatio ratio={16 / 9}>
                  <ReactPlayer
                    url='https://youtu.be/FGzo2Dm3Rh8?si=5pbfBmMnVhVY6cQa'
                    style={{
                      minWidth: '100%',
                      maxWidth: '100%',
                      minHeight: '100%',
                      maxHeight: '100%',
                    }}
                  />
                </AspectRatio>
              </DialogContent>
            </Dialog>
          </motion.div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-5 mt-8 md:mt-16 xl:grid-cols-[3fr_2.5fr] xl:items-center">
            <motion.p             initial='start'
            whileInView='end'
            viewport={{
              once: true,
            }}
            variants={variants.fadeInRight}
 className="text-center text-foreground text-3xl font-semibold leading-snug py-4 md:text-[40px] text-center lg:max-w-[30ch] lg:mx-auto">
                {overviewData.listTitle}
            </motion.p>
            <motion.div             initial='start'
            whileInView='end'
            viewport={{
              once: true,
            }}
            variants={variants.staggerContainer}
 className="flex flex-wrap justify-center gap-5 md:gap-10 xl:gap-8">
                {overviewData.list.map(({title, text}, index) => (
                    <motion.div key={index} className="text-center" variants={variants.fadeInLeft}>
                        <h3 className='text-3xl'>{title}</h3>
                        <p className='text-muted-foreground'>{text}</p>
                    </motion.div>
                ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Overview;
