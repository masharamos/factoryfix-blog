'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { useEffect, useRef, useState } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (val: string) => void
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-md text-body-xs font-medium transition-colors ${
        active ? 'bg-highlight-500 text-white' : 'text-gray-820 hover:bg-gray-40'
      }`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[320px] prose prose-sm max-w-none px-5 py-4 text-gray-900',
      },
    },
  })

  useEffect(() => {
    if (editor && value === '') editor.commands.clearContent()
  }, [editor, value])

  useEffect(() => {
    if (showLinkInput) setTimeout(() => linkInputRef.current?.focus(), 50)
  }, [showLinkInput])

  useEffect(() => {
    if (showImageInput) setTimeout(() => linkInputRef.current?.focus(), 50)
  }, [showImageInput])

  const applyLink = () => {
    if (linkUrl) editor?.chain().focus().setLink({ href: linkUrl }).run()
    else editor?.chain().focus().unsetLink().run()
    setLinkUrl('')
    setShowLinkInput(false)
  }

  const applyImageUrl = () => {
    if (imageUrl) editor?.chain().focus().setImage({ src: imageUrl }).run()
    setImageUrl('')
    setShowImageInput(false)
  }

  const insertImageFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      if (src) editor?.chain().focus().setImage({ src }).run()
    }
    reader.readAsDataURL(file)
  }

  if (!editor) return null

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden focus-within:border-highlight-500 focus-within:ring-2 focus-within:ring-highlight-500/10 transition-all [&_blockquote]:border-l-0 [&_blockquote]:bg-primary-0 [&_blockquote]:rounded-md [&_blockquote]:px-4 [&_blockquote]:py-3 [&_img]:rounded-lg [&_img]:my-4 [&_img]:w-full">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-80 bg-gray-20">
        <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <em>I</em>
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-100 mx-1" />

        <ToolbarButton title="Heading" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          H2
        </ToolbarButton>
        <ToolbarButton title="Subheading" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          H3
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-100 mx-1" />

        <ToolbarButton title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          • List
        </ToolbarButton>
        <ToolbarButton title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          1. List
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-100 mx-1" />

        <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          &quot; Quote
        </ToolbarButton>

        {/* Link button + inline input */}
        <div className="relative flex items-center">
          <ToolbarButton
            title="Insert link"
            onClick={() => { setShowImageInput(false); setShowLinkInput(v => !v) }}
            active={editor.isActive('link') || showLinkInput}
          >
            🔗 Link
          </ToolbarButton>
          {showLinkInput && (
            <div className="absolute top-full left-0 mt-1 z-20 flex items-center gap-1 bg-white border border-gray-100 rounded-lg shadow-hover px-2 py-1.5 min-w-[260px]">
              <input
                ref={linkInputRef}
                type="url"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') applyLink(); if (e.key === 'Escape') setShowLinkInput(false) }}
                placeholder="https://..."
                className="flex-1 text-body-xs outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button type="button" onClick={applyLink} className="text-body-xs font-semibold text-primary-500 hover:text-primary-600 px-1">Apply</button>
              <button type="button" onClick={() => setShowLinkInput(false)} className="text-gray-400 hover:text-gray-800 text-body-xs px-1">✕</button>
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-gray-100 mx-1" />

        {/* Image — URL or upload */}
        <div className="relative flex items-center gap-0.5">
          <ToolbarButton title="Insert image from URL" onClick={() => { setShowLinkInput(false); setShowImageInput(v => !v) }} active={showImageInput}>
            🖼 URL
          </ToolbarButton>
          {showImageInput && (
            <div className="absolute top-full left-0 mt-1 z-20 flex items-center gap-1 bg-white border border-gray-100 rounded-lg shadow-hover px-2 py-1.5 min-w-[260px]">
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') applyImageUrl(); if (e.key === 'Escape') setShowImageInput(false) }}
                placeholder="https://..."
                className="flex-1 text-body-xs outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button type="button" onClick={applyImageUrl} className="text-body-xs font-semibold text-primary-500 hover:text-primary-600 px-1">Insert</button>
              <button type="button" onClick={() => setShowImageInput(false)} className="text-gray-400 hover:text-gray-800 text-body-xs px-1">✕</button>
            </div>
          )}
          <ToolbarButton title="Upload image" onClick={() => imageInputRef.current?.click()}>
            ↑ Upload
          </ToolbarButton>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) insertImageFile(file)
              e.target.value = ''
            }}
          />
        </div>

        <div className="w-px h-4 bg-gray-100 mx-1" />

        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          ↩ Undo
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          Redo ↪
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  )
}
