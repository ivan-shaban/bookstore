export const pagesPath = {
  "books": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/books/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  "news": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/news/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/news' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _nojekyll: '/.nojekyll',
  favicon_ico: '/favicon.ico',
  images: {
    home_header_background_jpg: '/images/home-header-background.jpg',
    logo_svg: '/images/logo.svg'
  }
} as const

export type StaticPath = typeof staticPath
