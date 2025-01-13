import { type NextRequest } from 'next/server'
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware'


export default function middleware(request: NextRequest) {
  return withAuth(request)
}

export const config = {
  matcher: [
    // '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    '/:path*/dashboard',
    '/:path*/events',
    '/:path*/venues',
    '/:path*/users'
  ]
}