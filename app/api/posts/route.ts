import { NextRequest, NextResponse } from 'next/server'
import { upsertFile } from '@/lib/github'
import { serializePost, type PostFormData } from '@/lib/serialize-post'

export async function POST(req: NextRequest) {
  try {
    const data: PostFormData = await req.json()

    if (!data.slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }
    if (!data.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const filePath = `content/blog/${data.slug}.md`
    const content  = serializePost(data)
    const verb     = data.status === 'published' ? 'Publish' : 'Save draft'

    await upsertFile(filePath, content, `${verb}: ${data.title}`)

    return NextResponse.json({ ok: true, slug: data.slug })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[POST /api/posts]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
