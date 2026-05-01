import Link from 'next/link'
import type { BlogPost } from '@/lib/content'

interface KeepReadingProps {
  posts: BlogPost[]
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function KeepReading({ posts }: KeepReadingProps) {
  return (
    <section className="mt-16 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="font-inter text-heading-sm text-gray-880">
          Keep reading
        </div>
        <div className="flex gap-2">
          <button
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-body-sm transition-colors hover:bg-black/5 text-gray-880"
            style={{ border: '0.5px solid rgba(15,23,42,0.2)', background: 'transparent', cursor: 'pointer' }}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-body-sm transition-colors hover:bg-black/5 text-gray-880"
            style={{ border: '0.5px solid rgba(15,23,42,0.2)', background: 'transparent', cursor: 'pointer' }}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl overflow-hidden bg-white transition-colors"
            style={{ border: '0.5px solid rgba(15,23,42,0.12)', textDecoration: 'none', color: 'inherit' }}
          >
            {/* Thumbnail */}
            <div
              className="aspect-[16/9] overflow-hidden flex items-center justify-center"
              style={{ borderBottom: '0.5px solid rgba(15,23,42,0.12)' }}
            >
              {post.thumbnail ? (
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-40" />
              )}
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="font-inter text-body-lg text-gray-880 leading-snug mb-2.5">
                {post.title}
              </div>
              <div className="flex gap-2 text-body-xs text-gray-800">
                {post.author && <span>{post.author}</span>}
                {post.author && post.date && <span>·</span>}
                {post.date && <span>{formatDate(post.date)}</span>}
                {(post.author || post.date) && post.readTime && <span>·</span>}
                {post.readTime && <span>{post.readTime} min</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
