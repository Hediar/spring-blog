import { api } from './client'

export function getArticles() {
  return api.get('/articles')
}

export function getArticle(id) {
  return api.get(`/articles/${id}`)
}

export function createArticle(payload) {
  return api.post('/articles', payload)
}

export function updateArticle(id, payload) {
  return api.put(`/articles/${id}`, payload)
}

export function deleteArticle(id) {
  return api.delete(`/articles/${id}`)
}

