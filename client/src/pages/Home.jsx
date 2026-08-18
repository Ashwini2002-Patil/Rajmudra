import Hero from "../components/home/Hero"
import PromoTicker from "../components/home/PromoTicker"
import StatsCounter from "../components/home/StatsCounter"
import CategoryShowcase from "../components/home/CategoryShowcase"
import RangeBanner from "../components/home/RangeBanner"
import WhyChooseUs from "../components/home/WhyChooseUs"
import FeaturedProducts from "../components/home/FeaturedProducts"
import VideoShowcase from "../components/home/VideoShowcase"
import TrustStrip from "../components/home/TrustStrip"
import Testimonials from "../components/home/Testimonials"
import BlogPreview from "../components/home/BlogPreview"
import CTASection from "../components/home/CTASection"

const Home = () => {
  return (
    <>
      <Hero />
      <PromoTicker />
      <StatsCounter />
      <CategoryShowcase />
      <RangeBanner />
      <WhyChooseUs />
      <FeaturedProducts />
      <VideoShowcase />
      <TrustStrip />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </>
  )
}

export default Home
