import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import Loader from "../components/common/Loader"
import Reveal from "../components/common/Reveal"
import { useGetAllBlogsQuery } from "../redux/api/blogApi"
import { BLOG_DEFAULT_IMAGE } from "../utils/constants"

const Blog = () => {
  const { data, isLoading } = useGetAllBlogsQuery()
  const items = data?.data || []

  return (
    <>
      <PageHero title="Blog" subtitle="Nutrition tips, product stories and export insights." />
      <Container className="relative section-y">
        <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 animate-float-slow rounded-full bg-accent-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 animate-float-slow rounded-full bg-brand-400/10 blur-3xl [animation-delay:3s]" />

        {isLoading && !items?.length ? (
          <Loader label="Loading articles..." />
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-brand-900/60">No articles published yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {items.map((blog, i) => (
              <Reveal key={blog._id || blog.slug} delay={(i % 3) * 100}>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/15 hover:ring-accent-500/40"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.coverImage || BLOG_DEFAULT_IMAGE(500, 320)}
                      alt={blog.title}
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {blog.tags?.[0] && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-700 shadow-sm backdrop-blur transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                        {blog.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-bold leading-snug text-brand-900 transition-colors duration-300 group-hover:text-brand-600">
                      {blog.title}
                    </h3>
                    <span className="mt-auto flex items-center gap-1 pt-5 text-xs font-bold text-brand-700">
                      Read More
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

export default Blog
