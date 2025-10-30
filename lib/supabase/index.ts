/**
 * Supabase Integration
 * 
 * Export all Supabase utilities from a single entry point
 */

// Client
export { createClient as createBrowserClient } from './client'

// Server
export { createClient as createServerClient } from './server'

// Auth
export {
  getUser,
  getSession,
  signOut,
  signInWithPassword,
  signUp,
  signInWithOAuth,
  resetPasswordForEmail,
  updatePassword,
  updateUserMetadata,
} from './auth'

// Database
export {
  getAll,
  getById,
  create,
  update,
  deleteById,
  query,
  uploadFile,
  deleteFile,
  getFileUrl,
} from './database'

// Types
export type { Database } from './types'
