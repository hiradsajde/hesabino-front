import { footerData } from "@/app/(landing)/constants";
import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookIcon } from "lucide-react";
import Image from "next/image";
import { favicon } from "./assets";
export const baseOptions: BaseLayoutProps = {
  nav: {
    url: "/",
    title: <Image src={favicon} width={30} alt="logo"/>,
  },
  links: [
    {
      icon: <BookIcon />,
      text: "وبلاگ",
      url: "/blog",
      secondary: false,
    },
    {
      icon: <BookIcon />,
      text: "مستندات",
      url: "/docs",
      secondary: false,
    },
    {
      icon: <BookIcon />,
      text: "تعرفه ها",
      url: "/pricing",
      secondary: false,
    },
    {
      icon: <BookIcon />,
      text: "تماس با ما",
      url: "/contact-us",
      secondary: false,
    },
    {
      type: "custom",
      children: (
        <ul className="flex gap-2.5 ps-2 items-center">
          {footerData.socialLinks.map(({ href, icon }, index) => (
            <li key={index}>
              <a href={href} target="_blank">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      ),
      secondary: true,
    },
  ],
};
