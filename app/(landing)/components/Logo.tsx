import React from 'react'
import { favicon , logo } from "@/app/(landing)/assets"
import Image from 'next/image'

type LogoProps = {
    variant?: "default" | "icon"
}

const Logo = ({variant= "default"}: LogoProps) => {
  return (
    <a
        href=''
        className=''
    >
        {variant == "default" && (
            <div className='flex gap-2 justfiy-center items-center'><h2 className='text-2xl opacity-90 font-bold mt-1.5'>AnalytiX</h2><Image src={favicon} alt='logo' width={31} height={31}/></div>
        )}
        {variant == "icon" && (
            <Image src={favicon} alt='logo' width={31} height={31}/>
        )}
    </a>
  )
}

export default Logo