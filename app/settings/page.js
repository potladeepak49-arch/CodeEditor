'use client'

import { useState } from 'react'
import TopNav from '@/components/layout/TopNav'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { EDITOR_THEMES, FONT_SIZES } from '@/config/themes'
import { LANGUAGES } from '@/config/languages'
import PageWrapper from '@/components/ui/PageWrapper'
import {
  Save, Loader2, Moon, Sun, Monitor,
  Code2, Type, Hash, Bell, Shield, Trash2,
  ChevronDown, LogOut
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const SECTIONS = [
  { id: 'editor',        label: 'Editor',          icon: Code2   },
  { id: 'appearance',    label: 'Appearance',       icon: Monitor },
  { id: 'notifications', label: 'Notifications',    icon: Bell    },
  { id: 'security',      label: 'Security',         icon: Shield  },
  { id: 'danger',        label: 'Danger Zone',      icon: Trash2  },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('editor')
  const [isSaving, setIsSaving]           = useState(false)
  const [saved, setSaved]                 = useState(false)

  const [editorSettings, setEditorSettings] = useState({
    language:    'javascript',
    theme:       'vs-dark',
    fontSize:    14,
    tabSize:     2,
    wordWrap:    true,
    minimap:     false,
    lineNumbers: true,
    autoSave:    true,
  })

  const [notifications, setNotifications] = useState({
    emailUpdates:    false,
    snippetShared:   true,
    challengeResult: true,
  })

  const [passwords, setPasswords] = useState({
    current: '', newPass: '', confirm: '',
  })
  const [passError, setPassError] = useState('')

  const currentLanguage = LANGUAGES.find(l => l.id === editorSettings.language) ?? LANGUAGES[0]
  const currentTheme    = EDITOR_THEMES.find(t => t.id === editorSettings.theme) ?? EDITOR_THEMES[0]

  async function handleSave() {
    setIsSaving(true)
    try {
      await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: editorSettings }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setIsSaving(false)
    }
  }

  async function handlePasswordChange() {
    setPassError('')
    if (!passwords.current) { setPassError('Current password is required'); return }
    if (passwords.newPass.length < 8) { setPassError('New password must be at least 8 characters'); return }
    if (passwords.newPass !== passwords.confirm) { setPassError('Passwords do not match'); return }
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsSaving(false)
    setPasswords({ current: '', newPass: '', confirm: '' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function Toggle({ value, onChange }) {
    return (
      <button
        onClick={() => onChange(!value)}
        className={`relative w-9 h-5 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-muted'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : ''}`} />
      </button>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <TopNav title="Settings" />
 <PageWrapper className="flex-1 p-6 space-y-6">
      <div className="flex-1 flex overflow-hidden">

        {/* Settings sidebar */}
        <div className="w-[200px] shrink-0 border-r border-border bg-card p-3 space-y-0.5">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                activeSection === section.id
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <section.icon className="w-4 h-4 shrink-0" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl space-y-6">

            {/* Editor Settings */}
            {activeSection === 'editor' && (
              <>
                <div>
                  <h2 className="text-lg font-bold">Editor Settings</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Customize your coding environment
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 space-y-5">

                  {/* Language */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Default Language</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">Language selected when opening editor</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1.5 w-36 justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: currentLanguage.color }} />
                            {currentLanguage.label}
                          </div>
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {LANGUAGES.map(lang => (
                          <DropdownMenuItem
                            key={lang.id}
                            onClick={() => setEditorSettings(p => ({ ...p, language: lang.id }))}
                            className="gap-2 text-sm"
                          >
                            <span className="w-2 h-2 rounded-full" style={{ background: lang.color }} />
                            {lang.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="border-t border-border" />

                  {/* Theme */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Editor Theme</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">Color theme for the code editor</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1.5 w-36 justify-between">
                          {currentTheme.label}
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {EDITOR_THEMES.map(t => (
                          <DropdownMenuItem
                            key={t.id}
                            onClick={() => setEditorSettings(p => ({ ...p, theme: t.id }))}
                            className="text-sm"
                          >
                            {t.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="border-t border-border" />

                  {/* Font size */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Font Size</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">Editor font size in pixels</p>
                      </div>
                      <span className="text-sm font-mono font-medium">{editorSettings.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={24}
                      value={editorSettings.fontSize}
                      onChange={e => setEditorSettings(p => ({ ...p, fontSize: Number(e.target.value) }))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>12px</span>
                      <span>18px</span>
                      <span>24px</span>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Tab size */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Tab Size</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">Number of spaces per tab</p>
                    </div>
                    <div className="flex gap-2">
                      {[2, 4].map(size => (
                        <button
                          key={size}
                          onClick={() => setEditorSettings(p => ({ ...p, tabSize: size }))}
                          className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                            editorSettings.tabSize === size
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Toggles */}
                  {[
                    { key: 'wordWrap',    label: 'Word Wrap',    desc: 'Wrap long lines in the editor'     },
                    { key: 'minimap',     label: 'Minimap',      desc: 'Show code minimap on the right'    },
                    { key: 'lineNumbers', label: 'Line Numbers', desc: 'Show line numbers in the gutter'   },
                    { key: 'autoSave',    label: 'Auto Save',    desc: 'Automatically save snippets'       },
                  ].map(item => (
                    <div key={item.key}>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">{item.label}</Label>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle
                          value={editorSettings[item.key]}
                          onChange={val => setEditorSettings(p => ({ ...p, [item.key]: val }))}
                        />
                      </div>
                      <div className="border-t border-border mt-4" />
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Button size="sm" onClick={handleSave} disabled={isSaving} className="gap-1.5">
                      {isSaving
                        ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                        : saved ? '✓ Saved!' : <><Save className="w-3.5 h-3.5" /> Save Settings</>
                      }
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Appearance */}
            {activeSection === 'appearance' && (
              <>
                <div>
                  <h2 className="text-lg font-bold">Appearance</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Customize how CodeEditor looks
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                  <Label className="text-sm">Color Mode</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'dark',   label: 'Dark',   icon: Moon    },
                      { id: 'light',  label: 'Light',  icon: Sun     },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map(mode => (
                      <button
                        key={mode.id}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-primary bg-accent transition-colors"
                      >
                        <mode.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently using dark mode. Light mode coming soon.
                  </p>
                </div>
              </>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <>
                <div>
                  <h2 className="text-lg font-bold">Notifications</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Manage your notification preferences
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 space-y-5">
                  {[
                    { key: 'emailUpdates',    label: 'Email Updates',     desc: 'Receive product updates via email'     },
                    { key: 'snippetShared',   label: 'Snippet Shared',    desc: 'Notify when someone views your snippet'},
                    { key: 'challengeResult', label: 'Challenge Results', desc: 'Notify when submission is graded'      },
                  ].map((item, i) => (
                    <div key={item.key}>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">{item.label}</Label>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                          className={`relative w-9 h-5 rounded-full transition-colors ${notifications[item.key] ? 'bg-primary' : 'bg-muted'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifications[item.key] ? 'translate-x-4' : ''}`} />
                        </button>
                      </div>
                      {i < 2 && <div className="border-t border-border mt-4" />}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Security */}
            {activeSection === 'security' && (
              <>
                <div>
                  <h2 className="text-lg font-bold">Security</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Manage your account security
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold">Change Password</h3>

                  {passError && (
                    <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                      {passError}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Current Password</Label>
                      <Input
                        type="password"
                        value={passwords.current}
                        onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                        className="h-9 text-sm"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">New Password</Label>
                      <Input
                        type="password"
                        value={passwords.newPass}
                        onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))}
                        className="h-9 text-sm"
                        placeholder="Min. 8 characters"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Confirm New Password</Label>
                      <Input
                        type="password"
                        value={passwords.confirm}
                        onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                        className="h-9 text-sm"
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button size="sm" onClick={handlePasswordChange} disabled={isSaving} className="gap-1.5">
                      {isSaving
                        ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating...</>
                        : saved ? '✓ Updated!' : <><Shield className="w-3.5 h-3.5" /> Update Password</>
                      }
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Danger Zone */}
            {activeSection === 'danger' && (
              <>
                <div>
                  <h2 className="text-lg font-bold text-red-400">Danger Zone</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Irreversible actions — proceed with caution
                  </p>
                </div>
                <div className="bg-card border border-red-500/20 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Delete All Snippets</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Permanently delete all your saved snippets
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-1.5"
                      onClick={() => confirm('Delete all snippets? This cannot be undone.') && alert('Coming soon')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete All
                    </Button>
                  </div>

                  <div className="border-t border-red-500/20" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Delete Account</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-1.5"
                      onClick={() => confirm('Delete your account? This cannot be undone.') && alert('Coming soon')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
      </PageWrapper>
    </div>
  )
}