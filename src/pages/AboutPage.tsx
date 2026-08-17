import { Link } from 'react-router-dom'
import Mix from '../components/Mix'
import SectionHeader from '../components/SectionHeader'
import StatsBand from '../components/StatsBand'
import { useScrollReveal } from '../hooks/useScrollReveal'

const pillars: {
  tag: string
  title: Parameters<typeof Mix>[0]['parts']
  body: string
  bullets: string[]
}[] = [
  {
    tag: 'ENTERPRISE ENGINEERING',
    title: [['Custom', 'light'], ['Software', 'green']],
    body: 'Clean, maintainable, and distributed software architectures designed for high operational scale, seamless API connectivity, and zero technical debt.',
    bullets: ['Microservices & Scalable Backends', 'Enterprise ERP & Custom SaaS', 'High-Throughput API Frameworks', 'Database Telemetry & Optimization'],
  },
  {
    tag: 'MOBILE & WEB EXCELLENCE',
    title: [['Native', 'light'], ['Apps & Web', 'box']],
    body: 'High-performance iOS, Android, and responsive web platforms built with fluid micro-animations, sub-second latency, and 100/100 Core Web Vitals.',
    bullets: ['Cross-Platform iOS & Android Apps', 'Ultra-Fast Responsive Websites', '3D WebGL & Motion Mechanics', 'Biometric Security & Offline Sync'],
  },
  {
    tag: 'REVENUE ACCELERATION',
    title: [['Data-Driven', 'light'], ['Marketing', 'green']],
    body: 'ROI-focused digital acquisition strategies, automated marketing funnels, PPC ad campaigns, and precision conversion rate optimization.',
    bullets: ['Multi-Channel Paid Ads (Google & Meta)', 'Conversion Rate Optimization (CRO)', 'Automated Funnel Attribution', 'High-Impact Creative Strategy'],
  },
  {
    tag: 'SEARCH DOMINATION',
    title: [['Dominant', 'light'], ['SEO & Growth', 'boxLight']],
    body: 'Comprehensive technical SEO architectures, high-authority backlink development, and keyword dominance ensuring sustained #1 search rankings.',
    bullets: ['Technical Architecture & Schema Markup', 'High-Volume Commercial Keywords', 'Organic Traffic Scaling Pipelines', 'Local & Global Search Dominance'],
  },
]

const commitments = [
  {
    number: '01',
    title: 'Direct Senior Engineer Access',
    desc: 'You work directly with the engineers and designers building your product—no intermediate account managers or communication bottlenecks.',
  },
  {
    number: '02',
    title: 'Working Demos Every 2 Weeks',
    desc: 'We operate in rapid two-week sprint cycles, placing clickable, working software builds in your hands at every stage.',
  },
  {
    number: '03',
    title: 'Guaranteed On-Time Delivery',
    desc: 'We commit to strict milestone deadlines from day one, ensuring your product launches on schedule without unexpected delays.',
  },
  {
    number: '04',
    title: '100% Code & IP Ownership',
    desc: 'You own every line of source code, design asset, and deployment configuration from day one with zero vendor lock-in.',
  },
]

const techStack = [
  { category: 'Frontend & Mobile', techs: ['React.js', 'Next.js', 'TypeScript', 'React Native', 'Swift', 'Kotlin', 'Tailwind CSS'] },
  { category: 'Backend & Systems', techs: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST APIs', 'Microservices', 'WebSockets'] },
  { category: 'Cloud & Infrastructure', techs: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'PostgreSQL', 'Redis'] },
  { category: 'Growth & Analytics', techs: ['Google Analytics 4', 'Search Console', 'Meta Ads Engine', 'Mixpanel', 'Hotjar', 'SEMrush'] },
]

export default function AboutPage() {
  useScrollReveal()

  return (
    <div className="page">
      {/* Header sits in its own container so the numbers band below can run
          full-bleed, exactly as it does on the home page. */}
      <section className="section-container about-intro">
        <SectionHeader
          tag="WHO WE ARE"
          title={[['Engineering', 'light'], ['& Digital', 'green'], ['Precision', 'box']]}
          subtitle="Xyfra is a full-cycle software engineering and digital growth studio dedicated to building robust products that scale seamlessly and dominate competitive markets."
        />
      </section>

      {/* Same figures and treatment as the home band, counting up on scroll */}
      <StatsBand />

      <section className="section-container about-body">
        {/* Core Capabilities & Engineering Pillars (No emojis) */}
        <div className="about-pillars-grid">
          {pillars.map((pillar, idx) => (
            <div
              className="about-pillar-card"
              key={pillar.tag}
              data-reveal
              style={{ '--i': idx } as React.CSSProperties}
            >
              <div className="pillar-tag">{pillar.tag}</div>
              <h3>
                <Mix parts={pillar.title} />
              </h3>
              <p>{pillar.body}</p>

              <ul className="pillar-bullets">
                {pillar.bullets.map((b) => (
                  <li key={b}>
                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The Xyfra Standard — 4 Commitments */}
        <div className="about-commitments-section" data-reveal>
          <div className="commitments-header">
            <span className="badge">
              <span className="badge-dot"></span>
              <span>HOW WE OPERATE</span>
            </span>
            <h2 className="commitments-title">The Xyfra Delivery Standard</h2>
            <p className="commitments-sub">Built on transparency, extreme technical rigor, and guaranteed execution.</p>
          </div>

          <div className="commitments-grid">
            {commitments.map((c) => (
              <div className="commitment-card" key={c.number}>
                <span className="commitment-num">{c.number}</span>
                <h3 className="commitment-title">{c.title}</h3>
                <p className="commitment-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="about-tech-matrix" data-reveal>
          <div className="tech-matrix-header">
            <span className="badge">
              <span className="badge-dot"></span>
              <span>OUR TECH STACK</span>
            </span>
            <h2>Modern, Battle-Tested Technologies</h2>
            <p>We build with cutting-edge, enterprise-grade frameworks designed for longevity and raw execution speed.</p>
          </div>

          <div className="tech-stack-grid">
            {techStack.map((group) => (
              <div className="tech-group-card" key={group.category}>
                <h3 className="tech-group-title">{group.category}</h3>
                <div className="tech-pills-list">
                  {group.techs.map((t) => (
                    <span className="tech-badge" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Reach & Next Steps */}
        <div className="global-reach-box" data-reveal>
          <div className="reach-content">
            <h3>Ready to Build Your Next Digital Product?</h3>
            <p>Partner with an engineering studio that treats your project with the technical precision and urgency it deserves.</p>
          </div>
          <div className="reach-actions">
            <Link to="/contact" className="btn btn-primary">
              <span>Start Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
