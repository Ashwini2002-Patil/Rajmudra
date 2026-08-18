import { FiPackage } from "react-icons/fi"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import ProductCard from "../components/products/ProductCard"
import { useGetAllProductsQuery } from "../redux/api/productApi"

const Products = () => {
  const { data, isLoading } = useGetAllProductsQuery()
  const items = data?.data || []

  return (
    <>
      <PageHero title="Our Products" subtitle="Browse our range of premium roasted Makhana." />
      <Container className="section-y">
        {isLoading && !items?.length ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100 bg-[length:200%_100%]"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-brand-400">
              <FiPackage size={24} />
            </span>
            <p className="text-brand-900/60">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

export default Products
