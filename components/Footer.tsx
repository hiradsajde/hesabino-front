import Logo from "@/components/Logo"
import { footerData } from "@/constants"

function Footer() {
  return (
    <footer className="py-8 md:py-16 !pb-0">
        <div className="container">
            <div className="grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-4 pb-20">
                <div className="flex flex-col gap-8">
                    <Logo />
                    <div>
                        <ul className="flex gap-5">
                            {footerData.socialLinks.map(({href, icon} , index) => (
                                <li key={index}>
                                    <a 
                                        href={href} 
                                        target="_blank"
                                    >
                                        {icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-2 gap-y-8 text-sm sm:grid-cols-4 lg:col-span-3">
                    {footerData.links.map(({title, items}, index) => (
                        <ul key={index}>
                            <p className="mb-4">{title}</p>
                            {items.map(({href, label}, index) => (
                                <li key={index} className="">
                                    <a 
                                        href={href} 
                                        className="text-muted-foreground inline-block py-1 transition-colors hover:text-primary"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer