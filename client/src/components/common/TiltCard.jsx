import { useRef } from "react"
import clsx from "clsx"

// Mouse-tracked 3D tilt + light-sheen effect for photos/videos — no library,
// just a perspective() transform driven by cursor position within the card.
const TiltCard = ({ children, className, max = 10, scale = 1.03, glare = true }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * max * 2
    const rotateX = (py - 0.5) * -max * 2
    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`

    const sheen = el.querySelector("[data-tilt-sheen]")
    if (sheen) {
      sheen.style.opacity = "1"
      sheen.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), transparent 60%)`
    }
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    const sheen = el.querySelector("[data-tilt-sheen]")
    if (sheen) sheen.style.opacity = "0"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx("relative transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
      {glare && (
        <span
          data-tilt-sheen
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  )
}

export default TiltCard
