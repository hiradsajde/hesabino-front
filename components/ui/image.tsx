"use client"

import React from 'react'
import NextImage from "next/image"

interface ImageProps {
    src: any, 
    width?: number, 
    height?: number, 
    alt ?: string,
    className?: string, 
}

function Image({src, width=1080, height=720, alt="", className=""} : ImageProps) {
  return (
    <NextImage
        src={src}
        width={width}
        height={height}
        alt={alt}
        data-loaded='false'
        onLoad={event => {
            event.currentTarget.setAttribute('data-loaded', 'true')
        }}
        className={`data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10 ${className}`}
    />
  )
}

export default Image