import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navItems } from '../data/nav'
import { servicesData } from '../data/services'
import { socialLinks } from '../data/social'
import Mix from './Mix'

/* Deep-linked into the services page rather than given routes of their own —
   every service lives on that one page. */
const serviceLinks = servicesData.map((s) => ({ to: '/services', label: s.title }))

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col" data-reveal>
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Xyfra Technologies" height="34" />
            </Link>

            <p className="footer-blurb">
              <Mix
                parts={[
                  ['Xyfra Technologies', 'green'],
                  [
                    'engineers enterprise software, mobile apps and ultra-fast web platforms — then builds the marketing that fills them.',
                    'light',
                  ],
                ]}
              />
            </p>

            <Link to="/contact" className="footer-cta">
              Start a project
              <span aria-hidden="true">→</span>
            </Link>

            {/* A channel with no URL yet is skipped rather than rendered dead */}
            <ul className="footer-social">
              {socialLinks
                .filter((item) => item.href)
                .map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      /* noreferrer implies noopener, but both are spelled out
                         for the older browsers that only honour the latter. */
                      rel="noopener noreferrer"
                      aria-label={`Xyfra Technologies on ${item.label}`}
                    >
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={item.path} />
                      </svg>
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <nav className="footer-col" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <h3 className="footer-col-title">Services</h3>
            <ul>
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            <h3 className="footer-col-title">Company</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
            <h3 className="footer-col-title">Get in touch</h3>
            <ul className="footer-contact">
              <li>
                <a href="mailto:xyfratechnologies@gmail.com">xyfratechnologies@gmail.com</a>
              </li>
              <li>
                <a href="tel:+917306324011">+91 73063 24011</a>
              </li>
              <li className="footer-note">
                <span className="footer-pulse" aria-hidden="true" />
                Replies within 2 hours
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Xyfra Technologies. All rights reserved.</span>
          <span className="footer-disciplines">Software • App • Web • Marketing • SEO</span>
        </div>
      </div>
    </footer>
  )
}
