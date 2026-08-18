import { FaWhatsapp } from "react-icons/fa"
import { FiMail } from "react-icons/fi"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import TiltCard from "../common/TiltCard"
import Reveal from "../common/Reveal"
import Loader from "../common/Loader"
import { BRAND } from "../../utils/constants"
import { useGetAllShowcaseProductsQuery } from "../../redux/api/showcaseProductApi"

const CategoryShowcase = () => {
  const { data, isLoading } = useGetAllShowcaseProductsQuery()
  const products = data?.data || []

  return (
    <section className="section-y bg-brand-50 dark:bg-brand-900">
      <Container>
        <SectionHeading
          eyebrow="What We Offer"
          title="Export-Grade Makhana Range"
          subtitle="Every lot is graded, moisture-tested and packed to international food safety standards."
        />

        {isLoading && !products.length ? (
          <Loader label="Loading products..." />
        ) : products.length === 0 ? (
          <p className="py-4 text-center text-brand-900/60 dark:text-brand-100">Products coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item, i) => {
              const inquiryMessage = `Hi, I'm interested in ${item.title}. Please share more details.`
              const whatsappHref = `${BRAND.whatsapp}?text=${encodeURIComponent(inquiryMessage)}`
              const mailHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(
                `Inquiry: ${item.title}`
              )}&body=${encodeURIComponent(inquiryMessage)}`
              return (
                <Reveal key={item._id} delay={(i % 3) * 100}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/15 hover:ring-accent-500/50 dark:bg-brand-700">
                    <TiltCard max={10} className="perspective-distant">
                      <img src={item.image} alt={item.title} className="aspect-[3/2] w-full object-contain" />
                    </TiltCard>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 text-lg font-bold text-brand-900 dark:text-white">{item.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-brand-900/70 dark:text-brand-100">{item.description}</p>

                      {item.specs?.length > 0 && (
                        <dl className="mb-6 space-y-2 border-t border-brand-100 pt-4 dark:border-white/10">
                          {item.specs.map((s) => (
                            <div key={s.label} className="flex gap-2 text-sm">
                              <dt className="w-20 shrink-0 font-bold text-brand-900 dark:text-brand-100">{s.label}</dt>
                              <dd className="text-brand-900/70 dark:text-brand-100">{s.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      <div className="mt-auto flex gap-3">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-900/15 transition-all duration-300 hover:scale-105 hover:bg-brand-700"
                        >
                          <FaWhatsapp size={16} />
                          Send Inquiry
                        </a>
                        <a
                          href={mailHref}
                          aria-label={`Email inquiry for ${item.title}`}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 shadow-sm shadow-brand-900/5 transition-all duration-300 hover:scale-105 hover:bg-brand-100 dark:bg-white/10 dark:text-brand-200 dark:hover:bg-white/20"
                        >
                          <FiMail size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}

export default CategoryShowcase
