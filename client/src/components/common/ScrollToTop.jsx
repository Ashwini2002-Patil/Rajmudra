import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Every SPA route change needs this — the browser keeps the old scroll
// position by default, so without it a page can open half-scrolled down
// instead of starting from the top.
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
