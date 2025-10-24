const API_BASE = import.meta.env.VITE_API_BASE || '/api'

function buildUrl(path) {
  if (!path.startsWith('/')) return `${API_BASE}/${path}`
  return `${API_BASE}${path}`
}

export async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const init = { method, headers: { ...headers } }

  if (body !== undefined) {
    init.headers['Content-Type'] = init.headers['Content-Type'] || 'application/json'
    init.body = typeof body === 'string' ? body : JSON.stringify(body)
  }

  const res = await fetch(buildUrl(path), init)
  const contentType = res.headers.get('content-type') || ''

  let data = null
  if (contentType.includes('application/json')) {
    data = await res.json()
  } else {
    data = await res.text()
  }

  if (!res.ok) {
    const message = typeof data === 'string' ? data : (data?.message || '요청에 실패했습니다')
    throw new Error(message)
  }

  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
}
