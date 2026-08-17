import { useEffect, useMemo, useRef, useState } from 'react'
import { companyStats } from '../data/home'

type Stat = {
  value: string
  label: string
  caption?: string
}

/* Long enough to read as a count rather than a flicker, short enough that the
   band has settled by the time the eye lands on the labels. */
const COUNT_MS = 1500
/* Each block starts a beat after the one before it, left to right. */
const STAGGER_MS = 140

/**
 * Splits a display value around its first run of digits — "99.9%" becomes
 * prefix "", number "99.9", suffix "%". Only that first run animates, so
 * "24/7" counts the 24 and leaves "/7" alone instead of racing two figures.
 */
function splitValue(value: string) {
  const match = value.match(/\d+(?:\.\d+)?/)
  if (!match || match.index === undefined) return null

  const [number] = match
  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + number.length),
    target: parseFloat(number),
    /* "99.9" keeps one decimal all the way up, so the width never jumps */
    decimals: number.split('.')[1]?.length ?? 0,
  }
}

function StatValue({ value, play, delay }: { value: string; play: boolean; delay: number }) {
  const parts = useMemo(() => splitValue(value), [value])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!parts || !play) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(parts.target)
      return
    }

    let frame = 0
    let start: number | null = null

    const step = (now: number) => {
      if (start === null) start = now
      const elapsed = now - start - delay

      if (elapsed < 0) {
        frame = requestAnimationFrame(step)
        return
      }

      const t = Math.min(elapsed / COUNT_MS, 1)
      /* easeOutCubic — quick off the mark, glides into the final figure */
      setCurrent(parts.target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [parts, play, delay])

  /* No digits to count (a "—" placeholder, say) — render it as written */
  if (!parts) return <span className="stat-value">{value}</span>

  return (
    <span className="stat-value">
      {parts.prefix}
      {current.toFixed(parts.decimals)}
      {parts.suffix}
    </span>
  )
}

/**
 * The full-bleed numbers strip. Shared by the home and about pages so both
 * carry the same figures and the same treatment.
 *
 * The count starts the first time the band is properly on screen, then never
 * replays — scrolling back past it leaves the final figures in place.
 */
export default function StatsBand({ stats = companyStats }: { stats?: Stat[] }) {
  const bandRef = useRef<HTMLElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const el = bandRef.current
    if (!el || play) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setPlay(true)
        observer.disconnect()
      },
      /* Higher than the reveal threshold — the figures should start moving
         once the strip is committed on screen, not as its top edge grazes it. */
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [play])

  return (
    <section className="stats-band" ref={bandRef} data-reveal>
      <div className="stats-band-inner">
        {stats.map((stat, idx) => (
          <div className="stat-block" key={stat.label} style={{ '--i': idx } as React.CSSProperties}>
            <StatValue value={stat.value} play={play} delay={idx * STAGGER_MS} />
            <span className="stat-label">{stat.label}</span>
            {stat.caption && <span className="stat-caption">{stat.caption}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
