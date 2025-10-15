import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabaseConfig } from '@/lib/env'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const { supabaseUrl, supabaseAnonKey, adminEmail } = getSupabaseConfig()

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Проверяем, является ли пользователь админом
  const isAdmin = user?.email === adminEmail

  // Если пользователь пытается зайти на /admin без авторизации, редиректим на логин
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!user || !isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Если авторизованный админ пытается зайти на страницу логина, редиректим в админку
  if (request.nextUrl.pathname === '/admin/login' && user && isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

