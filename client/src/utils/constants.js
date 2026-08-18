export const BRAND = {
  name: "Rajmudra",
  tagline: "Exporting quality importing trust",
  phone: "+91 78410 56118",
  email: "info@rajmudraglobalexim.com",
  address: "Plot no 29 Sr. No 59 / 60 Paylat Baba Nagri Chh. Sambhajinagar 431001",
  instagram: "https://www.instagram.com/rajmudra_global_exim?utm_source=qr&igsh=MWpzaW9nbnViZDk5Mw==",
  whatsapp: "https://wa.me/917841056118",
}

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "Certifications", to: "/certifications" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
]

// Business pivoted to Makhana-only — Moringa Powder/Spices/Other Agro
// Products were removed (deleted from the DB via
// server/delete-non-makhana-products.js).
export const PRODUCT_CATEGORIES = ["Makhana"]

// Full company product range for display only (e.g. footer) — not tied to
// the DB catalog, which is Makhana-only per the pivot above. Represents the
// broader range Rajmudra Global Exim sources/exports as a company.
export const PRODUCT_RANGE = [
  {
    category: "Makhana (Fox Nuts)",
    items: ["Raw Makhana", "Roasted Makhana", "Flavoured Makhana", "Different grades & sizes", "Bulk Export Packs"],
  },
  {
    category: "Moringa Products",
    items: ["Moringa Leaf Powder", "Moringa-based products", "Bulk / Export Packaging"],
  },
  {
    category: "Agricultural Products",
    items: ["Grains & Cereals", "Pulses & Legumes", "Seeds", "Spices", "Other agricultural commodities"],
  },
  {
    category: "Processed Food Products",
    items: ["Roasted & Flavoured Snacks", "Private Label Products", "Custom Packaging"],
  },
]

// Real, category-relevant photos (Unsplash) — replaces the old random picsum.photos
// placeholders that had no connection to the actual product/content.
const CATEGORY_IMAGE_IDS = {
  Makhana: "1710421576768-ff985fa63b60", // roasted makhana / fox nuts
}

export const getCategoryImage = (category, w = 600, h = 600) => {
  const id = CATEGORY_IMAGE_IDS[category] || CATEGORY_IMAGE_IDS.Makhana
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`
}

// Default blog cover when an article has no coverImage of its own
export const BLOG_DEFAULT_IMAGE = (w = 500, h = 320) =>
  `https://images.unsplash.com/photo-1710421576768-ff985fa63b60?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const INQUIRY_LINKS = [
  { label: "Request a Sample", to: "/sample-request" },
  { label: "OEM / Private Label", to: "/oem-inquiry" },
  { label: "Export Inquiry", to: "/export-inquiry" },
]
