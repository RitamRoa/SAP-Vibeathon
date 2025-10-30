import { createClient } from '@/lib/supabase/server'

/**
 * Get the current authenticated user from the server
 */
export async function getUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Get the current session from the server
 */
export async function getSession() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
}

/**
 * Sign in with email and password
 */
export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient()
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string, metadata?: any) {
  const supabase = createClient()
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithOAuth(provider: 'google' | 'github' | 'azure') {
  const supabase = createClient()
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  })
}

/**
 * Reset password for email
 */
export async function resetPasswordForEmail(email: string) {
  const supabase = createClient()
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
  })
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  return await supabase.auth.updateUser({
    password: newPassword,
  })
}

/**
 * Update user metadata
 */
export async function updateUserMetadata(metadata: any) {
  const supabase = createClient()
  return await supabase.auth.updateUser({
    data: metadata,
  })
}
