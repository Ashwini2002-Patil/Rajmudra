import { FiGlobe, FiFeather, FiStar, FiShield } from "react-icons/fi"
import Container from "../common/Container"
import { useCountUp } from "../../hooks/useCountUp"

const STATS = [
  { icon: FiGlobe, end: 15, suffix: "+", label: "Countries Served" },
  { icon: FiFeather, end: 100, suffix: "%", label: "Natural Sourcing" },
  { icon: FiStar, end: 3, suffix: "+", label: "Roasted Flavours" },
  { icon: FiShield, end: 100, suffix: "%", label: "Lab Tested Quality" },
]

const StatItem = ({ icon: Icon, end, suffix, label }) => {
  const [ref, value] = useCountUp(end)
  return (
    <div
      ref={ref}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-500/40 hover:bg-white/10 dark:border-brand-900/10 dark:bg-brand-900/5 dark:hover:border-accent-600/50 dark:hover:bg-brand-900/10"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-500/15 text-accent-400 transition-transform duration-300 group-hover:scale-110 dark:bg-accent-600/15 dark:text-accent-600">
        <Icon size={22} />
      </div>
      <p className="text-3xl font-bold text-white dark:text-brand-900 sm:text-4xl">
        {value}
        <span className="text-accent-400 dark:text-accent-600">{suffix}</span>
      </p>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-200 dark:text-brand-600">{label}</p>
    </div>
  )
}

const StatsCounter = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-900 py-14 dark:from-white dark:to-brand-50">
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 animate-float-slow rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/15" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default StatsCounter
