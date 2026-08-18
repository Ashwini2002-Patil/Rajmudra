import { Link } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"
import Container from "./Container"

const PageHero = ({ title, subtitle, crumb }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-cream-50 to-brand-100 py-14 dark:from-brand-900 dark:via-brand-800 dark:to-brand-900 sm:py-20">
    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-float-slow rounded-full bg-accent-400/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 animate-float-slow rounded-full bg-brand-300/20 blur-3xl [animation-delay:2.5s]" />

    <Container className="relative">
      <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-200">
        <Link to="/" className="hover:text-brand-900 dark:hover:text-white">
          Home
        </Link>
        <FiChevronRight size={14} />
        <span className="text-brand-900/60 dark:text-brand-100/70">{crumb || title}</span>
      </div>
      <h1 className="text-3xl font-bold text-brand-900 dark:text-white sm:text-4xl">{title}</h1>
      {subtitle && <div className="mt-3 max-w-2xl text-brand-900/70 dark:text-brand-100">{subtitle}</div>}
    </Container>
  </section>
)

export default PageHero
