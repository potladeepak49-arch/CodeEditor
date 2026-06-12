'use client'

import { useState, useEffect } from 'react'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function TopNav({ title }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check cache first
    const cached = localStorage.getItem('codeEditor_user')
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached)
        // Use cache if less than 5 minutes old
        if (Date.now() - ts < 5 * 60 * 1000) {
          setUser(data)
          return
        }
      } catch {}
    }

    // Fetch fresh data
    fetch('/api/users/me')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setUser(data.data)
          localStorage.setItem('codeEditor_user', JSON.stringify({
            data: data.data,
            ts:   Date.now(),
          }))
        }
      })
      .catch(() => {})
  }, [])

  const initials = user
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?'

  function openSearch() {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { ctrlKey: true, key: 'k', bubbles: true })
    )
  }

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-2">

        {/* Search bar — desktop */}
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-2 h-8 text-xs text-muted-foreground w-48 justify-between"
          onClick={openSearch}
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Ctrl K</kbd>
        </Button>

        {/* Search icon — mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden w-8 h-8 text-muted-foreground"
          onClick={openSearch}
        >
          <Search className="w-4 h-4" />
        </Button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
          <Bell className="w-4 h-4" />
        </Button>

        <Avatar className="w-7 h-7 cursor-pointer">
          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

      </div>
    </header>
  )
}