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
        setError(e.message || '불러오기에 실패했습니다')
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
      if (!payload.title) throw new Error('제목은 필수입니다')
      if (isEdit) {
        await updateArticle(id, payload)
        navigate(`/articles/${id}`)
      } else {
        const created = await createArticle(payload)
        const newId = created?.id
        navigate(newId ? `/articles/${newId}` : '/')
      }
    } catch (e) {
      setError(e.message || '저장에 실패했습니다')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? '글 수정' : '새 글'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          {error && <p className="text-sm text-destructive m-0">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="내용을 입력하세요..."
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? '저장 중...' : isEdit ? '수정' : '등록'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
