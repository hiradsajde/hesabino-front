import { ReactLenis } from "lenis/react"

import Hero from "@/app/(landing)/components/Hero"
import Brand from "@/app/(landing)/components/Brand"
import Feature from "@/app/(landing)/components/Feature"
import Process from "@/app/(landing)/components/Process"
import Overview from "@/app/(landing)/components/Overview"
import Review from "@/app/(landing)/components/Review"
import Blog from "@/app/(landing)/components/Blog"
import Cta from "@/app/(landing)/components/Cta"

function App() {
  return (
      <div className="relative isolate overflow-hidden">
        <main>
          <Hero/>
          <Brand/>
          <Feature/>
          <Process/>
          <Overview/>
          <Review/>
          <Blog/>
          <Cta/>
        </main>
      </div>
  )
}

export default App