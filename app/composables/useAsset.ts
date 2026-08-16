// Resolve a public/ asset path against the configured app baseURL.
export const useAsset = (path: string): string => {
  const base = useRuntimeConfig().app.baseURL || '/'
  return base + path.replace(/^\//, '')
}
