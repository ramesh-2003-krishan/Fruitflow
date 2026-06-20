function resolveApiBaseUrl() {
  const configured = import.meta.env.VITE_API_URL || '/api'

  // Relative path — local dev uses Vite proxy at /api
  if (configured.startsWith('/')) {
    return configured.replace(/\/$/, '') || '/api'
  }

  // Absolute URL — backend routes are mounted under /api
  const base = configured.replace(/\/$/, '')
  return base.endsWith('/api') ? base : `${base}/api`
}

export const API_BASE_URL = resolveApiBaseUrl()
