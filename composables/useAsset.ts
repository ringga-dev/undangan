// Resolve a public/ asset path against the configured app baseURL.
// Required so assets work both in `nuxt dev` (/) and on GitHub Pages (/undangan/).
export const useAsset = (path: string): string => {
  const base = useRuntimeConfig().app.baseURL || '/'
  return base + path.replace(/^\//, '')
}
