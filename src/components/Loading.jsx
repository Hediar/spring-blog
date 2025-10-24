import { Loader2 } from 'lucide-react'

export default function Loading({ label = '로딩 중...' }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{label}</span>
    </div>
  )
}

