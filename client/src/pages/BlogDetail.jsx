import { useParams, Link } from "react-router-dom"
import { FiArrowLeft, FiClock } from "react-icons/fi"
import Container from "../components/common/Container"
import Loader from "../components/common/Loader"
import Reveal from "../components/common/Reveal"
import { useGetBlogBySlugQuery } from "../redux/api/blogApi"
import { BLOG_DEFAULT_IMAGE } from "../utils/constants"

const NUMBERED_HEADING = /^##\s*\d+\.\s*(.+)/

// Blog content is stored as plain text with blank-line-separated paragraphs;
// a line starting with "## " is a section heading. Keeps the admin's
// write-a-blog form simple (just a textarea) while still giving longer
// articles real visual structure:
//  - Every paragraph before the first "## " heading is the intro/description
//    — rendered together as one light overview panel with bold text.
//  - Headings numbered "## 1. Title" are treated specially: any consecutive
//    run of them (each followed by its own paragraph) renders as a big
//    editorial numeral + heading + hanging-indent paragraph instead of
//    plain text, so a "5 reasons/benefits" style article gets its own
//    magazine-style showcase.
const renderContent = (content) => {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  let firstHeadingIdx = blocks.findIndex((b) => b.startsWith("## "))
  if (firstHeadingIdx === -1) firstHeadingIdx = blocks.length
  const introBlocks = blocks.slice(0, firstHeadingIdx)
  const restBlocks = blocks.slice(firstHeadingIdx)

  const introNode = introBlocks.length ? (
    <div
      key="intro"
      className="relative mb-10 overflow-hidden rounded-2xl bg-white p-8 shadow-md shadow-brand-900/5 ring-1 ring-brand-900/5 sm:p-9"
    >
      <span className="absolute inset-x-0 top-0 h-[3px] animate-shimmer bg-gradient-to-r from-accent-400 via-accent-600 to-accent-400" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-float-slow rounded-full bg-accent-400/10 blur-3xl" />
      <span className="relative mb-4 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
        Overview
      </span>
      <div className="relative space-y-4">
        {introBlocks.map((block, i) => (
          <p key={i} className="text-lg font-semibold leading-relaxed text-black">
            {block}
          </p>
        ))}
      </div>
    </div>
  ) : null

  const nodes = []
  let group = []
  let section = null // { heading, paragraphs: [] } — a "## Heading" plus the plain paragraphs under it

  const flushGroup = () => {
    if (!group.length) return
    const items = group
    nodes.push(
      <div key={`group-${nodes.length}`} className="my-10 divide-y divide-brand-100">
        {items.map((item, idx) => (
          <Reveal key={idx} delay={idx * 80}>
            <div className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-baseline gap-4">
                <span className="shrink-0 bg-gradient-to-br from-accent-400 to-accent-600 bg-clip-text font-display text-5xl font-extrabold leading-none text-transparent sm:text-6xl">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-brand-900 sm:text-xl">{item.title}</h3>
              </div>
              <p className="mt-3 pl-16 text-sm leading-relaxed text-brand-900/70 sm:pl-20 sm:text-base">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    )
    group = []
  }

  // Renders a "## Heading" and the paragraphs under it as its own card —
  // same visual language as the Overview panel — instead of bare text
  // floating on the page.
  const flushSection = () => {
    if (!section) return
    const { heading, paragraphs } = section
    nodes.push(
      <Reveal key={`sec-${nodes.length}`}>
        <div className="relative my-8 overflow-hidden rounded-2xl bg-white p-7 shadow-md shadow-brand-900/5 ring-1 ring-brand-900/5 sm:p-8">
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600" />
          <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-brand-900 sm:text-2xl">
            <span className="h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-accent-400 to-accent-600" />
            {heading}
          </h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-brand-900/75">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    )
    section = null
  }

  for (let i = 0; i < restBlocks.length; i++) {
    const block = restBlocks[i]
    const numberedMatch = block.match(NUMBERED_HEADING)

    if (numberedMatch && restBlocks[i + 1] && !restBlocks[i + 1].startsWith("## ")) {
      flushSection()
      group.push({ title: numberedMatch[1], text: restBlocks[i + 1] })
      i++ // consume the paired paragraph
      continue
    }

    if (block.startsWith("## ")) {
      flushGroup()
      flushSection()
      section = { heading: block.slice(3), paragraphs: [] }
      continue
    }

    flushGroup()

    if (section) {
      section.paragraphs.push(block)
    } else {
      nodes.push(
        <p key={i} className="leading-relaxed text-brand-900/75">
          {block}
        </p>
      )
    }
  }

  flushGroup()
  flushSection()
  return introNode ? [introNode, ...nodes] : nodes
}

const BlogDetail = () => {
  const { slug } = useParams()
  const { data, isLoading } = useGetBlogBySlugQuery(slug)

  const blog = data?.data

  if (isLoading && !blog) return <Loader label="Loading article..." />

  if (!blog) {
    return (
      <Container className="section-y text-center">
        <p className="text-brand-900/70">Article not found.</p>
        <Link to="/blog" className="mt-4 inline-block font-semibold text-brand-600">
          Back to Blog
        </Link>
      </Container>
    )
  }

  const wordCount = blog.content ? blog.content.trim().split(/\s+/).length : 0
  const readMins = Math.max(1, Math.round(wordCount / 200))

  return (
    <article>
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-cream-50 to-brand-100 py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-accent-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 animate-float-slow rounded-full bg-brand-300/20 blur-3xl [animation-delay:2s]" />
        <Container className="relative max-w-3xl">
          <Reveal>
            <Link
              to="/blog"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
            >
              <FiArrowLeft size={14} /> Back to Blog
            </Link>
            {blog.tags?.[0] && (
              <span className="mb-4 block w-fit rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
                {blog.tags[0]}
              </span>
            )}
            <h1 className="text-3xl font-bold leading-tight text-brand-900 sm:text-4xl">{blog.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-900/60">
              {blog.author && <span>By {blog.author}</span>}
              {blog.author && <span className="h-1 w-1 rounded-full bg-brand-900/30" />}
              <span className="flex items-center gap-1.5">
                <FiClock size={13} /> {readMins} min read
              </span>
            </div>
          </Reveal>
        </Container>
      </div>
      <Container className="section-y max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <Reveal>
            <img
              src={blog.coverImage || BLOG_DEFAULT_IMAGE(900, 500)}
              alt={blog.title}
              className="h-[320px] w-full rounded-2xl object-cover shadow-md shadow-brand-900/10 sm:h-[420px] lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)] lg:max-h-[600px]"
            />
          </Reveal>
          <div className="max-w-none space-y-5">
            {blog.content ? (
              renderContent(blog.content)
            ) : (
              <p className="leading-relaxed text-brand-900/80">
                This article is coming soon. Check back later for insights on nutrition, our
                products and export practices.
              </p>
            )}
          </div>
        </div>
      </Container>
    </article>
  )
}

export default BlogDetail
