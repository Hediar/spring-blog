import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getArticles, deleteArticle } from '../api/articles'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

export default function ArticlesList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getArticles()
      setArticles(Array.isArray(data) ? data : data?.content || [])
    } catch (e) {
      setError(e.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Delete this article?')) return
    try {
      await deleteArticle(id)
      await load()
    } catch (e) {
      alert(e.message || 'Delete failed')
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>
  if (error) return <p className="text-sm text-destructive">{error}</p>

  return (
    <section className="space-y-4">
      {articles.length === 0 ? (
        <p className="text-sm text-muted-foreground">No articles yet. Create one!</p>
      ) : (
        <div className="grid gap-3">
          {articles.map((a) => {
            console.info(articles)
            return(
            <Card key={a.id}>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <Link to={`/articles/${a.id}`} className="font-semibold hover:underline">
                    {a.title}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {a.createdAt ? new Date(a.createdAt).toLocaleString() : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/articles/${a.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm" className="gap-1" onClick={() => handleDelete(a.id)}>
                    <Trash2 className="h-4 w-4" /> Delete
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
