import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

// Fades + slides content in once it scrolls into view — keeps the page
// feeling alive as you scroll, not just on first load.
const Reveal = ({ children, className, delay = 0, y = 24 }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={clsx("transition-all duration-700 ease-out", className)}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  )
}

export default Reveal
