import {
  FiFeather,
  FiHeart,
  FiSun,
  FiStar,
  FiShield,
  FiUsers,
  FiAward,
  FiArrowRight,
  FiGlobe,
  FiCheckCircle,
} from "react-icons/fi"
import { Link } from "react-router-dom"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import SectionHeading from "../components/common/SectionHeading"
import Loader from "../components/common/Loader"
import TiltCard from "../components/common/TiltCard"
import Reveal from "../components/common/Reveal"
import Testimonials from "../components/home/Testimonials"
import RangeBanner from "../components/home/RangeBanner"
import CTASection from "../components/home/CTASection"
import { useGetAllCertificationsQuery } from "../redux/api/certificationApi"
import { useGetAllProcessStepsQuery } from "../redux/api/processStepApi"

const STORY_HIGHLIGHTS = [
  { icon: FiGlobe, label: "15+ Countries Served" },
  { icon: FiFeather, label: "100% Farm-Direct Sourcing" },
  { icon: FiStar, label: "3 Roasted Flavours" },
]

const WHY_CHOOSE = [
  { icon: FiFeather, title: "Fresh & Natural", desc: "Sourced fresh from trusted farms and roasted with no artificial additives." },
  { icon: FiHeart, title: "Nutrient-Rich & Tasty", desc: "A wholesome snack that's naturally high in protein and low in fat." },
  { icon: FiSun, title: "Sustainable Sourcing", desc: "Working directly with farmers for sustainable, farmer-first sourcing." },
  { icon: FiStar, title: "Multiple Flavours", desc: "From classic roasted to peri-peri and salted caramel — more on the way." },
  { icon: FiShield, title: "Premium Quality Assurance", desc: "Every batch is lab tested and certified for safety & purity." },
  { icon: FiUsers, title: "Dedicated Partner Support", desc: "Responsive support for retail, wholesale and OEM partners." },
]

const TRUST_BADGES = [
  { icon: FiShield, label: "Trusted Network" },
  { icon: FiAward, label: "Quality Assured" },
  { icon: FiHeart, label: "Customer Focused" },
  { icon: FiGlobe, label: "Global Delivery" },
]

// General, publicly documented nutritional profile of makhana (fox nuts) —
// widely reported figures (USDA FoodData Central and Indian nutrition
// sources), not a lab certificate for Rajmudra's specific batch. Presented
// as educational info about the ingredient, same as it's commonly shown on
// other makhana brand sites.
const NUTRITION = [
  { label: "Calories", value: "~350", unit: "kcal" },
  { label: "Protein", value: "9.7", unit: "g" },
  { label: "Carbohydrates", value: "76", unit: "g" },
  { label: "Fat", value: "0.1", unit: "g" },
  { label: "Potassium", value: "500", unit: "mg" },
  { label: "Calcium", value: "60", unit: "mg" },
  { label: "Cholesterol", value: "0", unit: "mg" },
  { label: "Magnesium", value: "~210", unit: "mg" },
]

