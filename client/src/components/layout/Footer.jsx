import { Link } from "react-router-dom"
import { FiPhone, FiMail, FiMapPin, FiInstagram } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import Container from "../common/Container"
import Logo from "../common/Logo"
import { BRAND, NAV_LINKS, INQUIRY_LINKS, PRODUCT_CATEGORIES, PRODUCT_RANGE } from "../../utils/constants"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-transparent bg-brand-900 text-brand-100 dark:border-white/10">
      <Container className="grid gap-y-8 gap-x-8 py-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-3">
          <div className="mb-3">
            <Logo imgClassName="h-12" />
          </div>
          <p className="text-sm leading-relaxed text-brand-200">{BRAND.tagline}</p>
          <div className="mt-3 flex gap-2.5">
            {[
              { Icon: FaWhatsapp, href: BRAND.whatsapp },
              { Icon: FiInstagram, href: BRAND.instagram },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand-500"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-300">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-brand-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="mb-3 mt-5 text-sm font-bold uppercase tracking-widest text-brand-300">
            Business
          </h4>
          <ul className="space-y-2">
            {INQUIRY_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-brand-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-300">
            Our Products
          </h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {PRODUCT_RANGE.map((group) => (
              <div key={group.category}>
                {group.category.startsWith("Makhana") ? (
                  <Link
                    to={`/products?category=${encodeURIComponent(PRODUCT_CATEGORIES[0])}`}
                    className="text-sm font-semibold text-brand-100 hover:text-white"
                  >
                    {group.category}
                  </Link>
                ) : (
                  <p className="text-sm font-semibold text-brand-100">{group.category}</p>
                )}
                <ul className="mt-1 space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-xs leading-snug text-brand-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-300">
            Get in Touch
          </h4>
          <ul className="space-y-2.5 text-sm text-brand-200">
            <li className="flex items-start gap-2.5">
              <FiMapPin className="mt-0.5 shrink-0 text-brand-400" /> {BRAND.address}
            </li>
            <li className="flex items-center gap-2.5">
              <FiPhone className="shrink-0 text-brand-400" /> {BRAND.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <FiMail className="shrink-0 text-brand-400" />
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${BRAND.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <FiInstagram className="shrink-0 text-brand-400" />
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                @rajmudra_global_exim
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-4">
        <Container className="text-center text-xs text-brand-300">
          <p>© {year} {BRAND.name}. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
