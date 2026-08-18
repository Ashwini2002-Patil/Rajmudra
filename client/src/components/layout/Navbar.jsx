import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FiMenu, FiX, FiPhoneCall } from "react-icons/fi"
import Container from "../common/Container"
import Button from "../common/Button"
import Logo from "../common/Logo"
import ThemeToggle from "../common/ThemeToggle"
import { BRAND, NAV_LINKS } from "../../utils/constants"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-transparent bg-brand-900 transition-all duration-300 dark:border-white/10 ${
        scrolled ? "shadow-lg shadow-black/25" : ""
      }`}
    >
      <div className="h-[3px] w-full animate-shimmer bg-gradient-to-r from-accent-400 via-accent-600 to-accent-400" />

      <Container className="flex h-20 items-center justify-between">
        <NavLink to="/" className="group flex items-center">
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `group relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive ? "text-white" : "text-brand-200 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute inset-0 rounded-full bg-white/10" />}
                  <span className="relative">{link.label}</span>
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-accent-400 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${BRAND.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-200 transition-colors hover:text-white"
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/10 text-accent-400">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-400/30" />
              <FiPhoneCall className="relative" size={14} />
            </span>
            {BRAND.phone}
          </a>
          <ThemeToggle />
          <Button
            to="/sample-request"
            variant="accent"
            className="transition-transform duration-300 hover:scale-105"
          >
            Request Sample
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`grid transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </span>
          </button>
        </div>
      </Container>

      <div
        className={`grid overflow-hidden border-white/10 bg-brand-900 transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-2 py-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-base font-semibold transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-brand-200 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={`tel:${BRAND.phone}`}
              className="mt-2 flex items-center gap-2 px-4 text-sm font-semibold text-brand-200"
            >
              <FiPhoneCall className="text-accent-400" /> {BRAND.phone}
            </a>
            <Button
              to="/sample-request"
              variant="accent"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Request Sample
            </Button>
          </Container>
        </div>
      </div>
    </header>
  )
}

export default Navbar
