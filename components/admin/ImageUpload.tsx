'use client'

import { useRef, useState } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [mode, setMode] = useState<'upload' | 'url'>('url')

  const handleFile = (file: File) => {
    // UI only — will wire up to Vercel Blob later
    const preview = URL.createObjectURL(file)
    onChange(preview)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Mode toggle */}
      <div className="flex gap-1 bg-gray-40 p-1 rounded-lg self-start">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 rounded-md text-body-xs font-medium transition-colors ${mode === 'upload' ? 'bg-white text-gray-900 shadow-resting' : 'text-gray-800 hover:text-gray-900'}`}
        >
          Upload file
          <span className="ml-1 text-body-xxs text-gray-400">(preview only)</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 rounded-md text-body-xs font-medium transition-colors ${mode === 'url' ? 'bg-white text-gray-900 shadow-resting' : 'text-gray-800 hover:text-gray-900'}`}
        >
          Paste URL
        </button>
      </div>

      {mode === 'upload' ? (
        <>
          <p className="text-body-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            ⚠️ File upload is preview only — the image won&apos;t be saved with the post. Use <button type="button" onClick={() => setMode('url')} className="underline font-medium">Paste URL</button> to save an image.
          </p>
          <div
            className={`relative border-2 border-dashed rounded-xl flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
              dragging ? 'border-highlight-500 bg-highlight-0' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-20'
            }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="w-8 h-8 rounded-lg bg-gray-40 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-800">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
            </div>
            <div>
              <p className="text-body-sm font-medium text-gray-900">Drag & drop or click to upload</p>
              <p className="text-body-xs text-gray-400">PNG, JPG, WebP — recommended 1600×900px</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-100 text-body-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500/10 transition-all"
          />
          <button
            type="button"
            onClick={() => { onChange(urlInput); setUrlInput('') }}
            className="px-4 py-2.5 rounded-lg bg-gray-900 text-white text-body-sm font-medium hover:bg-gray-860 transition-colors"
          >
            Use
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-gray-40">
          <img src={value} alt="Thumbnail preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-900/70 text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
            aria-label="Remove image"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
