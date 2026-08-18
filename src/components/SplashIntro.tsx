import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'

/* Timeline in ms. The mark fades up on full black and holds; the flight and
   the page reveal then start on the same frame, so the home section fades in
   *while* the mark travels rather than popping in once it has parked. */
const FADE_IN_MS = 420
const HOLD_MS = 620
const FLIGHT_MS = 880
/* If the logo file never resolves, give up and let the site through */
const BAILOUT_MS = 4000

export default function SplashIntro() {
  const [visible, setVisible] = useState(true)
  const markRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const mark = markRef.current
    if (!mark) return

    const root = document.documentElement
    const timers: number[] = []
    const cleanups: (() => void)[] = []
    let settled = false
    let launched = false

    /* Black is up: the page is held at zero and the navbar's own copy of the
       mark stays out of the way, or you would see two logos mid-flight. */
    root.classList.add('intro-running')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    /* Hand the page over. By now the veil has already cleared, so all this
       does is swap the flying mark for the real one — same size, same
       pixels, so there is nothing to see. */
    const settle = () => {
      if (settled) return
      settled = true
      root.classList.remove('intro-running', 'intro-revealing')
      document.body.style.overflow = previousOverflow
      setVisible(false)
    }

    /* Park the mark exactly over the navbar slot, then shove it back out to
       the middle of the screen. Landing is then a plain `transform: none`,
       which is what makes it line up to the pixel on any viewport — phone and
       desktop alike, no per-breakpoint numbers to keep in sync.
       Returns false when the slot cannot be measured yet. */
    const park = () => {
      const target = document.querySelector<HTMLElement>('.navbar .brand-logo')
      const box = target?.getBoundingClientRect()
      if (!box || !box.height) return false

      /* `.brand-logo` is `height: 42px` + auto width, so a real width only
         exists once the navbar copy has laid out; fall back to the ratio. */
      const height = box.height
      const width = box.width || height * (mark.naturalWidth / mark.naturalHeight)

      mark.style.top = `${box.top}px`
      mark.style.left = `${box.left}px`
      mark.style.width = `${width}px`
      mark.style.height = `${height}px`

      const aspect = width / height
      /* Capped on both axes so a short landscape phone never crops it */
      const bigWidth = Math.min(window.innerWidth * 0.62, window.innerHeight * 0.34 * aspect, 420)
      const dx = window.innerWidth / 2 - (box.left + width / 2)
      const dy = window.innerHeight / 2 - (box.top + height / 2)
      mark.style.transform = `translate(${dx}px, ${dy}px) scale(${bigWidth / width})`

      return true
    }

    const run = () => {
      if (settled) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const flying = !reduced && park()

      /* Rotating the phone, or a mobile browser collapsing its URL bar, moves
         both the centre of the screen and the navbar slot. Re-park while the
         mark is still holding; once it is in the air, leave it alone. */
      const onResize = () => {
        if (!launched && flying) park()
      }
      window.addEventListener('resize', onResize)
      cleanups.push(() => window.removeEventListener('resize', onResize))

      /* Committing the parked geometry before the mark lights up, so the
         opacity fade and the flight never share a frame. Reading a layout
         property is what forces that flush — going through
         requestAnimationFrame instead would stall the whole sequence in any
         tab that is not compositing, e.g. opened in a background tab. */
      void mark.offsetWidth
      mark.classList.add('is-lit')

      timers.push(
        window.setTimeout(() => {
          if (settled) return
          launched = true

          if (flying) {
            /* Re-park before launching: the bar re-pads itself once the
               scroll listener reports in, and late fonts or a resize move the
               slot too. Both states put the mark dead centre, so redoing the
               maths here is invisible — but it is what the flight aims at. */
            park()
            void mark.offsetWidth
            mark.style.transition = `transform ${FLIGHT_MS}ms cubic-bezier(0.66, 0, 0.24, 1)`
            mark.style.transform = 'none'
          }

          /* Same frame as the launch: black starts clearing and the home
             section fades up as the mark leaves the middle of the screen. */
          root.classList.add('intro-revealing')
          timers.push(window.setTimeout(settle, FLIGHT_MS))
        }, FADE_IN_MS + HOLD_MS),
      )
    }

    /* Measuring before the file has decoded gives a zero-width box */
    if (mark.complete && mark.naturalWidth) run()
    else {
      mark.addEventListener('load', run, { once: true })
      mark.addEventListener('error', settle, { once: true })
    }

    timers.push(window.setTimeout(settle, BAILOUT_MS))

    return () => {
      timers.forEach(clearTimeout)
      cleanups.forEach((off) => off())
      mark.removeEventListener('load', run)
      mark.removeEventListener('error', settle)
      document.body.style.overflow = previousOverflow
      root.classList.remove('intro-running', 'intro-revealing')
    }
  }, [])

  if (!visible) return null

  return (
    <div className="intro-cover" aria-hidden="true">
      <div className="intro-veil" />
      <img src={logo} alt="" className="intro-mark" ref={markRef} />
    </div>
  )
}
