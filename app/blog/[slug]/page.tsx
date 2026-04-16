import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllBlogSlugs, getBlogPost } from '@/lib/content'
import ShareButtons from '@/components/blog/ShareButtons'
import CTABlock from '@/components/blog/CTABlock'

// ─── Static params — tells Next.js which slugs exist at build time ────────────
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

// ─── Dynamic metadata per post ────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

// ─── Format date helper ───────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const pageUrl = `https://www.factoryfix.com/blog/${post.slug}`

  return (
    <div>
      {/* ── Back to blog ──────────────────────────────────────────────────── */}
      <div className="site-container pt-8 pb-0">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-800 hover:text-gray-880 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>
      </div>

      {/* ── Hero image — optional ─────────────────────────────────────────── */}
      {post.thumbnail && (
        <div className="site-container mt-8">
          <div className="rounded-2xl overflow-hidden aspect-[2/1] bg-gray-40">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ── Article header ────────────────────────────────────────────────── */}
      <div className="site-container">
        <div className="max-w-text mx-auto pt-10 pb-4">

          {/* Category + date — both optional, only renders if at least one exists */}
          {(post.category || post.date) && (
            <div className="flex items-center gap-3 mb-5">
              {post.category && (
                <span className="inline-block px-3 py-1 bg-primary-0 text-primary-600 text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              )}
              {post.date && (
                <span className="text-sm text-gray-800">
                  {formatDate(post.date)}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="font-museo text-display-sm text-gray-880 leading-tight mb-5">
            {post.title}
          </h1>

          {/* Excerpt / subheadline — optional */}
          {post.excerpt && (
            <p className="text-body-lg text-gray-820 leading-relaxed border-b border-gray-80 pb-8">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* ── Body content ──────────────────────────────────────────────────── */}
      <div className="site-container">
        <div className="max-w-text mx-auto">
          <article className="prose">
            <MDXRemote source={post.content} />
          </article>

          {/* ── Share buttons ──────────────────────────────────────────── */}
          <ShareButtons url={pageUrl} title={post.title} />
        </div>
      </div>

      {/* ── CTA block ─────────────────────────────────────────────────────── */}
      <div className="site-container pb-20">
        <div className="max-w-text mx-auto">
          <CTABlock />
        </div>
      </div>
    </div>
  )
}
