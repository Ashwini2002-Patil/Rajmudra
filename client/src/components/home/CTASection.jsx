import { FiArrowRight } from "react-icons/fi"
import Container from "../common/Container"
import Button from "../common/Button"

const CTASection = () => {
  return (
    <section className="section-y">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-16 text-center shadow-xl shadow-brand-900/20 ring-1 ring-accent-500/20 dark:from-brand-600 dark:to-brand-700 dark:shadow-black/30 dark:ring-accent-500/40 sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-float-slow rounded-full bg-accent-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 animate-float-slow rounded-full bg-brand-400/20 blur-3xl [animation-delay:3s]" />

          <span className="relative mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            Let's Grow Together
          </span>
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Ready to Partner with Rajmudra?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-brand-200">
            Whether you're looking for bulk orders, private labelling, or export partnerships —
            we're ready to help you scale.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button
              to="/contact"
              variant="light"
              className="group text-base shadow-lg shadow-black/10 transition-transform duration-300 hover:scale-105"
            >
              Contact Us <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              to="/oem-inquiry"
              variant="outline"
              className="border-white text-white transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-brand-900"
            >
              OEM / Private Label
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTASection
