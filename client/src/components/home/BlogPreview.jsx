import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import Button from "../common/Button"
import Reveal from "../common/Reveal"
import { useGetAllBlogsQuery } from "../../redux/api/blogApi"
import { BLOG_DEFAULT_IMAGE } from "../../utils/constants"

const BlogPreview = () => {
  const { data } = useGetAllBlogsQuery()
  const items = data?.data || []

  const displayItems = items.slice(0, 3)

  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          eyebrow="From Our Blog"
          title="Insights on Health & Agro Exports"
          subtitle="Tips, nutrition facts and export know-how from the Rajmudra team."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {displayItems.map((blog, i) => (
            <Reveal key={blog._id || blog.slug} delay={i * 100}>
              <Link
                to={`/blog/${blog.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/15 hover:ring-accent-500/50 dark:bg-brand-700"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.coverImage || BLOG_DEFAULT_IMAGE(500, 320)}
                    alt={blog.title}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  {blog.tags?.[0] && (
                    <span className="mb-3 inline-block rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white dark:bg-white/10 dark:text-brand-200">
                      {blog.tags[0]}
                    </span>
                  )}
                  <h3 className="text-base font-bold leading-snug text-brand-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-accent-400">
                    {blog.title}
                  </h3>
                  <span className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-700 transition-transform duration-300 group-hover:translate-x-1 dark:text-brand-200">
                    Read More <FiArrowRight />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/blog" variant="outline" className="group transition-transform duration-300 hover:scale-105">
            Visit Our Blog
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default BlogPreview
