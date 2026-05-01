import { getAllBlogPosts } from '@/lib/content'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Knowledge and resources you need to succeed in manufacturing recruitment.',
}

// Cycles through brand-colored placeholder backgrounds (Tailwind classes)
const PLACEHOLDER_BG = [
  'bg-gray-880',    // dark navy
  'bg-highlight-0', // purple wash
  'bg-primary-0',   // green wash
  'bg-gray-60',     // gray wash
]

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="site-container py-16">
      <h1 className="font-museo text-heading-lg text-gray-880 mb-10">
        The FactoryFix Blog
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white border border-gray-80 rounded-xl overflow-hidden hover:shadow-hover transition-shadow"
          >
            {/* Thumbnail — real image or brand-colored placeholder */}
            <div className="aspect-[16/9] overflow-hidden">
              {post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className={`w-full h-full ${PLACEHOLDER_BG[i % PLACEHOLDER_BG.length]}`} />
              )}
            </div>

            <div className="px-5 py-2 flex flex-col gap-1">
              <h2 className="font-inter font-semibold text-gray-880 text-heading-xs leading-[140%] line-clamp-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-body-sm text-gray-800 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              {post.date && (
                <p className="text-body-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
