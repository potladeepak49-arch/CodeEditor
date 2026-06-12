'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LANGUAGES } from '@/config/languages'
import { EDITOR_THEMES } from '@/config/themes'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

export default function NewSnippetPage() {
  const router = useRouter()
  const [title, setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme]       = useState('vs-dark')
  const [tags, setTags]         = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [code, setCode]         = useState('// Write your code here\n')
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors]     = useState({})

  const currentLanguage = LANGUAGES.find(l => l.id === language) ?? LANGUAGES[0]
  const currentTheme    = EDITOR_THEMES.find(t => t.id === theme) ?? EDITOR_THEMES[0]

  function validate() {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!code.trim() || code.trim() === '// Write your code here') e.code = 'Code cannot be empty'
    return e
  }

 async function handleSave() {
  const validationErrors = validate()
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }
  setIsSaving(true)
  try {
    const res = await fetch('/api/snippets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, language, code, tags, isPublic }),
    })
    const data = await res.json()
    if (!data.success) {
      setErrors({ general: data.error.message })
      setIsSaving(false)
      return
    }
    toast.success('Snippet saved successfully!')
    router.push('/snippets')
  } catch (err) {
    toast.error('Failed to save snippet')
    setIsSaving(false)
  }
}

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border bg-card shrink-0">
        <Link href="/snippets">
          <Button variant="ghost" size="icon" className="w-7 h-7">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-sm font-semibold">New Snippet</h1>
        <div className="flex-1" />

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ background: currentLanguage.color }} />
              {currentLanguage.label}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LANGUAGES.map(lang => (
              <DropdownMenuItem
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className="gap-2 text-xs"
              >
                <span className="w-2 h-2 rounded-full" style={{ background: lang.color }} />
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              {currentTheme.label}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {EDITOR_THEMES.map(t => (
              <DropdownMenuItem
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="text-xs"
              >
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving
            ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
            : <><Save className="w-3 h-3" /> Save Snippet</>
          }
        </Button>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left — Metadata */}
        <div className="w-[280px] shrink-0 border-r border-border bg-card overflow-y-auto p-4 space-y-4">
          {errors.general && (
  <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
    {errors.general}
  </div>
)}

          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs">Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Binary Search"
              value={title}
              onChange={e => { setTitle(e.target.value); setErrors(p => ({...p, title:''})) }}
              className={`h-8 text-sm ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs">Description</Label>
            <textarea
              id="description"
              placeholder="What does this snippet do?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full h-20 px-3 py-2 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tags" className="text-xs">Tags</Label>
            <Input
              id="tags"
              placeholder="e.g. algorithm, search"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="h-8 text-sm"
            />
            <p className="text-xs text-muted-foreground">Comma separated</p>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs">Make Public</Label>
            <button
              onClick={() => setIsPublic(p => !p)}
              className={`relative w-9 h-5 rounded-full transition-colors ${isPublic ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isPublic ? 'translate-x-4' : ''}`} />
            </button>
          </div>

          {errors.code && (
            <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
              {errors.code}
            </p>
          )}
        </div>

        {/* Right — Editor */}
        <div className="flex-1 overflow-hidden">
          <MonacoEditor
            height="100%"
            language={currentLanguage.monacoId}
            theme={theme}
            value={code}
            onChange={(val) => {
              setCode(val ?? '')
              setErrors(p => ({...p, code: ''}))
            }}
            options={{
              fontSize: 14,
              fontFamily: '"JetBrains Mono", monospace',
              minimap:              { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers:          'on',
              tabSize:              2,
              wordWrap:             'on',
              automaticLayout:      true,
              padding:              { top: 16 },
              smoothScrolling:      true,
              cursorBlinking:       'smooth',
            }}
          />
        </div>

      </div>
    </div>
  )
}