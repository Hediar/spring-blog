import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getArticle, deleteArticle } from '../api/articles'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Pencil, Trash2, ArrowLeft } from 'lucide-react'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await getArticle(id)
        setArticle(data)
      } catch (e) {
        setError(e.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleDelete() {
    if (!confirm('Delete this article?')) return
    try {
      await deleteArticle(id)
      navigate('/')
    } catch (e) {
      alert(e.message || 'Delete failed')
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>
  if (error) return <p className="text-sm text-destructive">{error}</p>
  if (!article) return <p className="text-sm text-muted-foreground">Not found</p>

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="mb-1">{article.title}</CardTitle>
        <div className="text-xs text-muted-foreground">
          {article.createdAt ? new Date(article.createdAt).toLocaleString() : ''}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="whitespace-pre-wrap leading-7">{article.content}</div>
        <div className="flex gap-2">
          <Link to={`/articles/${id}/edit`}>
            <Button variant="outline" className="gap-1">
              <Pencil className="h-4 w-4" /> Edit
            </Button>
          </Link>
          <Button variant="destructive" className="gap-1" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
          <Link to="/">
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
