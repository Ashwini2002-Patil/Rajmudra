// Uses the actual logo artwork the user created ("logo style.jpeg" in
// client/public, copied here as logo-full.jpeg) — a horizontal icon + wordmark
// lockup on a navy background, sized to sit on the dark navbar/footer.
// mix-blend-lighten keys out the image's navy background against the
// navbar/footer's own bg-brand-900 so it sits flush without a visible box.
const Logo = ({ className = "", imgClassName = "h-16" }) => (
  <img
    src="/logo-full.jpeg"
    alt="Rajmudra Global Exim"
    className={`${imgClassName} w-auto object-contain mix-blend-lighten ${className}`}
  />
)

export default Logo
