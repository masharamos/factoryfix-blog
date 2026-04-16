import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentRoot = path.join(process.cwd(), 'content')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  category: string
  excerpt: string
  thumbnail: string
  content: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getSlugs(dir: string): string[] {
  const fullPath = path.join(contentRoot, dir)
  if (!fs.existsSync(fullPath)) return []
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .filter((f) => !f.startsWith('_'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

function getMarkdownFile<T>(dir: string, slug: string): T | null {
  const mdPath = path.join(contentRoot, dir, `${slug}.md`)
  const mdxPath = path.join(contentRoot, dir, `${slug}.mdx`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { ...data, slug, content } as T
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export function getAllBlogSlugs(): string[] {
  return getSlugs('blog')
}

export function getBlogPost(slug: string): BlogPost | null {
  return getMarkdownFile<BlogPost>('blog', slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllBlogSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
