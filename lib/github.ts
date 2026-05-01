const GITHUB_API = 'https://api.github.com'

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
}

function repoBase() {
  const owner  = process.env.GITHUB_OWNER
  const repo   = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? 'main'
  if (!owner || !repo) throw new Error('GITHUB_OWNER and GITHUB_REPO must be set in .env.local')
  return { owner, repo, branch }
}

/** Returns the blob SHA of an existing file, or null if it doesn't exist. */
export async function getFileSha(filePath: string): Promise<string | null> {
  const { owner, repo, branch } = repoBase()
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`
  const res = await fetch(url, { headers: headers() })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub getFileSha failed: ${res.status}`)
  const data = await res.json()
  return data.sha as string
}

/** Creates or updates a file in the repo. */
export async function upsertFile(filePath: string, content: string, message: string) {
  const { owner, repo, branch } = repoBase()
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`
  const sha = await getFileSha(filePath)

  const body: Record<string, string> = {
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch,
  }
  if (sha) body.sha = sha

  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `GitHub upsertFile failed: ${res.status}`)
  }
}

/** Deletes a file from the repo. */
export async function deleteFile(filePath: string, message: string) {
  const { owner, repo, branch } = repoBase()
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`
  const sha = await getFileSha(filePath)
  if (!sha) throw new Error(`File not found: ${filePath}`)

  const res = await fetch(url, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ message, sha, branch }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `GitHub deleteFile failed: ${res.status}`)
  }
}
