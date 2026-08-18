import { FiArrowRight, FiCheckCircle } from "react-icons/fi"
import Container from "../common/Container"
import Button from "../common/Button"
import TiltCard from "../common/TiltCard"
import Reveal from "../common/Reveal"

const HIGHLIGHTS = ["100% Natural", "Lab Tested Quality", "Direct Farm Sourcing"]

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-cream-50 to-brand-100 dark:from-brand-900 dark:via-brand-800 dark:to-brand-900">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-float-slow rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 animate-float-slow rounded-full bg-accent-400/25 blur-3xl [animation-delay:2s]" />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28">
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm shadow-brand-900/5 dark:bg-white/10 dark:text-brand-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            Trusted Agro Exporter
          </span>
          <h1 className="text-4xl font-bold leading-[1.1] text-brand-900 dark:text-white sm:text-5xl lg:text-6xl">
            Pure Roasted Makhana,
            <span className="relative inline-block text-brand-600 dark:text-accent-400">
              {" "}
              Straight from the Farm
              <svg
                className="absolute -bottom-2 left-0 w-full text-accent-500"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 240 3 298 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-900/70 dark:text-brand-100 sm:text-lg">
            Rajmudra grows, processes and exports premium roasted Makhana — trusted by
            wholesalers, OEM partners and importers worldwide.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              to="/products"
              variant="primary"
              className="group text-base shadow-md shadow-brand-900/15 transition-transform duration-300 hover:scale-105"
            >
              Explore Products <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              to="/export-inquiry"
              variant="outline"
              className="text-base transition-transform duration-300 hover:scale-105"
            >
              Export Inquiry
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h}
                className="flex items-center gap-2 rounded-full bg-white/70 py-2 pl-2 pr-4 text-sm font-semibold text-brand-800 shadow-sm shadow-brand-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:bg-white/10 dark:text-brand-100 dark:hover:bg-white/15"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-600">
                  <FiCheckCircle size={13} />
                </span>
                {h}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="relative perspective-distant">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] border-2 border-accent-500/40" />
          <TiltCard max={8} className="overflow-hidden rounded-3xl bg-brand-900 shadow-2xl shadow-brand-900/20 ring-1 ring-brand-900/5">
            <video
              src="/barand.mp4"
              poster="/makanabottel.jpeg"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Rajmudra premium Makhana"
              className="aspect-[848/478] w-full object-contain"
            />
          </TiltCard>
        </Reveal>
      </Container>
    </section>
  )
}

export default Hero
