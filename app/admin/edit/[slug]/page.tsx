import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import EditPostClient from './EditPostClient'

interface Stat {
  number: string
  label: string
  hidden: boolean
}

interface PostData {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  createdDate: string
  category: string
  thumbnail: string
  stats: Stat[]
  body: string
  seoTitle: string
  metaDescription: string
  imageAlt: string
  indexed: boolean
}

function getPost(slug: string): PostData | null {
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  // Normalize stats to always 4 rows
  const rawStats: Array<{ number: string; label: string; hidden?: boolean }> = data.stats ?? []
  const stats: Stat[] = Array.from({ length: 4 }, (_, i) => ({
    number: rawStats[i]?.number ?? '',
    label: rawStats[i]?.label ?? '',
    hidden: rawStats[i]?.hidden ?? false,
  }))

  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    author: data.author ?? '',
    date: data.date ?? new Date().toISOString().split('T')[0],
    createdDate: data.createdDate ?? data.date ?? new Date().toISOString().split('T')[0],
    category: data.category ?? '',
    thumbnail: data.thumbnail ?? '',
    stats,
    body: content.trim(),
    seoTitle: data.seoTitle ?? data.title ?? '',
    metaDescription: data.metaDescription ?? data.excerpt ?? '',
    imageAlt: data.imageAlt ?? '',
    indexed: data.indexed !== false,
  }
}

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  return <EditPostClient post={post} />
}
