'use client'

import { useExecutionStore } from '@/store/executionStore'
import { CheckCircle2, XCircle, Clock, MemoryStick, Loader2, Terminal } from 'lucide-react'

const STATUS_STYLES = {
  Accepted:       { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  'Wrong Answer': { icon: XCircle,      color: 'text-red-400',     bg: 'bg-red-400/10',     border: 'border-red-400/20'     },
  'Runtime Error':{ icon: XCircle,      color: 'text-orange-400',  bg: 'bg-orange-400/10',  border: 'border-orange-400/20'  },
  'Compile Error':{ icon: XCircle,      color: 'text-yellow-400',  bg: 'bg-yellow-400/10',  border: 'border-yellow-400/20'  },
}

export default function OutputPanel() {
  const { status, output, error, time, memory } = useExecutionStore()

  // Idle state
  if (status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-zinc-950 h-48 md:h-full">
        <Terminal className="w-8 h-8 text-muted-foreground/30 mb-3" />
        <p className="text-sm text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Ctrl+Enter</kbd> or click Run
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">Output will appear here</p>
      </div>
    )
  }

  // Running state
  if (status === 'running') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-950 h-48 md:h-full">
        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin mb-3" />
        <p className="text-sm text-muted-foreground">Executing code...</p>
      </div>
    )
  }

  const statusKey = error ? 'Runtime Error' : 'Accepted'
  const style = STATUS_STYLES[statusKey] ?? STATUS_STYLES['Accepted']
  const StatusIcon = style.icon

  return (
    <div className="flex flex-col bg-zinc-950 h-48 md:h-full overflow-hidden">

      {/* Header */}
      <div className={`flex items-center gap-2 px-4 py-3 border-b ${style.border} ${style.bg} shrink-0`}>
        <StatusIcon className={`w-4 h-4 ${style.color}`} />
        <span className={`text-sm font-medium ${style.color}`}>
          {error ? 'Runtime Error' : 'Accepted'}
        </span>
        {time && (
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {time}s
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{memory} MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Output */}
      <div className="flex-1 overflow-auto p-4">
        {error ? (
          <pre className="text-sm font-mono text-red-400 whitespace-pre-wrap leading-relaxed">
            {error}
          </pre>
        ) : (
          <pre className="text-sm font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
            {output || '(no output)'}
          </pre>
        )}
      </div>

    </div>
  )
}