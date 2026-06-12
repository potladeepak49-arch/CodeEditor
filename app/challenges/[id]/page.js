'use client'

import { useState, useCallback, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { mockChallenges } from '@/lib/mock/challenges'
import { DIFFICULTY_CONFIG } from '@/config/constants'
import { LANGUAGES } from '@/config/languages'
import { EDITOR_THEMES } from '@/config/themes'
import { useEditorStore } from '@/store/editorStore'
import { useExecutionStore } from '@/store/executionStore'
import OutputPanel from '@/components/editor/OutputPanel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Play, ChevronDown, Loader2, ArrowLeft,
  CheckCircle2, XCircle, Clock, RotateCcw,
  BookmarkPlus, Send
} from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-zinc-950">
      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
    </div>
  )
})

export default function ChallengePage() {
  const { id }      = useParams()
  const challenge   = mockChallenges.find(c => c.id === id)

  const { language, theme, fontSize, code, setLanguage, setTheme, setCode, resetCode } = useEditorStore()
  const { status, setRunning, setResult, setError } = useExecutionStore()

  const [activeTab, setActiveTab]             = useState('description')
  const [isSubmitting, setIsSubmitting]       = useState(false)
  const [isSavingSnippet, setIsSavingSnippet] = useState(false)
  const [submissions, setSubmissions]         = useState([])
  const [solved, setSolved]                   = useState(false)

  const currentLanguage = LANGUAGES.find(l => l.id === language) ?? LANGUAGES[0]
  const currentTheme    = EDITOR_THEMES.find(t => t.id === theme) ?? EDITOR_THEMES[0]

  // Set starter code when challenge or language changes
  useEffect(() => {
    if (challenge?.starterCode?.[language]) {
      setCode(challenge.starterCode[language])
    }
  }, [challenge?.id, language])

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang)
    if (challenge?.starterCode?.[lang]) {
      setCode(challenge.starterCode[lang])
    }
  }, [challenge, setLanguage, setCode])

  // Run code
  const handleRun = useCallback(async () => {
    setRunning()
    try {
      const res  = await fetch('/api/execute', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ language, code, stdin: '' }),
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
      setError('Failed to connect to execution server')
    }
  }, [language, code, setRunning, setResult, setError])

  // Submit solution
  const handleSubmit = useCallback(async () => {
    const starterCode    = challenge?.starterCode?.[language] ?? ''
    const trimmedCode    = code.trim()
    const trimmedStarter = starterCode.trim()

    if (!trimmedCode) {
      toast.error('Please write some code before submitting')
      return
    }

    if (trimmedCode === trimmedStarter) {
      toast.error('Please write your solution — starter code is not a valid submission')
      return
    }

    const codeLines    = trimmedCode.split('\n').filter(l => l.trim() && !l.trim().startsWith('//'))
    const starterLines = trimmedStarter.split('\n').filter(l => l.trim() && !l.trim().startsWith('//'))

    if (codeLines.length <= starterLines.length) {
      toast.error('Your solution appears incomplete — add your logic inside the function')
      return
    }

    setIsSubmitting(true)
    setRunning()

    try {
      const res  = await fetch('/api/execute', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          language,
          code,
          stdin:       '',
          challengeId: id,
          isSubmit:    true,
        }),
      })
      const data = await res.json()

      if (!data.success) {
        setError('Execution failed')
        setIsSubmitting(false)
        return
      }

      const isAccepted   = data.data.status === 'Accepted'
      const notSupported = data.data.notSupported
      const passedTests  = data.data.passedTests ?? 0
      const totalTests   = data.data.totalTests  ?? 0
      const status       = isAccepted ? 'accepted' : 'wrong_answer'

      // Save to DB only for JS with real results
      if (!notSupported && totalTests > 0) {
        await fetch('/api/submissions', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            challengeId:     id,
            language,
            code,
            status,
            passedTestCases: passedTests,
            totalTestCases:  totalTests,
            executionTime:   parseFloat(data.data.time) * 1000,
            memoryUsed:      parseFloat(data.data.memory) * 1000,
          }),
        })
      }

      const newSub = {
        id:      Date.now(),
        status:  notSupported
          ? 'Not Supported'
          : isAccepted ? 'Accepted' : 'Wrong Answer',
        language,
        time:    data.data.time + 's',
        date:    'Just now',
        passed:  passedTests,
        total:   totalTests,
      }
      setSubmissions(prev => [newSub, ...prev])

      setResult({
        output: isAccepted ? data.data.output : '',
        error:  (!isAccepted || notSupported)
          ? (data.data.stderr || data.data.output)
          : null,
        time:   data.data.time,
        memory: data.data.memory,
      })

      if (notSupported) {
        toast.warning(`⚠️ ${language} auto-grading not available — switch to JavaScript`)
      } else if (isAccepted) {
        setSolved(true)
        setActiveTab('submissions')
        toast.success(`🎉 Accepted! ${passedTests}/${totalTests} test cases passed!`)
      } else {
        toast.error(`Wrong Answer — ${passedTests}/${totalTests} test cases passed`)
      }

    } catch (err) {
      setError('Submission failed')
      toast.error('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [language, code, id, challenge, setRunning, setResult, setError])

  // Save as snippet
  const handleSaveSnippet = useCallback(async () => {
    if (!code.trim()) {
      toast.error('Nothing to save')
      return
    }
    setIsSavingSnippet(true)
    try {
      const res  = await fetch('/api/snippets', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          title:       `${challenge?.title} — ${language}`,
          description: `Solution to ${challenge?.title}`,
          language,
          code,
          tags:        challenge?.tags?.join(',') ?? '',
          isPublic:    false,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Saved to snippets!')
      } else {
        toast.error('Failed to save snippet')
      }
    } catch (err) {
      toast.error('Failed to save snippet')
    } finally {
      setIsSavingSnippet(false)
    }
  }, [code, language, challenge])

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Challenge not found</p>
          <Link href="/challenges">
            <Button variant="outline" size="sm">Back to Challenges</Button>
          </Link>
        </div>
      </div>
    )
  }

  const diff = DIFFICULTY_CONFIG[challenge.difficulty]

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* Left — Problem Statement */}
      <div className="w-[420px] shrink-0 flex flex-col border-r border-border overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border bg-card shrink-0">
          <Link href="/challenges">
            <Button variant="ghost" size="icon" className="w-7 h-7">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold truncate">{challenge.title}</h1>
              {solved && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            </div>
          </div>
          <span className={`text-xs font-medium shrink-0 px-2 py-0.5 rounded-full ${diff.bg} ${diff.color}`}>
            {diff.label}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-card shrink-0">
          {['description', 'submissions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-medium capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {tab === 'submissions' && submissions.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-muted text-xs">
                  {submissions.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'description' ? (
            <>
              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {challenge.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-foreground leading-relaxed">
                {challenge.description}
              </p>

              {/* Examples */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Examples</h3>
                {challenge.examples.map((ex, i) => (
                  <div key={i} className="rounded-lg bg-muted/50 border border-border p-3 space-y-2">
                    <div>
                      <span className="text-xs text-muted-foreground font-medium">Input: </span>
                      <code className="text-xs font-mono text-foreground">{ex.input}</code>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-medium">Output: </span>
                      <code className="text-xs font-mono text-foreground">{ex.output}</code>
                    </div>
                    {ex.explanation && (
                      <div>
                        <span className="text-xs text-muted-foreground font-medium">Explanation: </span>
                        <span className="text-xs text-muted-foreground">{ex.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Note about JS validation */}
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
                <p className="text-xs text-blue-400">
                  💡 For real test case validation, use <strong>JavaScript</strong>. Other languages show output only.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-2 border-t border-border">
                <div className="text-center">
                  <div className="text-sm font-semibold">{challenge.acceptanceRate}%</div>
                  <div className="text-xs text-muted-foreground">Acceptance</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-semibold ${diff.color}`}>{diff.label}</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">{submissions.length}</div>
                  <div className="text-xs text-muted-foreground">My Submissions</div>
                </div>
              </div>
            </>
          ) : (
            /* Submissions tab */
            <div className="space-y-2">
              {submissions.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No submissions yet. Write your solution and click Submit.
                </div>
              ) : (
                submissions.map(sub => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-lg border border-border bg-card space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {sub.status === 'Accepted'
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          : sub.status === 'Not Supported'
                            ? <span className="text-yellow-400 text-xs">⚠️</span>
                            : <XCircle className="w-4 h-4 text-red-400" />
                        }
                        <span className={`text-xs font-medium ${
                          sub.status === 'Accepted'
                            ? 'text-emerald-400'
                            : sub.status === 'Not Supported'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-mono">{sub.language}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {sub.time}
                        </div>
                        <span>{sub.date}</span>
                      </div>
                    </div>
                    {sub.total > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${sub.status === 'Accepted' ? 'bg-emerald-500' : 'bg-red-500'}`}
                            style={{ width: `${(sub.passed / sub.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {sub.passed}/{sub.total} passed
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right — Editor + Output */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Editor toolbar */}
        <div className="flex items-center gap-2 px-4 h-14 border-b border-border bg-card shrink-0 overflow-x-auto">

          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs shrink-0">
                <span className="w-2 h-2 rounded-full" style={{ background: currentLanguage.color }} />
                {currentLanguage.label}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {LANGUAGES.filter(l => challenge.starterCode?.[l.id]).map(lang => (
                <DropdownMenuItem
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
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

          <div className="flex-1" />

          {/* Reset */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1.5 text-muted-foreground shrink-0"
            onClick={() => {
              if (challenge.starterCode?.[language]) {
                setCode(challenge.starterCode[language])
              } else {
                resetCode()
              }
            }}
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>

          {/* Save as Snippet */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5 shrink-0"
            onClick={handleSaveSnippet}
            disabled={isSavingSnippet}
          >
            {isSavingSnippet
              ? <Loader2 className="w-3 h-3 animate-spin" />
              : <BookmarkPlus className="w-3 h-3" />
            }
            Save Snippet
          </Button>

          {/* Run */}
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
            onClick={handleRun}
            disabled={status === 'running' || isSubmitting}
          >
            {status === 'running' && !isSubmitting
              ? <><Loader2 className="w-3 h-3 animate-spin" /> Running...</>
              : <><Play className="w-3 h-3" /> Run</>
            }
          </Button>

          {/* Submit */}
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5 shrink-0"
            onClick={handleSubmit}
            disabled={status === 'running' || isSubmitting}
          >
            {isSubmitting
              ? <><Loader2 className="w-3 h-3 animate-spin" /> Submitting...</>
              : <><Send className="w-3 h-3" /> Submit</>
            }
          </Button>

        </div>

        {/* Monaco + Output */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <MonacoEditor
              height="100%"
              language={currentLanguage.monacoId}
              theme={theme}
              value={code}
              onChange={(val) => setCode(val ?? '')}
              options={{
                fontSize,
                fontFamily:           '"JetBrains Mono", monospace',
                minimap:              { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers:          'on',
                renderLineHighlight:  'line',
                tabSize:              2,
                wordWrap:             'on',
                automaticLayout:      true,
                padding:              { top: 16 },
                smoothScrolling:      true,
                cursorBlinking:       'smooth',
              }}
            />
          </div>

          {/* Output panel */}
          <div className="h-[200px] shrink-0 border-t border-border">
            <OutputPanel />
          </div>

        </div>
      </div>
    </div>
  )
}