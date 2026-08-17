import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import Mix from '../components/Mix'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import StatsBand from '../components/StatsBand'
import { capabilities, trustPoints } from '../data/hero'
import {
  differentiators,
  industries,
  processSteps,
  testimonials,
} from '../data/home'
import { servicesData } from '../data/services'
import { workCategories, worksData, type WorkCategory, type WorkItem } from '../data/works'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* Rotated slowly in the hero. Each is a complete positioning statement, one
   per service line, so the cycle walks through the whole offering. */
const heroHeadlines = [
  'We Build Digital Experiences That Drive Business',
  'Engineering Software That Scales With You',
  'Mobile Apps Built For The People Who Use Them',
  'Websites Designed To Convert, Not Just Impress',
  'Marketing That Delivers Measurable Growth',
]

export default function HomePage() {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<WorkCategory | 'all'>('all')
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null)

  useScrollReveal([activeTab])

  const filtered =
    activeTab === 'all' ? worksData : worksData.filter((w) => w.category === activeTab)

  /* Slow rotation — long enough to read a full line twice over before it moves */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % heroHeadlines.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      {/* Hero — hero.png fills the section, copy sits over it */}
      <section className="hero-container">
        <div className="hero-media">
          <img
            src={heroImage}
            alt="Xyfra-built storefront shown on a laptop and phone"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="hero-copy">
          <div className="badge">
            <span className="badge-dot"></span>
            <span>NEXT-GEN DIGITAL ENGINEERING</span>
          </div>

          {/* key remounts the node so the cross-fade replays on every change */}
          <h1 className="hero-headline" key={headlineIndex}>
            {heroHeadlines[headlineIndex]}
          </h1>

          <p className="hero-description">
            From powerful websites to custom web applications, we deliver modern,
            responsive and user-focused solutions that help your business grow.
          </p>

          <ul className="hero-capabilities">
            {capabilities.map((cap) => (
              <li className="capability" key={cap.label}>
                <span className="capability-icon" aria-hidden="true">
                  {cap.icon}
                </span>
                <span className="capability-label">{cap.label}</span>
              </li>
            ))}
          </ul>

          {/* Liquid-glass CTA — adapted from Uiverse.io by shokat_2650. The
              shadow is a separate blurred sibling rather than a box-shadow so
              it can shift and sharpen independently of the pill on press. */}
          <div className="button-wrap hero-cta-wrap">
            <Link to="/contact" className="glass-btn">
              <span>Let&apos;s Build Something Great</span>
            </Link>
            <div className="button-shadow" aria-hidden="true"></div>
          </div>

          <div className="hero-scroll-hint" aria-hidden="true">
            <span>Scroll to explore</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <ul className="hero-trust">
          {trustPoints.map((point) => (
            <li className="trust-item" key={point.title}>
              <span className="trust-icon" aria-hidden="true">
                {point.icon}
              </span>
              <span className="trust-text">
                <strong>{point.title}</strong>
                <span>{point.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Rides up over the pinned hero as you scroll */}
      <div className="scroll-panel">
        <section className="section-container">
          <SectionHeader
            tag="WHAT WE DO"
            title={[['Software', 'light'], ['App, Web,', 'green'], ['Marketing & SEO', 'box']]}
            subtitle="End-to-end digital engineering and marketing strategies built for speed, conversion, and market dominance."
          />

          {/* One drifting row. The list is rendered twice so the track can loop
              without a seam — the second pass is a visual duplicate, so it is
              hidden from screen readers and skipped by the tab order. */}
          <div className="svc-marquee" data-reveal>
            <div className="svc-marquee-track">
              {[...servicesData, ...servicesData].map((service, idx) => {
                const isClone = idx >= servicesData.length
                return (
                  <Link
                    to={`/services?tab=${service.category}`}
                    key={`${service.id}-${idx}`}
                    className="svc-card-link"
                    aria-hidden={isClone || undefined}
                    tabIndex={isClone ? -1 : undefined}
                  >
                    <ServiceCard service={service} />
                  </Link>
                )
              })}
            </div>
          </div>

        </section>

        {/* Numbers band — figures count up once it scrolls into view */}
        <StatsBand />

        {/* Latest works */}
        <section className="section-container">
          <SectionHeader
            tag="OUR LATEST WORK"
            title={[['Projects', 'light'], ['We Have', 'green'], ['Delivered', 'box']]}
            subtitle="Browse by what we built — websites, online stores, mobile apps, and more. Pick the category closest to your own project."
          />

          <div className="filter-bar" data-reveal>
            {workCategories.map((tab) => (
              <button
                key={tab.id}
                className={`filter-btn${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="works-grid asymmetrical">
            {filtered.slice(0, 3).map((work, idx) => (
              <button
                type="button"
                key={work.id}
                className="pcard"
                data-reveal
                style={{ '--i': idx % 3 } as React.CSSProperties}
                onClick={() => setSelectedWork(work)}
              >
                {work.video ? (
                  <video
                    className="pcard-shot"
                    src={work.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img className="pcard-shot" src={work.image} alt={`${work.client} ${work.typeLabel}`} loading="lazy" />
                )}

                <span className="pcard-type">{work.typeLabel}</span>
                <span className="pcard-metric">{work.metricBadge}</span>

                <div className="pcard-body">
                  <span className="pcard-client">{work.client}</span>
                  <h3 className="pcard-title">{work.title}</h3>

                  <div className="pcard-reveal">
                    <div>
                      <p className="pcard-desc">{work.description}</p>

                      <div className="pcard-tags">
                        {work.highlights.map((h) => (
                          <span key={h} className="pcard-tag">
                            {h}
                          </span>
                        ))}
                      </div>

                      <span className="pcard-cta">
                        View project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }} data-reveal>
            <Link to="/works" className="btn btn-secondary">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </section>

        {/* How we work */}
        <section className="section-container">
          <SectionHeader
            tag="HOW WE WORK"
            title={[['From Brief', 'light'], ['To Launch', 'green'], ['In Four Steps', 'box']]}
            subtitle="A predictable delivery process with a working demo in your hands every two weeks."
          />

          <ol className="process-grid">
            {processSteps.map((step, idx) => (
              <li
                className="process-step"
                key={step.step}
                data-reveal
                style={{ '--i': idx } as React.CSSProperties}
              >
                <span className="step-num">{step.step}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Why us */}
        <section className="section-container">
          <SectionHeader
            tag="WHY XYFRA"
            title={[['Built By', 'light'], ['Engineers', 'green'], ['Who Stay', 'box']]}
            subtitle="The commitments we make on every engagement, written down before you sign anything."
          />

          <div className="reasons-grid">
            {differentiators.map((item, idx) => (
              <div
                className="reason-card"
                key={item.title}
                data-reveal
                style={{ '--i': idx % 3 } as React.CSSProperties}
              >
                <span className="reason-icon" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="industry-panel" data-reveal>
            <h3>
              <Mix parts={[['Industries', 'light'], ['We Serve', 'green']]} />
            </h3>
            <ul className="industry-row">
              {industries.map((industry) => (
                <li className="industry-chip" key={industry}>
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Client words */}
        <section className="section-container">
          <SectionHeader
            tag="CLIENT FEEDBACK"
            title={[['What Our', 'light'], ['Clients', 'green'], ['Say', 'box']]}
            subtitle="Results and working relationships, described by the people who signed off on them."
          />

          <div className="testimonial-grid">
            {testimonials.map((item, idx) => (
              <figure
                className="testimonial-card"
                key={item.name}
                data-reveal
                style={{ '--i': idx } as React.CSSProperties}
              >
                <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                <blockquote>{item.quote}</blockquote>
                <figcaption className="testimonial-author">
                  <span className="author-avatar" aria-hidden="true">{item.initials}</span>
                  <div className="author-meta">
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                    {item.phone && (
                      <a href={`tel:${item.phone.replace(/\s+/g, '')}`} className="author-phone">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>{item.phone}</span>
                      </a>
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section-container">
          <div className="global-reach-box" data-reveal>
            <div className="reach-content">
              <h3>
                <Mix parts={[['Ready to', 'light'], ['Start Building', 'green']]} />
              </h3>
              <p>Tell us about your project and we&apos;ll map out the fastest route to launch.</p>
            </div>
            <div className="reach-hubs">
              <Link to="/contact" className="btn btn-primary">
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Project detail modal */}
      {selectedWork && (
        <div className="modal-backdrop" onClick={() => setSelectedWork(null)}>
          <div className="work-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedWork(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header-banner">
              {selectedWork.video ? (
                <video
                  className="work-shot"
                  src={selectedWork.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  className="work-shot"
                  src={selectedWork.image}
                  alt={`${selectedWork.client} ${selectedWork.typeLabel}`}
                />
              )}
              <span className="service-tag">{selectedWork.typeLabel}</span>
              <div className="modal-title-box">
                <h2>{selectedWork.title}</h2>
              </div>
              <span className="modal-metric-badge">{selectedWork.metricBadge}</span>
            </div>

            <div className="modal-body">
              <p className="modal-client"><strong>Client Partner:</strong> {selectedWork.client}</p>
              <p className="modal-desc">{selectedWork.description}</p>

              <div className="modal-highlights-section">
                <h4>Key Accomplishments Delivered:</h4>
                <ul>
                  {selectedWork.highlights.map((h, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer-actions">
                <Link to="/contact" className="btn btn-primary" onClick={() => setSelectedWork(null)}>
                  Request Similar Solution
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
