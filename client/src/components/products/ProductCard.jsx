import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import { getCategoryImage } from "../../utils/constants"
import TiltCard from "../common/TiltCard"

const ProductCard = ({ product }) => {
  const { _id, id, name, category, images, price, unit } = product || {}
  const productId = _id || id
  const image = images?.[0] || getCategoryImage(category, 500, 500)

  return (
    <Link
      to={`/products/${productId}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/15 hover:ring-accent-500/50 dark:bg-brand-700"
    >
      <TiltCard max={10} className="perspective-distant">
        <img src={image} alt={name} className="h-72 w-full object-contain" />
      </TiltCard>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-brand-900 dark:text-white">{name}</h3>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-base font-bold text-accent-600">
            {price ? `₹${price} ${unit ? `/ ${unit}` : ""}` : "Enquire for price"}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-brand-700 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-brand-200">
            View <FiArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
