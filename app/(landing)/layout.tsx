import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/(landing)/layout.config';
import type { ReactNode } from 'react';
import Footer from '@/app/(landing)/components/Footer';
import ReactLenis from 'lenis/react';
export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>
    <ReactLenis root>
      {children}
    </ReactLenis>
    <Footer/>
  </HomeLayout>;
}