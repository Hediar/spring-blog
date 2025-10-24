import { SearchX } from 'lucide-react'

export default function NotFound({ label = '찾을 수 없습니다' }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <SearchX className="h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

