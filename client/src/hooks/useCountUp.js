import { useEffect, useRef, useState } from "react"

// Animates a number from 0 to `end` once the element scrolls into view.
// Returns [ref, value] — attach ref to the element you want to watch.
export const useCountUp = (end, { duration = 1600 } = {}) => {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return
        hasRun.current = true

        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration])

  return [ref, value]
}
