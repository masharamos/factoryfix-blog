'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import StatsEditor from '@/components/admin/StatsEditor'
import ImageUpload from '@/components/admin/ImageUpload'

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false })

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

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function SectionCard({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-80 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-80">
        <h2 className="text-body-lg font-semibold text-gray-900">{title}</h2>
        {hint && <p className="text-body-xs text-gray-800 mt-0.5">{hint}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div>
        <label className="text-body-sm font-semibold text-gray-840">{label}</label>
        {hint && <p className="text-body-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

const inputClass = "w-full px-3.5 py-2.5 rounded-lg border border-gray-100 text-body-sm text-gray-900 placeholder:text-body-xs placeholder:text-gray-400 outline-none focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500/10 transition-all"

export default function EditPostClient({ post }: { post: PostData }) {
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [slugManual, setSlugManual] = useState(true) // always manual in edit mode
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [author, setAuthor] = useState(post.author)
  const [date, setDate] = useState(post.date)
  const [createdDate, setCreatedDate] = useState(post.createdDate)
  const [thumbnail, setThumbnail] = useState(post.thumbnail)
  const [stats, setStats] = useState<Stat[]>(post.stats)
  const [body, setBody] = useState(post.body)
  const [seoTitle, setSeoTitle] = useState(post.seoTitle)
  const [seoTitleManual, setSeoTitleManual] = useState(post.seoTitle !== post.title)
  const [metaDescription, setMetaDescription] = useState(post.metaDescription)
  const [metaDescManual, setMetaDescManual] = useState(post.metaDescription !== post.excerpt)
  const [imageAlt, setImageAlt] = useState(post.imageAlt)
  const [indexed, setIndexed] = useState(post.indexed)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const save = async (status: 'draft' | 'published') => {
    setSaving(true)
    setToast(null)
    try {
      const res = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title, excerpt, author, date, createdDate, thumbnail, stats, body, seoTitle, metaDescription, imageAlt, indexed, status }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setToast({ type: 'success', message: status === 'published' ? 'Changes published!' : 'Draft saved!' })
    } catch (err: unknown) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Something went wrong' })
    } finally {
      setSaving(false)
    }
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!seoTitleManual) setSeoTitle(val)
  }

  const handleExcerptChange = (val: string) => {
    setExcerpt(val)
    if (!metaDescManual) setMetaDescription(val)
  }

  return (
    <div className="min-h-screen bg-gray-40">

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-80 py-3.5">
        <div className="site-container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-1 text-body-sm text-gray-400 hover:text-gray-900 transition-colors">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5l-5 5 5 5" />
            </svg>
            Blog posts
          </Link>
          <span className="text-gray-100">/</span>
          <span className="text-body-sm font-semibold text-gray-900 truncate max-w-[240px]">{title || post.slug}</span>
        </div>

        <div className="flex items-center gap-2">
          {toast && (
            <span className={`text-body-xs font-medium px-3 py-1.5 rounded-lg ${toast.type === 'success' ? 'bg-primary-0 text-primary-600' : 'bg-red-50 text-red-600'}`}>
              {toast.message}
            </span>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={() => save('draft')}
            className="px-4 py-2 rounded-lg border border-gray-100 text-body-sm text-gray-820 font-medium hover:bg-gray-40 transition-colors disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save('published')}
            className="px-4 py-2 rounded-lg bg-highlight-500 text-white text-body-sm font-semibold hover:bg-highlight-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-5">

        {/* Post details */}
        <SectionCard title="Post details">
          <div className="flex flex-col gap-4">

            <Field label="Name" hint="This will appear as the main headline on the post page">
              <input
                type="text"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. The 2026 State of Industrial Hiring"
                className={inputClass}
              />
            </Field>

            <Field label="Slug" hint={`Your post URL: factoryfix.com/blog/${slug || 'your-post-title'}`}>
              <div className="relative">
                <input
                  type="text"
                  value={slug}
                  onChange={e => { setSlug(e.target.value); setSlugManual(true) }}
                  placeholder="your-post-title"
                  className={inputClass}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-body-xxs bg-gray-40 text-gray-400 font-medium px-2 py-0.5 rounded-full">
                  editing
                </span>
              </div>
            </Field>

            <Field label="Excerpt" hint="Short description shown on blog cards and in Google results (150–160 chars)">
              <textarea
                value={excerpt}
                onChange={e => handleExcerptChange(e.target.value)}
                placeholder="A brief summary of what this post covers…"
                rows={3}
                className={`${inputClass} resize-none`}
              />
              <p className="text-body-xxs text-gray-400 text-right">{excerpt.length} / 160</p>
            </Field>

          </div>
        </SectionCard>

        {/* Blog image */}
        <SectionCard title="Blog image" hint="Shown on blog cards and at the top of the post">
          <ImageUpload value={thumbnail} onChange={setThumbnail} />
        </SectionCard>

        {/* Author & Date */}
        <SectionCard title="Author & date">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Author">
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="e.g. FactoryFix Research"
                className={inputClass}
              />
            </Field>
            <Field label="Created">
              <input
                type="date"
                value={createdDate}
                onChange={e => setCreatedDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Publish date">
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Key metrics */}
        <SectionCard title="Key metrics" hint="Stats shown below the hero — hide any you don't need">
          <StatsEditor stats={stats} onChange={setStats} />
        </SectionCard>

        {/* Body content */}
        <SectionCard title="Content" hint="Write your full post here">
          <RichTextEditor value={body} onChange={setBody} />
        </SectionCard>

        {/* SEO */}
        <SectionCard title="SEO" hint="Controls how this post appears in Google and when shared">
          <div className="flex flex-col gap-4">

            <Field label="SEO title" hint="Shown in browser tab and Google — ideally under 60 chars">
              <div className="relative">
                <input
                  type="text"
                  value={seoTitle}
                  onChange={e => { setSeoTitle(e.target.value); setSeoTitleManual(true) }}
                  placeholder="e.g. How to Hire Welders Fast | FactoryFix"
                  className={inputClass}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {!seoTitleManual && seoTitle && (
                    <span className="text-body-xxs bg-primary-0 text-primary-500 font-medium px-2 py-0.5 rounded-full">auto</span>
                  )}
                  <span className={`text-body-xxs font-medium ${seoTitle.length > 60 ? 'text-critical-DEFAULT' : 'text-gray-400'}`}>
                    {seoTitle.length} / 60
                  </span>
                </div>
              </div>
            </Field>

            <Field label="Meta description" hint="Snippet shown in Google results — ideally 150–160 chars">
              <textarea
                value={metaDescription}
                onChange={e => { setMetaDescription(e.target.value); setMetaDescManual(true) }}
                placeholder="A short summary of what this post is about…"
                rows={3}
                className={`${inputClass} resize-none`}
              />
              <div className="flex items-center justify-between">
                {!metaDescManual && metaDescription && (
                  <span className="text-body-xxs bg-primary-0 text-primary-500 font-medium px-2 py-0.5 rounded-full">auto-filled from excerpt</span>
                )}
                <p className={`text-body-xxs ml-auto ${metaDescription.length > 160 ? 'text-critical-DEFAULT' : 'text-gray-400'}`}>
                  {metaDescription.length} / 160
                </p>
              </div>
            </Field>

            <Field label="Image alt text" hint="Describes the blog image for screen readers and Google Images">
              <input
                type="text"
                value={imageAlt}
                onChange={e => setImageAlt(e.target.value)}
                placeholder="e.g. A welder working on the factory floor"
                className={inputClass}
              />
            </Field>

            {/* Sitemap indexing */}
            <div className="flex items-start justify-between gap-4 pt-2 border-t border-gray-80">
              <div>
                <p className="text-body-sm font-semibold text-gray-900">Sitemap indexing</p>
                <p className="text-body-xs text-gray-800 mt-0.5">
                  {indexed
                    ? 'Search engines can find and index this post.'
                    : 'This post is hidden from search engines (noindex).'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIndexed(v => !v)}
                className={`relative flex-shrink-0 inline-flex items-center w-10 h-6 rounded-full transition-colors duration-200 mt-0.5 ${indexed ? 'bg-primary-500' : 'bg-gray-200'}`}
                aria-label="Toggle sitemap indexing"
              >
                <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ml-1 ${indexed ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

          </div>
        </SectionCard>

        {/* Bottom save bar */}
        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-80 px-6 py-4">
          <p className="text-body-xs text-gray-400">
            Live at <span className="text-gray-900 font-medium">factoryfix.com/blog/{slug}</span>
          </p>
          <button
            type="button"
            disabled={saving}
            onClick={() => save('published')}
            className="px-5 py-2.5 rounded-lg bg-highlight-500 text-white text-body-sm font-semibold hover:bg-highlight-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>

      </main>
    </div>
  )
}
