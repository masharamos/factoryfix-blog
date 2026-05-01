import TurndownService from 'turndown'

export interface PostFormData {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  createdDate: string
  thumbnail: string
  stats: Array<{ number: string; label: string; hidden: boolean }>
  body: string        // HTML from TipTap
  seoTitle: string
  metaDescription: string
  imageAlt: string
  indexed: boolean
  status: 'draft' | 'published'
}

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
})

function esc(str: string) {
  return str.replace(/"/g, '\\"')
}

/** Converts form data into a .md file string ready to commit. */
export function serializePost(data: PostFormData): string {
  // Only include stats that have content (regardless of hidden flag)
  const stats = data.stats
    .filter(s => s.number || s.label)
    .map(s => `  - number: "${esc(s.number)}"\n    label: "${esc(s.label)}"${s.hidden ? '\n    hidden: true' : ''}`)

  const lines: string[] = [
    '---',
    `title: "${esc(data.title)}"`,
    `date: "${data.date}"`,
    `createdDate: "${data.createdDate}"`,
    `author: "${esc(data.author)}"`,
    `excerpt: "${esc(data.excerpt)}"`,
    `thumbnail: "${data.thumbnail}"`,
    `status: ${data.status}`,
    `indexed: ${data.indexed}`,
  ]

  if (stats.length > 0) {
    lines.push('stats:')
    stats.forEach(s => lines.push(s))
  }

  if (data.seoTitle && data.seoTitle !== data.title) {
    lines.push(`seoTitle: "${esc(data.seoTitle)}"`)
  }
  if (data.metaDescription && data.metaDescription !== data.excerpt) {
    lines.push(`metaDescription: "${esc(data.metaDescription)}"`)
  }
  if (data.imageAlt) {
    lines.push(`imageAlt: "${esc(data.imageAlt)}"`)
  }

  lines.push('---')

  // Convert HTML body → markdown
  const markdown = data.body ? td.turndown(data.body) : ''

  return lines.join('\n') + '\n\n' + markdown + '\n'
}
