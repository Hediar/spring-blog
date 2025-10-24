import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import ArticlesList from './pages/ArticlesList.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import ArticleForm from './pages/ArticleForm.jsx'

function Nav() {
  const navigate = useNavigate()
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center gap-4 py-3">
        <button className="text-base font-semibold" onClick={() => navigate('/')}>Spring Blog</button>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'text-primary' : 'text-foreground/80'}>Articles</NavLink>
        <NavLink to="/articles/new" className={({ isActive }) => isActive ? 'text-primary' : 'text-foreground/80'}>New</NavLink>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <div>
      <Nav />
      <main className="container mx-auto py-6 max-w-3xl">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/new" element={<ArticleForm mode="create" />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/articles/:id/edit" element={<ArticleForm mode="edit" />} />
        </Routes>
      </main>
    </div>
  )
}
