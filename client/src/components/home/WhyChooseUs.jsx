import { FiFeather, FiShield, FiGlobe, FiTruck } from "react-icons/fi"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import Reveal from "../common/Reveal"

const FEATURES = [
  {
    icon: FiFeather,
    title: "100% Natural",
    desc: "No artificial additives — pure, farm-fresh agro products.",
  },
  {
    icon: FiShield,
    title: "Quality Assured",
    desc: "Every batch is lab tested and certified for safety & purity.",
  },
  {
    icon: FiGlobe,
    title: "Global Exports",
    desc: "Reliable export operations to 15+ countries and growing.",
  },
  {
    icon: FiTruck,
    title: "Bulk & OEM Ready",
    desc: "Flexible packaging for bulk orders and private labelling.",
  },
]

const TONES = [
  "bg-accent-500/15 text-accent-400 dark:bg-accent-500/15 dark:text-accent-600",
  "bg-brand-400/20 text-brand-200 dark:bg-brand-400/20 dark:text-brand-700",
]

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white section-y dark:bg-white dark:text-brand-900">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 animate-float-slow rounded-full bg-accent-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 animate-float-slow rounded-full bg-brand-400/10 blur-3xl [animation-delay:3s]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why Rajmudra"
          title="Trusted by Partners Worldwide"
          subtitle="From farm to export container, we maintain quality and transparency at every step."
          invert
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-500/40 hover:bg-white/10 hover:shadow-xl hover:shadow-black/20 dark:border-brand-900/10 dark:bg-brand-900/5 dark:hover:border-accent-600/50 dark:hover:bg-brand-900/10 dark:hover:shadow-brand-900/10">
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
                <div
                  className={`mb-5 grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${TONES[i % TONES.length]}`}
                >
                  <feature.icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-brand-200 dark:text-brand-600">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs
