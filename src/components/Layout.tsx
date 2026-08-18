import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SplashIntro from './SplashIntro'

/* Chrome shared by every route. <Outlet /> renders the matched page. */
export default function Layout() {
  const { pathname } = useLocation()

  /* Land at the top of each new page rather than keeping the old scroll
     position. Layout effect so it happens before paint — no visible jump.
     `instant` overrides the sheet's `scroll-behavior: smooth`, which would
     otherwise animate the whole page back up on every navigation. */
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* Mounted with the chrome, so it plays on page load only — route
          changes reuse this Layout and never replay it. */}
      <SplashIntro />
    </>
  )
}
