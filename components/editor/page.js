'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Play, RotateCcw, Save, ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/store/editorStore'
import { useExecutionStore } from '@/store/executionStore'
import { LANGUAGES, DEFAULT_CODE } from '@/config/languages'
import { EDITOR_THEMES, FONT_SIZES } from '@/config/themes'
import OutputPanel from '@/components/editor/OutputPanel'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { 
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-zinc-950">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading editor...</span>
      </div>
    </div>
  )
})

export default function EditorPage() {
  const {
    language, theme, fontSize, code,
    setLanguage, setTheme, setFontSize, setCode, resetCode,
    stdin, setStdin,
  } = useEditorStore()

  const { status, output, error, time, memory, setRunning, setResult, setError } = useExecutionStore()

  const [showInput, setShowInput] = useState(false)

  const currentLanguage = LANGUAGES.find(l => l.id === language) ?? LANGUAGES[0]
  const currentTheme    = EDITOR_THEMES.find(t => t.id === theme) ?? EDITOR_THEMES[0]

  const handleRun = useCallback(async () => {
    setRunning()
    // Mock execution — replace with real Judge0 API later
    await new Promise(r => setTimeout(r, 1200))
    // Simulate output based on language
    const mockOutputs = {
      javascript: 'Hello, World!\n',
      python:     'Hello, World!\n',
      java:       'Hello, World!\n',
      cpp:        'Hello, World!\n',
      c:          'Hello, World!\n',
    }
    setResult({
      output: mockOutputs[language] ?? 'Hello, World!\n',
      error:  null,
      time:   '0.045',
      memory: '9.2',
    })
  }, [language, setRunning, setResult])

  // Ctrl+Enter to run
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleRun()
    }
  }, [handleRun])

  return (
    <div
      className="flex flex-col h-screen bg-background overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border bg-card shrink-0 overflow-x-auto">

        {/* Language selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs shrink-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: currentLanguage.color }}
              />
              {currentLanguage.label}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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

        {/* Theme selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs shrink-0">
              {currentTheme.label}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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

        {/* Font size selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs shrink-0">
              {fontSize}px
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {FONT_SIZES.map(size => (
              <DropdownMenuItem
                key={size}
                onClick={() => setFontSize(size)}
                className="text-xs"
              >
                {size}px
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1" />

        {/* Reset */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs gap-1.5 text-muted-foreground shrink-0"
          onClick={resetCode}
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </Button>

        {/* Save */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5 shrink-0"
        >
          <Save className="w-3 h-3" />
          Save
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

        {/* Left — Editor */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <MonacoEditor
            height="100%"
            language={currentLanguage.monacoId}
            theme={theme}
            value={code}
            onChange={(val) => setCode(val ?? '')}
            options={{
              fontSize,
              fontFamily: 'var(--font-geist-mono), "JetBrains Mono", monospace',
              minimap:          { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers:      'on',
              renderLineHighlight: 'line',
              tabSize:          2,
              wordWrap:         'on',
              automaticLayout:  true,
              padding:          { top: 16 },
              smoothScrolling:  true,
              cursorBlinking:   'smooth',
              bracketPairColorization: { enabled: true },
            }}
          />

          {/* Stdin toggle */}
          <div className="border-t border-border bg-card shrink-0">
            <button
              onClick={() => setShowInput(s => !s)}
              className="w-full flex items-center justify-between px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Standard Input (stdin)</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showInput ? 'rotate-180' : ''}`} />
            </button>
            {showInput && (
              <textarea
                value={stdin}
                onChange={e => setStdin(e.target.value)}
                placeholder="Enter input for your program..."
                className="w-full h-24 px-4 py-2 bg-zinc-950 text-sm font-mono text-foreground placeholder:text-muted-foreground resize-none border-t border-border focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* Right — Output */}
        <div className="w-[380px] shrink-0 border-l border-border hidden md:flex flex-col">
          <OutputPanel />
        </div>

      </div>

      {/* Mobile output — below editor */}
      <div className="md:hidden border-t border-border">
        <OutputPanel />
      </div>

    </div>
  )
}