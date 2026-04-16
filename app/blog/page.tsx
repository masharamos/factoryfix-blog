import { getAllBlogPosts } from '@/lib/content'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Knowledge and resources you need to succeed in manufacturing recruitment.',
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="site-container py-16">
      <h1 className="font-museo text-heading-lg text-gray-880 mb-10">
        The FactoryFix Blog
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white border border-gray-80 rounded-xl overflow-hidden hover:shadow-hover transition-shadow"
          >
            {post.thumbnail && (
              <div className="aspect-[16/9] bg-gray-40 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-5">
              {post.category && (
                <span className="text-xs font-semibold text-primary-500 uppercase tracking-wide">
                  {post.category}
                </span>
              )}
              <h2 className="font-museo text-heading-xs text-gray-880 mt-1 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-gray-800 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              {post.date && (
                <p className="text-xs text-gray-400 mt-3">
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
