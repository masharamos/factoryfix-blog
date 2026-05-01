import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  author: string
  date: string
  createdDate: string
  modifiedDate: string
  category?: string
  excerpt: string
  thumbnail: string
  indexed?: boolean
  status: 'published' | 'draft'
}

function getPosts(): Post[] {
  const dir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .map(filename => {
      const filePath = path.join(dir, filename)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      const stat = fs.statSync(filePath)
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title ?? 'Untitled',
        author: data.author ?? '',
        date: data.date ?? '',
        createdDate: data.createdDate ?? data.date ?? stat.birthtime.toISOString().split('T')[0],
        modifiedDate: stat.mtime.toISOString().split('T')[0],
        category: data.category ?? '',
        excerpt: data.excerpt ?? '',
        thumbnail: data.thumbnail ?? '',
        indexed: data.indexed !== false,
        status: data.status === 'draft' ? 'draft' : 'published',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export default function AdminDashboard() {
  const posts = getPosts()

  return (
    <div className="min-h-screen bg-gray-40">

      <main className="site-container py-8">

        {/* Title + action row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900" style={{ fontSize: '16px' }}>Blog posts</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
              <path d="M2.458 10C3.732 6.943 6.523 5 10 5c3.477 0 6.268 1.943 7.542 5-1.274 3.057-4.065 5-7.542 5-3.477 0-6.268-1.943-7.542-5z" />
              <circle cx="10" cy="10" r="2.5" />
            </svg>
            <span className="text-body-xs text-gray-400">Admin view</span>
          </div>
          <Link
            href="/admin/new"
            className="px-4 py-2 rounded-lg bg-highlight-500 text-white font-bold font-inter hover:bg-highlight-600 transition-colors flex items-center gap-1.5"
            style={{ fontSize: '14px' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 5v10M5 10h10" />
            </svg>
            New post
          </Link>
        </div>

        {/* Posts table */}
        <div className="bg-white rounded-2xl border border-gray-80 overflow-hidden">

          {/* Table header */}
          <div className="grid grid-cols-[1fr_130px_110px_110px_90px_200px] gap-4 px-6 py-3 border-b border-gray-80 bg-white">
            <span className="text-body-xs font-semibold text-gray-800">Post name</span>
            <span className="text-body-xs font-semibold text-gray-800">Author</span>
            <span className="text-body-xs font-semibold text-gray-800">Created</span>
            <span className="text-body-xs font-semibold text-gray-800">Modified</span>
            <span className="text-body-xs font-semibold text-gray-800">Status</span>
            <span />
          </div>

          {posts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-body-sm text-gray-400 mb-4">No posts yet</p>
              <Link
                href="/admin/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-highlight-500 text-white text-body-sm font-semibold hover:bg-highlight-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 5v10M5 10h10" />
                </svg>
                Write your first post
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-80">
              {posts.map((post) => (
                <li key={post.slug} className="grid grid-cols-[1fr_130px_110px_110px_90px_200px] gap-4 items-center px-6 py-4 hover:bg-gray-20 transition-colors">

                  {/* Post info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#F1F5F9' }}>
                      {post.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793z" />
                          <path d="M11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-body-sm font-semibold text-gray-900 truncate">{post.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {!post.indexed && (
                          <span className="text-body-xxs bg-gray-40 text-gray-400 font-medium px-2 py-0.5 rounded-full">no-index</span>
                        )}
                        <span className="text-body-xxs text-gray-400 font-mono truncate">{post.slug}</span>
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <p className="text-body-xs text-gray-800 truncate">{post.author || '—'}</p>

                  {/* Created */}
                  <p className="text-body-xs text-gray-800">
                    {post.createdDate
                      ? new Date(post.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                  </p>

                  {/* Modified */}
                  <p className="text-body-xs text-gray-800">
                    {post.modifiedDate
                      ? new Date(post.modifiedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                  </p>

                  {/* Status */}
                  <div>
                    {post.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 text-body-xxs font-semibold px-2.5 py-1 rounded-full bg-primary-0 text-primary-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-body-xxs font-semibold px-2.5 py-1 rounded-full bg-gray-40 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-100 text-body-xs font-medium text-gray-820 hover:bg-gray-40 hover:border-gray-200 transition-colors"
                      title="Edit post"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-100 text-body-xs font-medium text-gray-820 hover:bg-gray-40 hover:border-gray-200 transition-colors"
                      title="View live post"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </main>
    </div>
  )
}
