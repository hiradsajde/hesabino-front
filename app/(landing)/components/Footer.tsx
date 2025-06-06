import Logo from "@/app/(landing)/components/Logo"
import { footerData } from "@/app/(landing)/constants"

function Footer() {
  return (
    <footer className="pt-16 md:pt-4 max-md:pb-32 md:pb-16">
        <div className="container">
                <div className="flex flex-col gap-8 justify-center items-center mx-auto">
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
        </div>
    </footer>
  )
}

export default Footer