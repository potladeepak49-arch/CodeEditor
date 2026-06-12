'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { LANGUAGES } from '@/config/languages'
import { EDITOR_THEMES } from '@/config/themes'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import ShareModal from '@/components/snippets/ShareModal'
import {
  ArrowLeft, Star, Share2,
  Play, Save, ChevronDown, Loader2, Copy, Check
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEditorStore } from '@/store/editorStore'
import { useExecutionStore } from '@/store/executionStore'
import OutputPanel from '@/components/editor/OutputPanel'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months[date.getUTCMonth()] + ' ' + date.getUTCDate()
}

export default function SnippetDetailPage() {
  const { id }  = useParams()
  const router  = useRouter()

  const { theme, fontSize, setTheme } = useEditorStore()
  const { status, setRunning, setResult } = useExecutionStore()

  const [snippet, setSnippet]       = useState(null)
  const [loading, setLoading]       = useState(true)
  const [code, setCode]             = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSaving, setIsSaving]     = useState(false)
  const [copied, setCopied]         = useState(false)
  const [showShare, setShowShare] = useState(false)

  const currentLanguage = LANGUAGES.find(l => l.id === snippet?.language) ?? LANGUAGES[0]
  const currentTheme    = EDITOR_THEMES.find(t => t.id === theme) ?? EDITOR_THEMES[0]

  useEffect(() => {
    fetchSnippet()
  }, [id])

  async function fetchSnippet() {
    try {
      setLoading(true)
      const res  = await fetch(`/api/snippets/${id}`)
      const data = await res.json()
      if (data.success) {
        setSnippet(data.data)
        setCode(data.data.code)
        setIsFavorite(data.data.isFavorite)
      }
    } catch (err) {
      console.error('Failed to fetch snippet:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleRun() {
    setRunning()
    try {
      const res  = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: snippet.language, code, stdin: '' }),
      })
      const data = await res.json()
      if (data.success) {
        setResult({
          output: data.data.stdout || data.data.output || '',
          error:  data.data.stderr || null,
          time:   data.data.time,
          memory: data.data.memory,
        })
      }
    } catch (err) {
      console.error('Run failed:', err)
    }
  }

 async function handleSave() {
  setIsSaving(true)
  try {
    await fetch(`/api/snippets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    toast.success('Snippet saved!')
  } catch (err) {
    toast.error('Failed to save snippet')
  } finally {
    setIsSaving(false)
  }
}

  async function handleFavorite() {
    try {
      const res  = await fetch(`/api/snippets/${id}/favorite`, { method: 'POST' })
      const data = await res.json()
      if (data.success) setIsFavorite(data.data.isFavorite)
    } catch (err) {
      console.error('Favorite failed:', err)
    }
  }

  async function handleCopy() {
  await navigator.clipboard.writeText(code)
  setCopied(true)
  toast.success('Code copied to clipboard!')
  setTimeout(() => setCopied(false), 2000)
}

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!snippet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Snippet not found</p>
          <Link href="/snippets">
            <Button variant="outline" size="sm">Back to Snippets</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border bg-card shrink-0">
        <Link href="/snippets">
          <Button variant="ghost" size="icon" className="w-7 h-7">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate">{snippet.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs px-1.5 py-0.5 rounded font-mono bg-yellow-400/10 text-yellow-400">
              {snippet.language}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(snippet.updatedAt)}</span>
          </div>
        </div>

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs shrink-0">
              {currentTheme.label}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {EDITOR_THEMES.map(t => (
              <DropdownMenuItem key={t.id} onClick={() => setTheme(t.id)} className="text-xs">
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Copy */}
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 shrink-0" onClick={handleCopy}>
          {copied
            ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</>
            : <><Copy className="w-3 h-3" /> Copy</>
          }
        </Button>

        {/* Favorite */}
        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={handleFavorite}>
          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
        </Button>

        {/* Share */}
        <Button
  variant="outline"
  size="icon"
  className="h-8 w-8 shrink-0"
  onClick={() => setShowShare(true)}
>
  <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
</Button>

{/* Add ShareModal before closing div */}
<ShareModal
  snippetId={id}
  isOpen={showShare}
  onClose={() => setShowShare(false)}
/>

        {/* Save */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5 shrink-0"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving
            ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
            : <><Save className="w-3 h-3" /> Save</>
          }
        </Button>

        {/* Run */}
        <Button
          size="sm"
          className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
          onClick={handleRun}
          disabled={status === 'running'}
        >
          {status === 'running'
            ? <><Loader2 className="w-3 h-3 animate-spin" /> Running...</>
            : <><Play className="w-3 h-3" /> Run</>
          }
        </Button>
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <MonacoEditor
            height="100%"
            language={currentLanguage.monacoId}
            theme={theme}
            value={code}
            onChange={(val) => setCode(val ?? '')}
            options={{
              fontSize,
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
        <div className="w-[380px] shrink-0 border-l border-border hidden md:flex flex-col">
          <OutputPanel />
        </div>
      </div>

    </div>
  )
}