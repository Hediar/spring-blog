import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createArticle, getArticle, updateArticle } from '../api/articles'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'

export default function ArticleForm({ mode = 'create' }) {
  const isEdit = mode === 'edit'
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    async function load() {
      try {
        const a = await getArticle(id)
        setTitle(a.title || '')
        setContent(a.content || '')
      } catch (e) {
        setError(e.message || 'Failed to load')
      }
    }
    load()
  }, [id, isEdit])

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = { title: title.trim(), content: content.trim() }
      if (!payload.title) throw new Error('Title is required')
      if (isEdit) {
        await updateArticle(id, payload)
        navigate(`/articles/${id}`)
      } else {
        const created = await createArticle(payload)
        const newId = created?.id
        navigate(newId ? `/articles/${newId}` : '/')
      }
    } catch (e) {
      setError(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Article' : 'New Article'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          {error && <p className="text-sm text-destructive m-0">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Write your content..."
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
