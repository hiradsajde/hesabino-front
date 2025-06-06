"use client"

import { Button } from "@/components/ui/button";
import { Check, Share } from "lucide-react";
import React, { useState } from "react";

function ShareButton() {
  const [isShared, setIsShared] = useState(false)
  return (
    <Button
      variant="outline"
      className="flex items-center w-full"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setIsShared(true) 
        setTimeout(() => {
            setIsShared(false)
        } , 2000)
      }}
    >
      {isShared ? <Check/> : <Share />}
      {isShared ? "لینک کپی شد" : "اشتراک‌گذاری"}
    </Button>
  );
}

export default ShareButton;
