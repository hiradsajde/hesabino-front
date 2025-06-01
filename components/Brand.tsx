"use client"

import { motion } from "motion/react" 
import { brands } from "@/assets"
import * as variants from "@/lib/motionVariants"
import Image from "next/image"

function Brand() {
  return (
    <section className="py-8 md:py-16">
        <div className='px-4 mx-auto 2xl:max-w-screen-xl max-w-screen-lg'>
            <motion.p 
                variants={variants.fadeInUp} 
                initial="start"
                whileInView="end"
                viewport={{once: true}}
                className="text-center mb-4 md:mb-6 line-clamp-1 px-8 text-muted-foreground"
            >
                Unleash the power of our platform with a multitude of powerful features, empowering you to achieve your goals.
            </motion.p>
            <motion.div
                className="flex justify-center flex-wrap gap-5 md:gap-10"
                variants={variants.staggerContainer} 
                initial="start"
                whileInView="end" 
                viewport={{once: true}} 
            >
                {
                    brands.map((brand, index) => (
                        <motion.figure 
                            key={index}
                            variants={variants.fadeInUp} 
                        >
                            <Image src={brand} alt="" className="opacity-[0.6]"/>
                        </motion.figure>
                    ))
                }
            </motion.div>
        </div>
    </section>
  )
}

export default Brand