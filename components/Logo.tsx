import React from 'react'
import { favicon , logo } from "@/assets"
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
            <Image src={logo} alt='logo' width={150} height={31}/>
        )}
        {variant == "icon" && (
            <Image src={favicon} alt='logo' width={31} height={31}/>
        )}
    </a>
  )
}

export default Logo