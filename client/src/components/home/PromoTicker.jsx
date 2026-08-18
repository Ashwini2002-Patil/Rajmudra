import { FiCheckCircle } from "react-icons/fi"

const MESSAGES = [
  "100% Natural Makhana",
  "Exporting to 15+ Countries",
  "Bulk & OEM Orders Welcome",
  "Lab Tested Quality",
  "Direct Farm Sourcing",
  "Different Flavours Available",
]

// Doubled so the -50% translateX loop is seamless.
const TRACK = [...MESSAGES, ...MESSAGES]

const PromoTicker = () => {
  return (
    <div className="pause-on-hover overflow-hidden border-y border-accent-500/30 bg-brand-900 py-2.5 dark:border-accent-600/40 dark:bg-white">
      <div className="flex w-max animate-marquee items-center">
        {TRACK.map((msg, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 px-6 text-xs font-bold uppercase tracking-widest text-brand-100 dark:text-brand-800"
          >
            <FiCheckCircle className="shrink-0 text-accent-400 dark:text-accent-600" size={13} />
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PromoTicker
