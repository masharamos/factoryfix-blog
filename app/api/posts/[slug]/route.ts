import { NextRequest, NextResponse } from 'next/server'
import { upsertFile, deleteFile } from '@/lib/github'
import { serializePost, type PostFormData } from '@/lib/serialize-post'

/** PUT /api/posts/[slug] — update an existing post */
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const data: PostFormData = await req.json()
    const filePath = `content/blog/${params.slug}.md`
    const content  = serializePost(data)
    const verb     = data.status === 'published' ? 'Update' : 'Save draft'

    await upsertFile(filePath, content, `${verb}: ${data.title}`)

    // If slug was renamed, delete the old file
    if (data.slug !== params.slug) {
      const oldPath = `content/blog/${params.slug}.md`
      await deleteFile(oldPath, `Rename: ${params.slug} → ${data.slug}`)
    }

    return NextResponse.json({ ok: true, slug: data.slug })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[PUT /api/posts]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/** DELETE /api/posts/[slug] — delete a post */
export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const filePath = `content/blog/${params.slug}.md`
    await deleteFile(filePath, `Delete post: ${params.slug}`)
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[DELETE /api/posts]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