const About = () => {
  const { data: certData, isLoading: certLoading } = useGetAllCertificationsQuery()
  const certifications = (certData?.data || []).slice(0, 4)

  const { data: stepsData, isLoading: stepsLoading } = useGetAllProcessStepsQuery()
  const processSteps = stepsData?.data || []

  return (
    <>
      <PageHero
        title="About Rajmudra"
        subtitle={
          <>
            <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-accent-400">
              Connecting India's Finest Products with Global Markets
            </span>
            <span className="mb-3 block">
              Rajmudra Global Exim is an India-based export and sourcing company focused on
              delivering premium-quality Indian food and agricultural products to buyers across
              international markets.
            </span>
            <span className="block">
              We believe that global trade is built on Quality, Trust and Reliability. From
              carefully selecting products and trusted suppliers to quality checks, professional
              packaging and export documentation, we work to make every shipment smooth and
              dependable.
            </span>
          </>
        }
      />

      <section className="relative overflow-hidden section-y">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 animate-float-slow rounded-full bg-brand-200/30 blur-3xl" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative perspective-distant">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] border-2 border-accent-500/40" />
            <TiltCard max={8} className="overflow-hidden rounded-3xl shadow-xl shadow-brand-900/10">
              <img
                src="/makanabottel.jpeg"
                alt="Rajmudra premium roasted Makhana"
                className="h-[420px] w-full object-contain"
              />
            </TiltCard>
            <div className="absolute -bottom-6 -right-6 flex animate-float items-center gap-4 rounded-2xl bg-white p-5 shadow-xl shadow-brand-900/15 dark:bg-brand-700 sm:-right-8">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white">
                100%
              </div>
              <div>
                <p className="text-sm font-bold text-brand-900 dark:text-white">Natural Makhana</p>
                <p className="text-xs text-brand-900/60 dark:text-brand-200">Pure, farm-sourced quality</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 dark:bg-white/10 dark:text-brand-200">
              Our Story
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-brand-900 dark:text-white sm:text-4xl">
              From an Indian Vision to a
              <span className="relative inline-block text-brand-600 dark:text-accent-400">
                {" "}
                Global Journey
                <svg
                  className="absolute -bottom-2 left-0 w-full text-accent-500"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 9C60 3 240 3 298 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mb-3 font-semibold text-brand-900/80 dark:text-brand-100 leading-relaxed">
              Every great business begins with a simple vision.
            </p>
            <p className="mb-3 text-brand-900/70 dark:text-brand-200 leading-relaxed">
              Rajmudra Global Exim was built with a vision to connect the rich quality of Indian
              products with opportunities in markets across the world.
            </p>
            <p className="mb-3 text-brand-900/70 dark:text-brand-200 leading-relaxed">
              India has always been known for its diverse agricultural products, natural
              ingredients and rich food heritage. We saw an opportunity to take these products
              beyond borders — with better quality, professional presentation and dependable
              export service.
            </p>
            <p className="mb-8 text-brand-900/70 dark:text-brand-200 leading-relaxed">
              Our journey began with a focus on understanding what global buyers truly value:
              consistent quality, reliable supply, transparent communication and long-term
              relationships.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              {STORY_HIGHLIGHTS.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm font-semibold text-brand-800 shadow-sm shadow-brand-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/10 dark:text-brand-100"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-600">
                    <h.icon size={13} />
                  </span>
                  {h.label}
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-900/15 transition-all duration-300 hover:scale-105 hover:bg-brand-700"
            >
              Explore Our Makhana
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden section-y bg-brand-50 dark:bg-brand-900">
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 animate-float-slow rounded-full bg-accent-400/15 blur-3xl" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Why Rajmudra"
            title="Why Choose Rajmudra Makhana?"
            subtitle="Six reasons wholesalers, importers and OEM partners choose us."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10 hover:ring-accent-500/40 dark:bg-brand-700"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent-500/15 text-accent-600 transition-transform duration-300 group-hover:scale-110 dark:text-accent-400">
                  <item.icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-900 dark:text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-900/70 dark:text-brand-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeading
            eyebrow="Our Process"
            title="From Trusted Sources to Global Delivery"
            subtitle="Every order goes through a structured sourcing, quality and export process."
          />

          {stepsLoading && !processSteps.length ? (
            <Loader label="Loading process steps..." />
          ) : processSteps.length === 0 ? (
            <p className="py-4 text-center text-brand-900/60 dark:text-brand-300">Process steps coming soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step) => (
                <div
                  key={step._id}
                  className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm shadow-brand-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-brand-900/10 dark:border-white/10 dark:bg-brand-700"
                >
                  <div className="aspect-[3/2] w-full overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-bold text-brand-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-brand-900/70 dark:text-brand-200">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl bg-brand-900 px-8 py-6 dark:bg-white">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5 text-sm font-semibold text-white dark:text-brand-900">
                <b.icon className="text-accent-400 dark:text-accent-600" size={18} />
                {b.label}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <RangeBanner />

      <section className="relative overflow-hidden bg-brand-900 text-white section-y dark:bg-white dark:text-brand-900">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 animate-float-slow rounded-full bg-accent-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 animate-float-slow rounded-full bg-brand-400/10 blur-3xl [animation-delay:3s]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Good for You"
            title="Nutritional Value of Makhana"
            subtitle="Typical nutrition profile of makhana (fox nuts), per 100g — naturally low in fat and cholesterol-free."
            invert
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {NUTRITION.map((n) => (
              <div
                key={n.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-accent-500/30 dark:border-brand-900/10 dark:bg-brand-900/5 dark:hover:bg-brand-900/10"
              >
                <p className="text-2xl font-bold text-accent-400 dark:text-accent-600">
                  {n.value}
                  <span className="ml-1 text-sm font-semibold text-accent-400/70 dark:text-accent-600/70">{n.unit}</span>
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-200 dark:text-brand-700">{n.label}</p>
              </div>
            ))}
          </div>
          <p className="relative mt-6 text-center text-xs text-brand-300 dark:text-brand-600">
            General nutritional information for makhana as an ingredient (USDA FoodData Central /
            public nutrition sources) — not a lab certificate for a specific batch.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden section-y bg-brand-50 dark:bg-brand-900">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 animate-float-slow rounded-full bg-brand-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 h-56 w-56 animate-float-slow rounded-full bg-accent-400/15 blur-3xl [animation-delay:2s]" />

        <Container className="relative">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 dark:bg-white/10 dark:text-brand-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              Certified & Trusted
            </span>
            <h2 className="text-3xl font-bold leading-tight text-brand-900 dark:text-white sm:text-4xl">
              Backed by Recognised Certifications
            </h2>
            <p className="mt-4 text-base text-brand-900/70 dark:text-brand-100 sm:text-lg">
              Our quality and safety standards are verified by trusted certification bodies.
            </p>
          </div>

          {certLoading && !certifications.length ? (
            <Loader label="Loading certifications..." />
          ) : certifications.length === 0 ? (
            <p className="py-4 text-center text-brand-900/60 dark:text-brand-300">Certifications coming soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert) => (
                <div
                  key={cert._id}
                  className="group relative overflow-hidden rounded-2xl bg-white p-7 text-center shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10 hover:ring-accent-500/40 dark:bg-brand-700"
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent-500 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="relative mx-auto mb-5 h-16 w-16">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700 ring-2 ring-transparent transition-all duration-300 group-hover:scale-110 group-hover:ring-accent-500/30 dark:bg-white/10 dark:text-brand-200">
                      {cert.certificateImage ? (
                        <img src={cert.certificateImage} alt={cert.name} className="h-16 w-16 rounded-full object-cover" />
                      ) : (
                        <FiAward size={26} />
                      )}
                    </div>
                    <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-accent-500 text-white shadow-sm ring-2 ring-white dark:ring-brand-700">
                      <FiCheckCircle size={12} />
                    </span>
                  </div>

                  <h3 className="mb-1 text-base font-bold text-brand-900 dark:text-white">{cert.name}</h3>
                  {cert.issuedBy && <p className="text-xs text-brand-900/60 dark:text-brand-200">Issued by {cert.issuedBy}</p>}
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/certifications"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-sm shadow-brand-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:text-brand-900 dark:bg-brand-700 dark:text-brand-100 dark:hover:text-white"
            >
              View All Certifications
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>

      <Testimonials />
      <CTASection />
    </>
  )
}

export default About
