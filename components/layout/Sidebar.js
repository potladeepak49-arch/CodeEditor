'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cachedFetch } from '@/lib/apiCache'
import {
  LayoutDashboard,
  Code2,
  FileCode,
  Trophy,
  User,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const NAV_ITEMS = [
  { href: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard'  },
  { href: '/editor',     icon: Code2,           label: 'Editor'     },
  { href: '/snippets',   icon: FileCode,        label: 'Snippets'   },
  { href: '/challenges', icon: Trophy,          label: 'Challenges' },
  { href: '/profile',    icon: User,            label: 'Profile'    },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname  = usePathname()
  const router    = useRouter()

  async function handleLogout() {
    const { signOut } = await import('next-auth/react')
    await signOut({ redirect: false })
    localStorage.removeItem('codeEditor_user')
    router.push('/')
  }
function prefetchRoute(href) {
  if (href === '/dashboard') {
    cachedFetch('/api/snippets', {}, 30000).catch(() => {})
    cachedFetch('/api/users/me', {}, 60000).catch(() => {})
  }
  if (href === '/snippets') {
    cachedFetch('/api/snippets', {}, 30000).catch(() => {})
  }
}
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'relative flex flex-col h-full bg-card border-r border-border transition-all duration-300 ease-in-out',
          collapsed ? 'w-[52px]' : 'w-[240px]'
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-14 border-b border-border px-3 gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <Terminal className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm tracking-tight whitespace-nowrap">
              CodeEditor
            </span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground',
                  collapsed && 'justify-center px-2'
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }

            return <div key={item.href}>{linkContent}</div>
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-2 py-3 space-y-0.5 border-t border-border">
          {collapsed ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/settings"
                    className={cn(
                      'w-full flex items-center justify-center px-2 py-2 rounded-md transition-colors',
                      pathname === '/settings'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-2 py-2 rounded-md text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Log out</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <>
              <Link
                href="/settings"
                className={cn(
                  'w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors',
                  pathname === '/settings'
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Log out</span>
              </button>
            </>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors z-10"
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3" />
            : <ChevronLeft className="w-3 h-3" />
          }
        </button>
      </aside>
    </TooltipProvider>
  )
}