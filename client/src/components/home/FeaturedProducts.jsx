import { FiArrowRight } from "react-icons/fi"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import Button from "../common/Button"
import Reveal from "../common/Reveal"
import ProductCard from "../products/ProductCard"
import { useGetAllProductsQuery } from "../../redux/api/productApi"

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery()
  const items = data?.data || []

  const displayItems = items.slice(0, 6)

  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          eyebrow="Featured Products"
          title="Best Selling Agro Products"
          subtitle="Handpicked favourites loved by our retail and export partners."
        />

        {isLoading && !items?.length ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100 bg-[length:200%_100%] dark:from-brand-800 dark:via-brand-700 dark:to-brand-800"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayItems.map((product, i) => (
              <Reveal key={product._id || product.id} delay={(i % 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            to="/products"
            variant="outline"
            className="group transition-transform duration-300 hover:scale-105"
          >
            View All Products
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProducts
