export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-3" />
      <div className="h-3 bg-muted rounded w-1/2 mb-4" />
      <div className="h-20 bg-muted rounded mb-3" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-muted rounded" />
        <div className="h-5 w-16 bg-muted rounded" />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 animate-pulse">
      <div className="w-5 h-5 bg-muted rounded-full" />
      <div className="h-4 bg-muted rounded flex-1" />
      <div className="h-4 bg-muted rounded w-20" />
      <div className="h-4 bg-muted rounded w-16" />
    </div>
  )
}

export function SkeletonStat() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-muted" />
      <div>
        <div className="h-7 w-10 bg-muted rounded mb-1" />
        <div className="h-3 w-16 bg-muted rounded" />
      </div>
    </div>
  )
}