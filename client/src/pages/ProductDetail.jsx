import { useParams, Link } from "react-router-dom"
import { FiCheckCircle } from "react-icons/fi"
import Container from "../components/common/Container"
import Loader from "../components/common/Loader"
import Button from "../components/common/Button"
import { useGetProductByIdQuery } from "../redux/api/productApi"
import { getCategoryImage } from "../utils/constants"

const ProductDetail = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetProductByIdQuery(id)

  const product = data?.data

  if (isLoading && !product) return <Loader label="Loading product..." />

  if (!product) {
    return (
      <Container className="section-y text-center">
        <p className="text-brand-900/70">Product not found.</p>
        <Link to="/products" className="mt-4 inline-block font-semibold text-brand-600">
          Back to Products
        </Link>
      </Container>
    )
  }

  const image = product.images?.[0] || getCategoryImage(product.category, 700, 700)

  return (
    <Container className="section-y grid gap-12 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl shadow-xl shadow-brand-900/10">
        <img src={image} alt={product.name} className="h-auto w-full" />
      </div>
      <div>
        {product.category && (
          <span className="mb-4 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 dark:bg-white/10 dark:text-brand-200">
            {product.category}
          </span>
        )}
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white sm:text-4xl">{product.name}</h1>
        <p className="mt-4 text-2xl font-bold text-brand-600 dark:text-accent-400">
          {product.price ? `₹${product.price} ${product.unit ? `/ ${product.unit}` : ""}` : "Enquire for price"}
        </p>
        <p className="mt-6 leading-relaxed text-brand-900/70 dark:text-brand-200">
          {product.description ||
            "Premium quality, sourced directly from trusted farms and processed under strict quality control to ensure freshness and purity in every batch."}
        </p>

        {product.packagingOptions?.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-bold text-brand-900 dark:text-white">Packaging Options</p>
            <div className="flex flex-wrap gap-2">
              {product.packagingOptions.map((opt) => (
                <span key={opt} className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:bg-white/10 dark:text-brand-200">
                  <FiCheckCircle size={12} /> {opt}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <Button to="/sample-request" variant="primary">
            Request Sample
          </Button>
          <Button to="/oem-inquiry" variant="outline">
            Bulk / OEM Order
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default ProductDetail
