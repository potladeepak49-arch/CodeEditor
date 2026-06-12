'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Terminal, Copy, Check, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { LANGUAGES } from '@/config/languages'
import { Loader2 } from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-zinc-950">
      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
    </div>
  )
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear()
}

function getLanguageColor(lang) {
  const colors = {
    javascript: 'bg-yellow-400/10 text-yellow-400',
    python:     'bg-blue-400/10 text-blue-400',
    java:       'bg-orange-400/10 text-orange-400',
    cpp:        'bg-cyan-400/10 text-cyan-400',
    c:          'bg-gray-400/10 text-gray-400',
  }
  return colors[lang] ?? 'bg-zinc-400/10 text-zinc-400'
}

export default function PublicSnippetView({ snippet }) {
  const [copied, setCopied] = useState(false)

  const currentLanguage = LANGUAGES.find(l => l.id === snippet.language) ?? LANGUAGES[0]

  async function handleCopy() {
    await navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Navbar */}
      <nav className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Terminal className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">CodeEditor</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-8 text-xs"
            onClick={handleCopy}
          >
            {copied
              ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</>
              : <><Copy className="w-3 h-3" /> Copy Code</>
            }
          </Button>
          <Link href="/register">
            <Button size="sm" className="h-8 text-xs gap-1.5">
              <ExternalLink className="w-3 h-3" />
              Try CodeEditor
            </Button>
          </Link>
        </div>
      </nav>

      {/* Snippet info */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold">{snippet.title}</h1>
              {snippet.description && (
                <p className="text-sm text-muted-foreground mt-0.5">{snippet.description}</p>
              )}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${getLanguageColor(snippet.language)}`}>
                  {snippet.language}
                </span>
                <span className="text-xs text-muted-foreground">
                  Shared on {formatDate(snippet.createdAt)}
                </span>
                {snippet.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor — read only */}
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <MonacoEditor
          height="calc(100vh - 180px)"
          language={currentLanguage.monacoId}
          theme="vs-dark"
          value={snippet.code}
          options={{
            readOnly:             true,
            fontSize:             14,
            fontFamily:           '"JetBrains Mono", monospace',
            minimap:              { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers:          'on',
            renderLineHighlight:  'line',
            wordWrap:             'on',
            automaticLayout:      true,
            padding:              { top: 16 },
            smoothScrolling:      true,
            domReadOnly:          true,
          }}
        />
      </div>

    </div>
  )
}