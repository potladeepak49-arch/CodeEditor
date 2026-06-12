'use client'

import { useState } from 'react'
import { Copy, Check, Share2, Loader2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ShareModal({ snippetId, isOpen, onClose }) {
  const [shareUrl, setShareUrl]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [copied, setCopied]       = useState(false)
  const [generated, setGenerated] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const res  = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snippetId }),
      })
      const data = await res.json()
      if (data.success) {
        setShareUrl(data.data.shareUrl)
        setGenerated(true)
      }
    } catch (err) {
      console.error('Share failed:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
  try {
    if (!navigator?.clipboard) {
      console.error('Clipboard API not supported')
      return
    }

    await navigator.clipboard.writeText(shareUrl)

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}

  function handleClose() {
    setGenerated(false)
    setShareUrl('')
    setCopied(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Snippet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {!generated ? (
            <>
              <p className="text-sm text-muted-foreground">
                Generate a public link to share this snippet with anyone.
                No account required to view.
              </p>
              <Button
                className="w-full gap-2"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                  : <><Share2 className="w-4 h-4" /> Generate Share Link</>
                }
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Your snippet is now public. Share this link:
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-md bg-muted text-xs font-mono truncate border border-border">
                  {shareUrl}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="shrink-0 h-9 w-9"
                  onClick={handleCopy}
                >
                  {copied
                    ? <Check className="w-4 h-4 text-emerald-400" />
                    : <Copy className="w-4 h-4" />
                  }
                </Button>
              </div>
              
                <a
  href={shareUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1.5 text-xs text-primary hover:underline"
>
  <ExternalLink className="w-3 h-3" />
  Open in new tab
</a>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}