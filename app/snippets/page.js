'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import TopNav from '@/components/layout/TopNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import ShareModal from '@/components/snippets/ShareModal'
import { toast } from 'sonner'
import { invalidateCache } from '@/lib/apiCache'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import {
  Search, Plus, Star, Share2, Trash2,
  Play, FileCode, Filter, Loader2
} from 'lucide-react'

const LANGUAGES = ['all', 'javascript', 'python', 'java', 'cpp', 'c']

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

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months[date.getUTCMonth()] + ' ' + date.getUTCDate()
}

function SnippetCard({ snippet, onFavorite, onDelete }) {
  const [showShare, setShowShare] = useState(false)

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-border/60 transition-colors group">

      <div className="flex items-start justify-between p-4 pb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/snippets/${snippet._id}`}
              className="text-sm font-semibold hover:text-primary transition-colors truncate"
            >
              {snippet.title}
            </Link>
            {snippet.isFavorite && (
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
            )}
          </div>
          {snippet.description && (
            <p className="text-xs text-muted-foreground truncate">{snippet.description}</p>
          )}
        </div>
      </div>

      <div className="mx-4 mb-3 rounded-lg bg-zinc-950 border border-border overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-zinc-900">
          <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${getLanguageColor(snippet.language)}`}>
            {snippet.language}
          </span>
        </div>
        <pre className="px-3 py-2.5 text-xs font-mono text-zinc-300 overflow-hidden max-h-20 leading-relaxed">
          {snippet.code.split('\n').slice(0, 4).join('\n')}
        </pre>
      </div>

      {snippet.tags.length > 0 && (
        <div className="flex items-center gap-1.5 px-4 mb-3 flex-wrap">
          {snippet.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Play className="w-3 h-3" />
            {snippet.executionCount} runs
          </div>
          <span>{formatDate(snippet.createdAt)}</span>
          {snippet.isPublic && <span className="text-emerald-400">Public</span>}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onFavorite(snippet._id)}
            className="p-1.5 rounded-md hover:bg-accent transition-colors"
            title="Toggle favorite"
          >
            <Star className={`w-3.5 h-3.5 ${snippet.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-accent transition-colors"
            title="Share snippet"
            onClick={() => setShowShare(true)}
          >
            <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button
            onClick={() => onDelete(snippet._id)}
            className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors"
            title="Delete snippet"
          >
            <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-red-400" />
          </button>
        </div>
      </div>

      <ShareModal
        snippetId={snippet._id}
        isOpen={showShare}
        onClose={() => setShowShare(false)}
      />

    </div>
  )
}

export default function SnippetsPage() {
  const [snippets, setSnippets]           = useState([])
  const [loading, setLoading]             = useState(true)
  const [search, setSearch]               = useState('')
  const [language, setLanguage]           = useState('all')
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    fetchSnippets()
  }, [])

  async function fetchSnippets() {
    try {
      setLoading(true)
      const res  = await fetch('/api/snippets')
      const data = await res.json()
      if (data.success) setSnippets(data.data)
    } catch (err) {
      console.error('Failed to fetch snippets:', err)
    } finally {
      setLoading(false)
    }
  }

 async function handleFavorite(id) {
  try {
    const res  = await fetch(`/api/snippets/${id}/favorite`, { method: 'POST' })
    const data = await res.json()
    if (data.success) {
      setSnippets(prev =>
        prev.map(s => s._id === id ? { ...s, isFavorite: !s.isFavorite } : s)
      )
      toast.success(data.data.isFavorite ? 'Added to favorites' : 'Removed from favorites')
    }
  } catch (err) {
    toast.error('Failed to update favorite')
  }
}

  async function handleDelete(id) {
  if (!confirm('Delete this snippet?')) return
  try {
    const res = await fetch(`/api/snippets/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setSnippets(prev => prev.filter(s => s._id !== id))
      invalidateCache('/api/snippets')
      toast.success('Snippet deleted')
    }
  } catch (err) {
    toast.error('Failed to delete snippet')
  }
}

  const filtered = snippets.filter(s => {
    const matchesSearch   = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.includes(search.toLowerCase()))
    const matchesLanguage = language === 'all' || s.language === language
    const matchesFavorite = !showFavorites || s.isFavorite
    return matchesSearch && matchesLanguage && matchesFavorite
  })

  return (
    <div className="flex flex-col min-h-full">
      <TopNav title="Snippets" />

      <div className="flex-1 p-6 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">My Snippets</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {snippets.length} snippets saved
            </p>
          </div>
          <Link href="/snippets/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" />
              New Snippet
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search snippets or tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  language === lang
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang}
              </button>
            ))}
            <button
              onClick={() => setShowFavorites(f => !f)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                showFavorites
                  ? 'bg-yellow-400/10 text-yellow-400'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Star className="w-3 h-3" />
              Favorites
            </button>
          </div>
        </div>

        {loading ? (
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
    {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
  </div>
) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileCode className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">
              {snippets.length === 0 ? 'No snippets yet' : 'No snippets match your search'}
            </p>
            <Link href="/snippets/new" className="mt-3">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Create your first snippet
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(snippet => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}