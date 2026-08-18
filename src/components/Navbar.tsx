import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navItems } from '../data/nav'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  /* The bar is fixed and fully transparent at the top of the page. Once you
     scroll, content would pass straight through it, so it takes on a blurred
     backing to stay legible. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Any navigation closes the drawer — otherwise it stays open over the new page */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  /* Lock page scroll and allow Escape to dismiss while the drawer is open */
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
        <Link to="/" className="brand">
          <img src={logo} alt="Xyfra Technologies Logo" className="brand-logo" />
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              {/* `end` keeps "/" from matching every route */}
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Tilting CTA — adapted from Uiverse.io by MuhammadHasann. The six
            transparent zones tile the button in a 3x2 grid; whichever one the
            pointer is over decides which corner the face tips away from. */}
        <Link to="/contact" className="container-button nav-cta">
          <span className="hover bt-1" aria-hidden="true" />
          <span className="hover bt-2" aria-hidden="true" />
          <span className="hover bt-3" aria-hidden="true" />
          <span className="hover bt-4" aria-hidden="true" />
          <span className="hover bt-5" aria-hidden="true" />
          <span className="hover bt-6" aria-hidden="true" />
          <span className="btn-face">
            <span className="btn-face-label">Get a Quote</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* Mobile slide-in drawer */}
      <div
        className={`nav-backdrop${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      ></div>

      <aside
        id="mobile-drawer"
        className={`nav-drawer${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-drawer-head">
          <img src={logo} alt="Xyfra Technologies Logo" className="brand-logo" />
          <button
            type="button"
            className="nav-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="nav-drawer-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-drawer-link${isActive ? ' active' : ''}`}
              /* Keyboard focus skips the panel while it's closed */
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Same tilting CTA as the desktop bar, stretched to the drawer width */}
        <Link to="/contact" className="container-button nav-drawer-cta" tabIndex={menuOpen ? 0 : -1}>
          <span className="hover bt-1" aria-hidden="true" />
          <span className="hover bt-2" aria-hidden="true" />
          <span className="hover bt-3" aria-hidden="true" />
          <span className="hover bt-4" aria-hidden="true" />
          <span className="hover bt-5" aria-hidden="true" />
          <span className="hover bt-6" aria-hidden="true" />
          <span className="btn-face">
            <span className="btn-face-label">Get a Quote</span>
          </span>
        </Link>
      </aside>
    </>
  )
}
