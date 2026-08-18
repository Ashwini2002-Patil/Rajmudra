import { useEffect, useState } from "react"
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { FaQuoteRight } from "react-icons/fa"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import { DEMO_TESTIMONIALS } from "../../utils/demoData"

const AUTOPLAY_MS = 5000

const Testimonials = () => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = DEMO_TESTIMONIALS.length

  useEffect(() => {
    if (paused || count <= 1) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, count])

  const goTo = (i) => setActive(((i % count) + count) % count)

  return (
    <section className="section-y bg-brand-50 dark:bg-brand-900">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Partners Say"
          subtitle="Real feedback from wholesalers, importers and OEM partners we work with."
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {DEMO_TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full shrink-0 px-1">
                  <div className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-md shadow-brand-900/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/15 dark:bg-brand-700 sm:p-10">
                    <FaQuoteRight className="absolute right-6 top-6 text-4xl text-brand-50 dark:text-white/5" />
                    <div className="relative mx-auto mb-4 flex w-fit gap-1 text-accent-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} fill="currentColor" size={16} />
                      ))}
                    </div>
                    <p className="relative text-base leading-relaxed text-brand-900/80 dark:text-brand-200">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="relative mx-auto mt-6 flex w-fit items-center gap-3 border-t border-brand-50 pt-5 dark:border-white/10">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 text-sm font-bold text-white ring-2 ring-accent-500/30 dark:ring-accent-400/60">
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-brand-900 dark:text-white">{t.name}</p>
                        <p className="text-xs text-brand-900/60 dark:text-brand-100">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-14 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-md shadow-brand-900/10 transition-all duration-300 hover:scale-110 hover:bg-brand-600 hover:text-white dark:bg-brand-700 dark:text-brand-200 sm:grid"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 hidden h-10 w-10 translate-x-14 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-md shadow-brand-900/10 transition-all duration-300 hover:scale-110 hover:bg-brand-600 hover:text-white dark:bg-brand-700 dark:text-brand-200 sm:grid"
              >
                <FiChevronRight size={18} />
              </button>

              <div className="mt-8 flex items-center justify-center gap-3">
                {DEMO_TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="relative grid h-4 w-4 place-items-center"
                  >
                    {i === active && (
                      <span className="absolute inset-0 rounded-full bg-accent-500/40 animate-ping" />
                    )}
                    <span
                      className={`relative rounded-full transition-all duration-300 ${
                        i === active
                          ? "h-3 w-3 bg-accent-500 shadow-[0_0_10px_2px_rgba(201,154,63,0.6)]"
                          : "h-2 w-2 bg-brand-300 hover:bg-brand-400 dark:bg-white/20 dark:hover:bg-white/35"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
