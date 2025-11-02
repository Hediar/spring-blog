import { Route, Routes } from 'react-router-dom'
import ArticlesList from './pages/ArticlesList.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import ArticleForm from './pages/ArticleForm.jsx'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'

export default function App() {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-6 max-w-3xl">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles/new" element={<ArticleForm mode="create" />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/articles/:id/edit" element={<ArticleForm mode="edit" />} />
        </Routes>
      </main>
    </div>
  )
}
