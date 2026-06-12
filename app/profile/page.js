'use client'

import { useState, useEffect } from 'react'
import TopNav from '@/components/layout/TopNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LANGUAGES } from '@/config/languages'
import { EDITOR_THEMES } from '@/config/themes'
import PageWrapper from '@/components/ui/PageWrapper'
import {
  User, Code2, Play, Trophy, Star,
  Save, Loader2, Settings, ChevronDown
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const TABS = ['profile', 'preferences', 'stats']

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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving]   = useState(false)
  const [saved, setSaved]         = useState(false)
  const [user, setUser]           = useState(null)
  const [snippets, setSnippets]   = useState([])
  const [loading, setLoading]     = useState(true)

  const [form, setForm] = useState({
    name: '', username: '', email: '', bio: '',
  })

  const [prefs, setPrefs] = useState({
    theme: 'vs-dark', fontSize: 14, language: 'javascript', tabSize: 2,
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [userRes, snippetsRes] = await Promise.all([
        fetch('/api/users/me'),
        fetch('/api/snippets'),
      ])
      const userData     = await userRes.json()
      const snippetsData = await snippetsRes.json()

      if (userData.success) {
        const u = userData.data
        setUser(u)
        setForm({
          name:     u.name,
          username: u.username,
          email:    u.email,
          bio:      u.bio ?? '',
        })
        setPrefs({
          theme:    u.preferences?.theme    ?? 'vs-dark',
          fontSize: u.preferences?.fontSize ?? 14,
          language: u.preferences?.language ?? 'javascript',
          tabSize:  u.preferences?.tabSize  ?? 2,
        })
      }
      if (snippetsData.success) setSnippets(snippetsData.data)
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleFormChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleSave() {
    setIsSaving(true)
    try {
      await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        form.name,
          bio:         form.bio,
          preferences: prefs,
        }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const currentTheme    = EDITOR_THEMES.find(t => t.id === prefs.theme) ?? EDITOR_THEMES[0]
  const currentLanguage = LANGUAGES.find(l => l.id === prefs.language) ?? LANGUAGES[0]
  const favoriteCount   = snippets.filter(s => s.isFavorite).length

  const languageBreakdown = LANGUAGES.map(lang => ({
    ...lang,
    count: snippets.filter(s => s.language === lang.id).length,
  })).filter(l => l.count > 0).sort((a, b) => b.count - a.count)

  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <TopNav title="Profile" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <TopNav title="Profile" />
       <PageWrapper className="flex-1 p-6 space-y-6">

      <div className="flex-1 p-6 space-y-6 max-w-3xl mx-auto w-full">

        {/* Profile header card */}
        <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-primary-foreground">
              {user?.name.split(' ').map(n => n[0]).join('') ?? 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">@{user?.username}</p>
            {user?.bio && (
              <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-4 text-center shrink-0">
            <div>
              <div className="text-xl font-bold">{snippets.length}</div>
              <div className="text-xs text-muted-foreground">Snippets</div>
            </div>
            <div>
              <div className="text-xl font-bold">{user?.stats?.executionsCount ?? 0}</div>
              <div className="text-xs text-muted-foreground">Runs</div>
            </div>
            <div>
              <div className="text-xl font-bold">{user?.stats?.challengesSolved ?? 0}</div>
              <div className="text-xs text-muted-foreground">Solved</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Personal Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-xs">Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                  <Input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleFormChange}
                    className="h-9 text-sm pl-7"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                className="h-9 text-sm"
                disabled
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio" className="text-xs">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleFormChange}
                placeholder="Tell us about yourself..."
                className="w-full h-20 px-3 py-2 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground">{form.bio.length}/280 characters</p>
            </div>

            <div className="flex justify-end">
              <Button size="sm" onClick={handleSave} disabled={isSaving} className="gap-1.5">
                {isSaving
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                  : saved
                    ? '✓ Saved!'
                    : <><Save className="w-3.5 h-3.5" /> Save Changes</>
                }
              </Button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              Editor Preferences
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <Label className="text-xs">Default Language</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-9 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: currentLanguage.color }} />
                        {currentLanguage.label}
                      </div>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {LANGUAGES.map(lang => (
                      <DropdownMenuItem
                        key={lang.id}
                        onClick={() => setPrefs(p => ({ ...p, language: lang.id }))}
                        className="gap-2 text-sm"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: lang.color }} />
                        {lang.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Editor Theme</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-9 text-sm">
                      {currentTheme.label}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {EDITOR_THEMES.map(t => (
                      <DropdownMenuItem
                        key={t.id}
                        onClick={() => setPrefs(p => ({ ...p, theme: t.id }))}
                        className="text-sm"
                      >
                        {t.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Font Size: {prefs.fontSize}px</Label>
                <input
                  type="range"
                  min={12}
                  max={24}
                  value={prefs.fontSize}
                  onChange={e => setPrefs(p => ({ ...p, fontSize: Number(e.target.value) }))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>12px</span>
                  <span>24px</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Tab Size</Label>
                <div className="flex gap-2">
                  {[2, 4].map(size => (
                    <button
                      key={size}
                      onClick={() => setPrefs(p => ({ ...p, tabSize: size }))}
                      className={`flex-1 py-2 rounded-md text-sm font-medium border transition-colors ${
                        prefs.tabSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {size} spaces
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button size="sm" onClick={handleSave} disabled={isSaving} className="gap-1.5">
                {isSaving
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                  : saved
                    ? '✓ Saved!'
                    : <><Save className="w-3.5 h-3.5" /> Save Preferences</>
                }
              </Button>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-4">

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Snippets',   value: snippets.length,                    icon: Code2,  color: 'text-blue-400',    bg: 'bg-blue-400/10'    },
                { label: 'Executions', value: user?.stats?.executionsCount ?? 0,  icon: Play,   color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                { label: 'Solved',     value: user?.stats?.challengesSolved ?? 0, icon: Trophy, color: 'text-yellow-400',  bg: 'bg-yellow-400/10'  },
                { label: 'Favorites',  value: favoriteCount,                      icon: Star,   color: 'text-purple-400',  bg: 'bg-purple-400/10'  },
              ].map(stat => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Language breakdown */}
            {languageBreakdown.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold">Language Usage</h3>
                <div className="space-y-2.5">
                  {languageBreakdown.map(lang => (
                    <div key={lang.id} className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-mono w-24 shrink-0 ${getLanguageColor(lang.id)}`}>
                        {lang.label}
                      </span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(lang.count / languageBreakdown[0].count) * 100}%`,
                            background: lang.color,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 w-6 text-right">
                        {lang.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
      </PageWrapper>
    </div>
  )
}