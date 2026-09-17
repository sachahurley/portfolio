// Resolve hook so build scripts can import the site's TypeScript modules
// (Node strips the types; it just won't guess the .ts extension itself).
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context)
  } catch (err) {
    if (specifier.startsWith('.')) {
      for (const ext of ['.ts', '/index.ts']) {
        try {
          return await next(specifier + ext, context)
        } catch {
          /* try the next candidate */
        }
      }
    }
    throw err
  }
}
