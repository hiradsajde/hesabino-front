"use client"

import type { MenuItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { ChevronsUpDown } from "lucide-react"

type MobileMenuProps = {
    navMenu: MenuItem[]
}

function MobileMenu({ navMenu } : MobileMenuProps) {
  return (
    <div>
        <ul className="mb-3">
            {navMenu.map(({ href, label, submenu } , index) => (
                <li key={index}>
                  {submenu ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between !px-0">
                          {label}
                          <ChevronsUpDown/>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="border-l border-l-muted-foreground/20 ps-2"> 
                        <ul>
                          {submenu.map(({href , label}, index) => (
                            <li key={index}>
                              <Button asChild variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-transparent px-0">
                                <a href={href}>{label}</a>
                              </Button>
                            </li>   
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Button asChild variant="ghost" className="w-full justify-start px-0">
                      <a href={href}>{label}</a>
                    </Button>
                  )}
                </li>
            ))}
        </ul>
        <Separator className="bg-muted-foreground/20"/>
        <div className="flex items-center gap-2 mt-2 justify-between">
            <Button variant="ghost" className="w-1/2">Sign In</Button>
            <Button className="w-1/2 text-secondary-foreground">Free Trial</Button>
        </div>
    </div>
  )
}

export default MobileMenu