import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { favicon } from "./(landing)/assets";
import Image from "next/image";

export const baseOptions: BaseLayoutProps = {
  nav: {
    url: "/",
    title: <Image src={favicon} width={25} alt="logo" />,
  },
};
