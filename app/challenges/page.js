'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockChallenges } from '@/lib/mock/challenges'
import { DIFFICULTY_CONFIG } from '@/config/constants'
import { Trophy, Search, Filter, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import TopNav from '@/components/layout/TopNav'
import PageWrapper from '@/components/ui/PageWrapper'

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard']

export default function ChallengesPage() {
  const [search, setSearch]       = useState('')
  const [difficulty, setDifficulty] = useState('all')
  const [solved] = useState(['ch_01'])

  const filtered = mockChallenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.includes(search.toLowerCase()))
    const matchesDiff = difficulty === 'all' || c.difficulty === difficulty
    return matchesSearch && matchesDiff
  })

  return (
    <div className="flex flex-col min-h-full">
      <TopNav title="Challenges" />

      <PageWrapper className="flex-1 p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Coding Challenges</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {mockChallenges.length} problems · Practice and improve your skills
            </p>
          </div>

          {/* Difficulty stats */}
          <div className="flex items-center gap-3">
            {['easy', 'medium', 'hard'].map(d => {
              const count = mockChallenges.filter(c => c.difficulty === d).length
              const diff  = DIFFICULTY_CONFIG[d]
              return (
                <div key={d} className={`px-3 py-1.5 rounded-lg ${diff.bg} text-center`}>
                  <div className={`text-sm font-bold ${diff.color}`}>{count}</div>
                  <div className="text-xs text-muted-foreground">{diff.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              {solved.length}/{mockChallenges.length} solved
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(solved.length / mockChallenges.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {Math.round((solved.length / mockChallenges.length) * 100)}% complete
            </span>
            <span className="text-xs text-muted-foreground">
              {mockChallenges.length - solved.length} remaining
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search problems or tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  difficulty === d
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Problems table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium w-8"></th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium w-12">#</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Title</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium hidden sm:table-cell">Tags</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Difficulty</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium hidden md:table-cell">Acceptance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-sm">
                    No problems found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((challenge, index) => {
                  const diff      = DIFFICULTY_CONFIG[challenge.difficulty]
                  const isSolved  = solved.includes(challenge.id)
                  return (
                    <tr
                      key={challenge.id}
                      className="hover:bg-accent/50 transition-colors group"
                    >
                      {/* Solved indicator */}
                      <td className="px-4 py-3">
                        {isSolved ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-border" />
                        )}
                      </td>

                      {/* Number */}
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {index + 1}
                      </td>

                      {/* Title */}
                      <td className="px-4 py-3">
                        <Link
                          href={`/challenges/${challenge.id}`}
                          className={`text-sm font-medium hover:text-primary transition-colors group-hover:underline underline-offset-4 ${
                            isSolved ? 'text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {challenge.title}
                        </Link>
                      </td>

                      {/* Tags */}
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {challenge.tags.slice(0, 2).map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs px-1.5 py-0 h-5"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>

                      {/* Difficulty */}
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diff.bg} ${diff.color}`}>
                          {diff.label}
                        </span>
                      </td>

                      {/* Acceptance */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${challenge.acceptanceRate}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {challenge.acceptanceRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

      </PageWrapper>
    </div>
  )
}