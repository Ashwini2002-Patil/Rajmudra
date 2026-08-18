import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import Container from "../common/Container"
import TiltCard from "../common/TiltCard"
import Reveal from "../common/Reveal"

const RangeBanner = () => {
  return (
    <section className="section-y">
      <Container>
        <Reveal className="perspective-[1500px]">
          <TiltCard
            max={5}
            glare={false}
            className="group overflow-hidden rounded-3xl shadow-xl shadow-brand-900/10 ring-1 ring-brand-900/5"
          >
            <img
              src="/makanapacket.jpeg"
              alt="Rajmudra premium Makhana range — Classic Salted, Peri Peri, Tandoori, Cheese & Herbs, Chocolate, Jalapeño Lime and Masala flavours, plus jars, canisters and gift collections"
              className="w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent p-6 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left">
              <div>
                <p className="text-lg font-bold text-white sm:text-xl">7 Bold Flavours. One Trusted Brand.</p>
                <p className="text-sm text-brand-200">
                  Pouches, jars, canisters &amp; gift boxes — for retail, wholesale and export.
                </p>
              </div>
              <Link
                to="/products"
                className="group/btn inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-brand-900 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-accent-400"
              >
                Explore Range
                <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </TiltCard>
        </Reveal>
      </Container>
    </section>
  )
}

export default RangeBanner
