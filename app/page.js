// src/app/page.js
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PageWrapper from '@/components/ui/PageWrapper'
import { Badge } from '@/components/ui/badge'
import { 
  Code2, 
  Play, 
  Share2, 
  Zap, 
  Globe, 
  BookOpen,
  ArrowRight,
  GitBranch,
  Terminal,
  Layers
} from 'lucide-react'
const FEATURES = [
  {
    icon: Code2,
    title: 'Monaco Editor',
    description: 'The same editor that powers VS Code. Syntax highlighting, IntelliSense, and keyboard shortcuts you already know.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Play,
    title: 'Run Instantly',
    description: 'Execute code in JavaScript, Python, Java, C++, and C directly in your browser. See output in milliseconds.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Share2,
    title: 'Share Snippets',
    description: 'Generate a public link for any snippet. Share your code with anyone — no account required to view.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: BookOpen,
    title: 'Coding Challenges',
    description: 'Practice with curated problems. Track your submissions and measure your progress over time.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: Layers,
    title: 'Snippet Library',
    description: 'Save, organize, and favorite your code snippets. Your personal library of reusable code.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Built on Next.js 15 and deployed on Vercel. Optimized for speed with a global CDN.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
]

const STATS = [
  { value: '5',    label: 'Languages' },
  { value: '50+',  label: 'Challenges' },
  { value: '10ms', label: 'Avg Execution' },
  { value: '100%', label: 'Free' },
]

const CODE_PREVIEW = `// Two Sum — O(n) solution
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9));
// Output: [0, 1]`

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
       <PageWrapper className="flex-1 p-6 space-y-6">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Terminal className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-tight">CodeEditor</span>
          </div>
         <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
  <Link href="/register" className="hover:text-foreground transition-colors">Editor</Link>
  <Link href="/register" className="hover:text-foreground transition-colors">Challenges</Link>
  <Link href="/register" className="hover:text-foreground transition-colors">Snippets</Link>
</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

     {/* Hero */}
<section className="pt-32 pb-20 px-4 overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col items-center text-center mb-12">

      <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
          <Zap className="w-3 h-3 text-yellow-400" />
          Monaco Editor · Judge0 · Next.js 15
        </Badge>
      </div>

      <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Code.{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
  Run.
</span>{' '}
          Share.
        </h1>
      </div>

      <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
        <p className="text-muted-foreground text-xl max-w-xl mb-10 leading-relaxed">
          A modern online coding platform with a VS Code-powered editor,
          multi-language execution, and a built-in problem set.
        </p>
      </div>

      <div className="animate-fade-up opacity-0 flex flex-col sm:flex-row gap-3" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
        <Button size="lg" asChild className="gap-2 h-12 px-8 text-base">
  <Link href="/register">
    <Play className="w-4 h-4" />
    Start Coding Free
  </Link>
</Button>
        <Button size="lg" variant="outline" asChild className="gap-2 h-12 px-8 text-base">
          <Link href="/register">
            <BookOpen className="w-4 h-4" />
            View Challenges
          </Link>
        </Button>
      </div>

    </div>

    {/* Floating badges */}
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute -left-8 top-8 animate-float hidden lg:flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg" style={{ animationDelay: '0s' }}>
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs font-mono text-muted-foreground">Accepted · 0.045s</span>
      </div>
      <div className="absolute -right-8 top-16 animate-float hidden lg:flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg" style={{ animationDelay: '1s' }}>
        <span className="text-xs font-mono text-yellow-400">JavaScript</span>
      </div>
      <div className="absolute -right-4 bottom-8 animate-float hidden lg:flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg" style={{ animationDelay: '2s' }}>
        <span className="text-xs font-mono text-blue-400">Python</span>
      </div>

      {/* Code preview */}
      <div className="rounded-xl border border-border overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">twoSum.js — CodeEditor</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">Live</span>
          </div>
        </div>
        <div className="bg-zinc-950 p-6 font-mono text-sm leading-relaxed overflow-x-auto">
          <pre className="text-zinc-300">
            {CODE_PREVIEW.split('\n').map((line, i) => (
              <div key={i} className="flex hover:bg-zinc-900/50 rounded px-1 -mx-1 transition-colors">
                <span className="select-none w-8 text-zinc-600 text-right mr-6 shrink-0">{i + 1}</span>
                <span>{renderCodeLine(line)}</span>
              </div>
            ))}
          </pre>
        </div>
        <div className="bg-zinc-900 border-t border-border px-4 py-2 flex items-center gap-3">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Accepted
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">0.045s · 9.2 MB</span>
          <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <span>5 languages supported</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Built for developers who want a fast, distraction-free coding environment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-border/80 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-border bg-card p-12">
            <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">Start coding now</h2>
            <p className="text-muted-foreground mb-8">
              No setup. No installs. Just open the editor and write code.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href="/register">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="w-4 h-4" />
            <span>CodeEditor — Built with Next.js &amp; Monaco Editor</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/register" className="hover:text-foreground transition-colors">Editor</Link>
            <Link href="/register" className="hover:text-foreground transition-colors">Challenges</Link>
            <Link href="/register" className="hover:text-foreground transition-colors">Snippets</Link>
            <a href="https://github.com" className="hover:text-foreground transition-colors flex items-center gap-1">
  <GitBranch className="w-4 h-4" />
</a>
          </div>
        </div>
      </footer>
</PageWrapper>
    </div>
  )
}

// Simple syntax highlighter for the preview
function renderCodeLine(line) {
  const keywords = /\b(function|const|let|var|return|for|if|new|of)\b/g
  const strings = /(["'`].*?["'`])/g
  const comments = /(\/\/.*)/g
  const numbers = /\b(\d+)\b/g

  if (comments.test(line)) {
    return <span className="text-zinc-500">{line}</span>
  }

  return line
    .split(/(\b(?:function|const|let|var|return|for|if|new|of)\b|["'`].*?["'`]|\b\d+\b)/)
    .map((part, i) => {
      if (/^(function|const|let|var|return|for|if|new|of)$/.test(part))
        return <span key={i} className="text-pink-400">{part}</span>
      if (/^["'`]/.test(part))
        return <span key={i} className="text-emerald-400">{part}</span>
      if (/^\d+$/.test(part))
        return <span key={i} className="text-blue-400">{part}</span>
      return <span key={i}>{part}</span>
    })
}