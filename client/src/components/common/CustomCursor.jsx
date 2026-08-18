import { useEffect, useRef, useState } from "react"
import { FiArrowUpRight } from "react-icons/fi"

// Custom mouse cursor: a glowing gold dot glued to the pointer, a trailing
// ring (lerp'd every frame) with a tiny dot orbiting it, and a soft ripple
// burst on every click. Desktop (fine pointer) only — touch devices keep
// their native behaviour untouched.
const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const rippleId = useRef(0)

  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches
  )
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add("custom-cursor-active")

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
      setHovering(!!e.target.closest("a, button, [role='button'], input, textarea, select, label"))
    }
    const onDown = (e) => {
      setPressed(true)
      const id = ++rippleId.current
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples((r) => r.filter((ripple) => ripple.id !== id)), 600)
    }
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      cancelAnimationFrame(rafRef.current)
      document.body.classList.remove("custom-cursor-active")
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* glowing core dot */}
      <span
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-gradient-to-br from-accent-300 to-accent-600 shadow-[0_0_14px_3px_rgba(201,154,63,0.6)] transition-[opacity,width,height] duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        } ${hovering ? "h-1.5 w-1.5" : "h-2.5 w-2.5"}`}
      />

      {/* trailing ring + orbiting companion dot */}
      <span
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] grid place-items-center rounded-full border-[1.5px] border-accent-400/70 bg-accent-400/10 backdrop-blur-[1px] transition-[width,height,opacity,background-color,border-color] duration-200 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        } ${hovering ? "h-12 w-12 border-accent-500 bg-accent-500/15" : "h-9 w-9"} ${
          pressed ? "scale-90" : "scale-100"
        }`}
      >
        <span className="absolute h-1 w-1 rounded-full bg-accent-300 shadow-[0_0_6px_1px_rgba(227,189,111,0.8)] animate-orbit" />
        <FiArrowUpRight
          size={14}
          className={`text-accent-600 transition-all duration-200 ${
            hovering ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
      </span>

      {/* click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 animate-cursor-ripple rounded-full border-2 border-accent-400"
          style={{ transform: `translate3d(${r.x}px, ${r.y}px, 0)` }}
        />
      ))}
    </>
  )
}

export default CustomCursor
