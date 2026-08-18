import { useRef, useState } from "react"
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import TiltCard from "../common/TiltCard"
import Reveal from "../common/Reveal"

const VideoShowcase = () => {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <section className="relative overflow-hidden bg-brand-900 section-y dark:bg-white">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 animate-float-slow rounded-full bg-accent-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 animate-float-slow rounded-full bg-brand-400/10 blur-3xl [animation-delay:3s]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Rajmudra in Motion"
          title="See Our Makhana Up Close"
          subtitle="A closer look at the quality and craft behind every roasted batch."
          invert
        />

        <Reveal className="mx-auto max-w-6xl perspective-[1500px]">
          <TiltCard
            max={6}
            glare={false}
            className="group overflow-hidden rounded-3xl bg-black shadow-2xl shadow-black/30 ring-1 ring-white/10 dark:shadow-brand-900/10 dark:ring-brand-900/10"
          >
            <video
              ref={videoRef}
              src="/makahan.mp4"
              poster="/makanapacket.jpeg"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Rajmudra Makhana showcase video"
              className="h-[340px] w-full object-contain sm:h-[520px] lg:h-[600px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-100">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause video" : "Play video"}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-brand-900 shadow-lg backdrop-blur transition-transform duration-300 hover:scale-110"
              >
                {playing ? <FiPause size={18} /> : <FiPlay size={18} />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-brand-900 shadow-lg backdrop-blur transition-transform duration-300 hover:scale-110"
              >
                {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
              </button>
            </div>
          </TiltCard>
        </Reveal>
      </Container>
    </section>
  )
}

export default VideoShowcase
