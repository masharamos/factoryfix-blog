import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllBlogSlugs, getBlogPost, getAllBlogPosts } from '@/lib/content'
import CTABlock from '@/components/blog/CTABlock'
import KeepReading from '@/components/blog/KeepReading'
import ShareButtons from '@/components/blog/ShareButtons'

// ─── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
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
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const related = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const hasStats = post.stats && post.stats.length > 0

  return (
    <div className="min-h-screen bg-gray-20">
      <div className="max-w-[900px] mx-auto px-5 py-10">

        {/* ── Back link ─────────────────────────────────────────────────────── */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-body-sm text-gray-800 hover:text-gray-880 transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <header
          className="overflow-hidden relative"
          style={{
            borderRadius: hasStats ? '14px 14px 0 0' : '14px',
            marginBottom: hasStats ? 0 : '40px',
          }}
        >
          {/* B&W background image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1400&q=80&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)',
            }}
          />
          {/* Dark overlay at 40% */}
          <div className="absolute inset-0 bg-gray-880" style={{ opacity: 0.8 }} />

          {/* Polka dot overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.20) 1px, transparent 1px)`,
              backgroundSize: '18px 18px',
            }}
          />

          <div className="relative z-10 p-10">
            {/* Date tag */}
            {post.date && (
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-5 text-body-xxs font-semibold tracking-widest uppercase text-primary-300"
                style={{ background: 'rgba(83,213,139,0.15)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-300" />
                {formatDate(post.date)}
              </div>
            )}

            {/* Title */}
            <h1 className="text-white mb-4 leading-[1.1] font-museo font-black text-heading-lg max-w-2xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-body-sm text-white mb-7 leading-relaxed max-w-xl">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap gap-5">
              {post.author && (
                <div>
                  <div className="text-body-xxs text-white font-semibold tracking-widest uppercase mb-0.5">
                    Author
                  </div>
                  <div className="text-body-xs text-white">{post.author}</div>
                </div>
              )}
              <div>
                <div className="text-body-xxs text-white font-semibold tracking-widest uppercase mb-0.5">
                  Read time
                </div>
                <div className="text-body-xs text-white">{post.readTime} min</div>
              </div>
              {post.dataSources && (
                <div>
                  <div className="text-body-xxs text-white font-semibold tracking-widest uppercase mb-0.5">
                    Data
                  </div>
                  <div className="text-body-xs text-white">{post.dataSources}</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Stats rail ────────────────────────────────────────────────────── */}
        {hasStats && (
          <div
            className="grid bg-white mb-10"
            style={{
              gridTemplateColumns: `repeat(${Math.min(post.stats!.length, 4)}, 1fr)`,
              border: '0.5px solid rgba(15,23,42,0.12)',
              borderTop: 'none',
              borderRadius: '0 0 14px 14px',
            }}
          >
            {post.stats!.slice(0, 4).map((stat, i) => (
              <div
                key={i}
                className="px-5 py-8"
                style={{
                  borderRight:
                    i < Math.min(post.stats!.length, 4) - 1
                      ? '0.5px solid rgba(15,23,42,0.12)'
                      : 'none',
                }}
              >
                <div className="font-inter font-extrabold text-heading-md text-highlight-500 leading-none mb-1">
                  {stat.number}
                </div>
                <div className="text-body-xs text-gray-800 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Body content ──────────────────────────────────────────────────── */}
        <div className="max-w-text">
          <article className="prose">
            <MDXRemote source={post.content} />
          </article>
          <ShareButtons url={`https://www.factoryfix.com/blog/${post.slug}`} title={post.title} />
        </div>

        <CTABlock />

        {/* ── Keep reading ──────────────────────────────────────────────────── */}
        {related.length > 0 && <KeepReading posts={related} />}

      </div>
    </div>
  )
}
