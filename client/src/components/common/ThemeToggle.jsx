import { useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi"

// Applies/removes the "dark" class on <html> (index.html has a small inline
// script that sets the initial class before paint, so there's no flash of
// the wrong theme). Preference is remembered in localStorage; first visit
// falls back to the OS-level color scheme.
const ThemeToggle = ({ className = "" }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-accent-400 transition-colors duration-300 hover:bg-white/20 ${className}`}
    >
      <FiSun
        size={16}
        className={`absolute transition-all duration-300 ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
      />
      <FiMoon
        size={16}
        className={`absolute transition-all duration-300 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      />
    </button>
  )
}

export default ThemeToggle
