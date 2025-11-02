import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Feather, PlusCircle } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between">
        <button
          className="flex items-center gap-2 text-base font-semibold hover:opacity-90"
          onClick={() => navigate('/')}
        >
          <Feather className="h-5 w-5 text-primary" />
          <span>스프링 블로그</span>
        </button>

        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent ` +
              (isActive
                ? 'text-primary bg-primary/10 hover:bg-primary/20'
                : 'text-foreground/70 hover:text-foreground')
            }
          >
            게시글
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/login">
            <Button size="sm" variant="outline">로그인</Button>
          </NavLink>
          <NavLink to="/articles/new">
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" /> 새 글
            </Button>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

