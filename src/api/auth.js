import { api } from './client'

export function login(payload) {
  return api.post('/auth/login', payload)
}

