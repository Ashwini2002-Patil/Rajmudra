import { Link } from "react-router-dom"
import { FiAward } from "react-icons/fi"
import { useGetAllCertificationsQuery } from "../../redux/api/certificationApi"
import SectionHeading from "../common/SectionHeading"
import Container from "../common/Container"

const TrustStrip = () => {
  const { data } = useGetAllCertificationsQuery()
  const certifications = data?.data || []

  if (!certifications.length) return null

  // Doubled so the -50% translateX marquee loop is seamless.
  const track = [...certifications, ...certifications]

  return (
    <section className="section-y bg-brand-50 dark:bg-brand-900">
      <Container>
        <SectionHeading
          eyebrow="Certified & Trusted"
          title="Backed by Recognised Certifications"
          subtitle="Our quality and safety standards are verified by trusted certification bodies."
        />
      </Container>

      <div className="pause-on-hover overflow-hidden">
        <div className="flex w-max animate-marquee-slow items-stretch gap-5 px-5">
          {track.map((cert, i) => (
            <Link
              key={`${cert._id}-${i}`}
              to="/certifications"
              className="group flex w-56 shrink-0 flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-accent-500/40 dark:bg-brand-700"
            >
              <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-brand-100 text-brand-700 transition-transform duration-300 group-hover:scale-110 dark:bg-white/10 dark:text-brand-200">
                {cert.certificateImage ? (
                  <img src={cert.certificateImage} alt={cert.name} className="h-14 w-14 object-cover" />
                ) : (
                  <FiAward size={22} />
                )}
              </div>
              <p className="text-sm font-bold text-brand-900 dark:text-white">{cert.name}</p>
              {cert.issuedBy && <p className="text-xs text-brand-900/60 dark:text-brand-100">Issued by {cert.issuedBy}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustStrip
