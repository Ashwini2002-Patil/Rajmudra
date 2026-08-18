import { FiAward, FiCheckCircle } from "react-icons/fi"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import Loader from "../components/common/Loader"
import Reveal from "../components/common/Reveal"
import { useGetAllCertificationsQuery } from "../redux/api/certificationApi"

const Certifications = () => {
  const { data, isLoading } = useGetAllCertificationsQuery()
  const items = data?.data || []

  return (
    <>
      <PageHero
        title="Certifications"
        subtitle="Our quality and safety standards are backed by recognised certifications."
      />
      <Container className="relative section-y">
        <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 animate-float-slow rounded-full bg-accent-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 animate-float-slow rounded-full bg-brand-400/10 blur-3xl [animation-delay:3s]" />

        {isLoading && !items?.length ? (
          <Loader label="Loading certifications..." />
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-brand-900/60">No certifications added yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((cert, i) => (
              <Reveal key={cert._id} delay={(i % 4) * 80}>
                <div className="group relative overflow-hidden rounded-2xl bg-white p-7 text-center shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/15 hover:ring-accent-500/40">
                  <span className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="relative mx-auto mb-5 grid h-16 w-16 place-items-center">
                    <span className="absolute inset-0 rounded-full bg-accent-400/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    {cert.certificateImage ? (
                      <img
                        src={cert.certificateImage}
                        alt={cert.name}
                        className="relative h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-white transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700 transition-transform duration-300 group-hover:scale-110">
                        <FiAward size={26} />
                      </span>
                    )}
                    <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-accent-500 text-white shadow-sm ring-2 ring-white">
                      <FiCheckCircle size={12} />
                    </span>
                  </div>

                  <h3 className="mb-1 text-base font-bold text-brand-900">{cert.name}</h3>
                  {cert.issuedBy && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/50">
                      Issued by {cert.issuedBy}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

export default Certifications
