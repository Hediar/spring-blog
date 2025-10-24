import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getArticles, deleteArticle } from '../api/articles'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import Loading from '../components/Loading'

export default function ArticlesList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getArticles()
      setArticles(Array.isArray(data) ? data : data?.content || [])
    } catch (e) {
      setError(e.message || '불러오기에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id) {
    if (!confirm('이 게시글을 삭제할까요?')) return
    try {
      await deleteArticle(id)
      await load()
    } catch (e) {
      alert(e.message || '삭제에 실패했습니다')
    }
  }

  if (loading) return <Loading />
  if (error) return <p className="text-sm text-destructive">{error}</p>

  return (
    <section className="space-y-4">
      {articles.length === 0 ? (
        <p className="text-sm text-muted-foreground">게시글이 없습니다. 새 글을 작성해 보세요!</p>
      ) : (
        <div className="grid gap-3">
          {articles.map((a) => {
            return(
            <Card
              key={a.id}
              className="cursor-pointer transition-colors hover:bg-accent hover:border-primary/30 transform-gpu transition-transform duration-150 ease-out hover:shadow-md hover:scale-[.997]"
              onClick={() => navigate(`/articles/${a.id}`)}
            >
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <div className="font-semibold">
                    {a.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {a.createdAt ? new Date(a.createdAt).toLocaleString() : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/articles/${a.id}/edit`} onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Pencil className="h-4 w-4" /> 수정
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm" className="gap-1" onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }}>
                    <Trash2 className="h-4 w-4" /> 삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      )}
    </section>
  )
}
