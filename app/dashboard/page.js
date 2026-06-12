'use client'

import { useState, useEffect } from 'react'
import TopNav from '@/components/layout/TopNav'
import { STATUS_CONFIG, DIFFICULTY_CONFIG } from '@/config/constants'
import { Code2, Play, Trophy, Star, Clock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { mockChallenges } from '@/lib/mock/challenges'
import PageWrapper from '@/components/ui/PageWrapper'
import { cachedFetch } from '@/lib/apiCache'
import { SkeletonStat, SkeletonRow } from '@/components/ui/SkeletonCard'

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

export default function DashboardPage() {
  const [snippets, setSnippets]     = useState([])
  const [user, setUser]             = useState(null)
  const [loading, setLoading]       = useState(true)

  const recentChallenges = mockChallenges.slice(0, 3)

  useEffect(() => {
    fetchData()
    window.addEventListener('focus', fetchData)
  return () => window.removeEventListener('focus', fetchData)
  }, [])

  async function fetchData() {
  try {
    const [snippetsData, userData] = await Promise.all([
      cachedFetch('/api/snippets', {}, 30000),
      cachedFetch('/api/users/me', {}, 60000),
    ])
    if (snippetsData.success) setSnippets(snippetsData.data)
    if (userData.success)     setUser(userData.data)
  } catch (err) {
    console.error('Failed to fetch data:', err)
  } finally {
    setLoading(false)
  }
}

  const recentSnippets   = snippets.slice(0, 3)
  const favoriteCount    = snippets.filter(s => s.isFavorite).length

  const STATS = [
    { label: 'Snippets',          value: snippets.length, icon: Code2,   color: 'text-blue-400',    bg: 'bg-blue-400/10'    },
    { label: 'Executions',        value: 0,               icon: Play,    color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Challenges Solved', value: 0,               icon: Trophy,  color: 'text-yellow-400',  bg: 'bg-yellow-400/10'  },
    { label: 'Favorites',         value: favoriteCount,   icon: Star,    color: 'text-purple-400',  bg: 'bg-purple-400/10'  },
  ]

 if (loading) {
  return (
    <div className="flex flex-col min-h-full">
      <TopNav title="Dashboard" />
      <div className="flex-1 p-6 space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <SkeletonStat key={i} />)}
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {[1,2,3].map(i => <SkeletonRow key={i} />)}
        </div>
      </div>
    </div>
  )
}

  return (
    <div className="flex flex-col min-h-full">
      <TopNav title="Dashboard" />
 <PageWrapper className="flex-1 p-6 space-y-6">
      <div className="flex-1 p-6 space-y-6">

        {/* Welcome */}
        <div>
         <h2 className="text-xl font-bold">
  Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here's what's happening with your code today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Snippets */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Recent Snippets</h3>
              <Link href="/snippets" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentSnippets.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No snippets yet.{' '}
                  <Link href="/snippets/new" className="text-primary hover:underline">
                    Create one
                  </Link>
                </div>
              ) : (
                recentSnippets.map((snippet) => (
                  <Link
                    key={snippet._id}
                    href={`/snippets/${snippet._id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium truncate">{snippet.title}</span>
                        {snippet.isFavorite && <Star className="w-3 h-3 text-yellow-400 shrink-0 fill-yellow-400" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${getLanguageColor(snippet.language)}`}>
                          {snippet.language}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatDate(snippet.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                      <Play className="w-3 h-3" />
                      {snippet.executionCount}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">Quick Actions</h3>
              </div>
              <div className="p-3 space-y-2">
                <Link
                  href="/editor"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Open Editor</span>
                </Link>
                <Link
                  href="/snippets/new"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">New Snippet</span>
                </Link>
                <Link
                  href="/challenges"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <Trophy className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Practice Challenges</span>
                </Link>
              </div>
            </div>

            {/* Recent Challenges */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">Challenges</h3>
                <Link href="/challenges" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  View all →
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentChallenges.map((challenge) => {
                  const diff = DIFFICULTY_CONFIG[challenge.difficulty]
                  return (
                    <Link
                      key={challenge.id}
                      href={`/challenges/${challenge.id}`}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-sm truncate mr-2">{challenge.title}</span>
                      <span className={`text-xs shrink-0 ${diff.color}`}>{diff.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
      </PageWrapper>
    </div>
  )
}