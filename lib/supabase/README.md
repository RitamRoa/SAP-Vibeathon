# Supabase Integration Guide

This project uses Supabase for authentication, database, and storage.

## Setup

1. **Environment Variables** - Already configured in `.env`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xteipiminuoezjdaqhcz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. **Installed Packages**:
   - `@supabase/supabase-js` - Supabase client library
   - `@supabase/ssr` - Server-side rendering support

## File Structure

```
lib/supabase/
├── client.ts          # Browser client for client components
├── server.ts          # Server client for server components/actions
├── middleware.ts      # Session refresh middleware
├── auth.ts           # Authentication utilities
├── database.ts       # Database CRUD helpers
├── types.ts          # TypeScript types (generate from schema)
└── index.ts          # Unified exports

hooks/
└── use-supabase.ts   # React hooks for client-side usage

middleware.ts         # Root middleware for route protection

app/auth/
└── callback/
    └── route.ts      # OAuth callback handler
```

## Usage Examples

### 1. Authentication

#### Client Component (Login Form)
```tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error) {
      window.location.href = '/dashboard'
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
```

#### Server Component (Get User)
```tsx
import { getUser } from '@/lib/supabase/auth'

export default async function ProfilePage() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
    </div>
  )
}
```

#### Server Action (Sign Out)
```tsx
'use server'

import { signOut } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'

export async function handleSignOut() {
  await signOut()
  redirect('/login')
}
```

### 2. Database Operations

#### Create Record
```tsx
import { create } from '@/lib/supabase/database'

const newProfile = await create('profiles', {
  email: 'user@example.com',
  full_name: 'John Doe',
})
```

#### Read Records
```tsx
import { getAll, getById } from '@/lib/supabase/database'

// Get all profiles
const profiles = await getAll('profiles')

// Get single profile
const profile = await getById('profiles', 'user-id')
```

#### Update Record
```tsx
import { update } from '@/lib/supabase/database'

const updated = await update('profiles', 'user-id', {
  full_name: 'Jane Doe',
})
```

#### Query with Filters
```tsx
import { query } from '@/lib/supabase/database'

const activeUsers = await query('profiles', {
  status: 'active',
  role: 'user',
})
```

### 3. Storage

#### Upload File
```tsx
import { uploadFile } from '@/lib/supabase/database'

const publicUrl = await uploadFile('avatars', `${userId}/avatar.png`, file)
```

#### Delete File
```tsx
import { deleteFile } from '@/lib/supabase/database'

await deleteFile('avatars', `${userId}/avatar.png`)
```

### 4. React Hooks (Client Side)

```tsx
'use client'

import { useUser, useSession } from '@/hooks/use-supabase'

export default function UserProfile() {
  const { user, loading } = useUser()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not authenticated</div>

  return <div>Hello, {user.email}!</div>
}
```

### 5. Real-time Subscriptions

```tsx
'use client'

import { useSupabase } from '@/hooks/use-supabase'
import { useEffect, useState } from 'react'

export default function RealtimeComponent() {
  const supabase = useSupabase()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return <div>{/* Render messages */}</div>
}
```

## Route Protection

The middleware automatically protects routes:

### Protected Routes (require authentication):
- `/dashboard`
- `/chat`
- `/networking`
- `/agenda`
- `/settings`

### Auth Routes (redirect if authenticated):
- `/login`
- `/register`

To modify protected routes, edit `lib/supabase/middleware.ts`.

## Database Types

Generate TypeScript types from your Supabase schema:

```bash
npx supabase gen types typescript --project-id xteipiminuoezjdaqhcz > lib/supabase/types.ts
```

Or use the Supabase CLI:

```bash
supabase login
supabase link --project-ref xteipiminuoezjdaqhcz
supabase gen types typescript --local > lib/supabase/types.ts
```

## OAuth Providers

To enable OAuth (Google, GitHub, Azure):

1. Configure providers in Supabase Dashboard
2. Use the sign-in function:

```tsx
import { signInWithOAuth } from '@/lib/supabase/auth'

const { data, error } = await signInWithOAuth('google')
```

The callback route at `/auth/callback` handles the OAuth redirect.

## Best Practices

1. **Use Server Components** when possible for better security
2. **Client Components** only when you need interactivity
3. **Server Actions** for mutations
4. **Row Level Security (RLS)** - Enable in Supabase for all tables
5. **Never expose** `SUPABASE_SERVICE_ROLE_KEY` to the client

## Troubleshooting

### Session not persisting
- Check that middleware is running
- Verify cookie settings in browser
- Ensure `middleware.ts` matcher includes your routes

### CORS errors
- Check Supabase project settings
- Verify `NEXT_PUBLIC_BASE_URL` is correct
- Add your domain to allowed origins in Supabase

### Type errors
- Regenerate types from schema
- Check that table/column names match

## Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
