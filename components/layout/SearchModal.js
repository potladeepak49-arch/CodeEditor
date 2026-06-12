'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, FileCode, Trophy, Code2, X } from 'lucide-react'
import { mockChallenges } from '@/lib/mock/challenges'

export default function SearchModal() {
  const [open, setOpen]       = useState(false)
  const [query, setQuery]     = useState('')
  const [snippets, setSnippets] = useState([])
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
  if (open && snippets.length === 0) {
    fetch('/api/snippets')
      .then(r => r.json())
      .then(d => { if (d.success) setSnippets(d.data) })
      .catch(() => {})
  }
}, [open])

  const filteredSnippets = snippets.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4)

  const filteredChallenges = mockChallenges.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3)

  function handleNavigate(href) {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden">

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search snippets, challenges..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">Esc</kbd>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">

          {/* Quick links — shown when no query */}
          {!query && (
            <div className="px-3 pb-2">
              <p className="text-xs text-muted-foreground px-2 py-1.5 font-medium">Quick Links</p>
              {[
                { label: 'Editor',     href: '/editor',     icon: Code2    },
                { label: 'Snippets',   href: '/snippets',   icon: FileCode },
                { label: 'Challenges', href: '/challenges', icon: Trophy   },
              ].map(item => (
                <button
                  key={item.href}
                  onClick={() => handleNavigate(item.href)}
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Snippets results */}
          {filteredSnippets.length > 0 && (
            <div className="px-3 pb-2">
              <p className="text-xs text-muted-foreground px-2 py-1.5 font-medium">Snippets</p>
              {filteredSnippets.map(snippet => (
                <button
                  key={snippet._id}
                  onClick={() => handleNavigate(`/snippets/${snippet._id}`)}
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                  <FileCode className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-left truncate">{snippet.title}</span>
                  <span className="text-xs text-muted-foreground font-mono">{snippet.language}</span>
                </button>
              ))}
            </div>
          )}

          {/* Challenges results */}
          {filteredChallenges.length > 0 && (
            <div className="px-3 pb-2">
              <p className="text-xs text-muted-foreground px-2 py-1.5 font-medium">Challenges</p>
              {filteredChallenges.map(challenge => (
                <button
                  key={challenge.id}
                  onClick={() => handleNavigate(`/challenges/${challenge.id}`)}
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                  <Trophy className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-left truncate">{challenge.title}</span>
                  <span className="text-xs text-muted-foreground">{challenge.difficulty}</span>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {query && filteredSnippets.length === 0 && filteredChallenges.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for <span className="text-foreground">"{query}"</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-4 py-2 border-t border-border bg-muted/30">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑↓</kbd>
            navigate
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd>
            open
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Ctrl K</kbd>
            toggle
          </div>
        </div>
      </div>
    </div>
  )
}