"use client"

export const dynamic = 'force-dynamic'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      if (data.user) {
        toast.success("Successfully logged in!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-1 items-center justify-center bg-primary/5 border-r border-border">
        <div className="max-w-md space-y-6 px-12 py-16 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-bounce-in">
            Returning Attendees
          </span>
          <h2 className="text-4xl font-bold leading-tight animate-fade-in-up">
            Access your personalized event agenda, connections, and live updates.
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Log back in to pick up where you left off and discover fresh recommendations tailored to your interests.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="group cursor-pointer">
              <p className="text-2xl font-semibold text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110 inline-block">97%</p>
              <p>Match satisfaction rate</p>
            </div>
            <div className="group cursor-pointer">
              <p className="text-2xl font-semibold text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110 inline-block">24/7</p>
              <p>AI concierge support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">Log in with your event registration email to continue.</p>
          </div>

          <Card className="transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Log in to Event Hub</CardTitle>
              <CardDescription>Enter your credentials to access your personalized experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="transition-colors group-focus-within:text-primary">Email address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="jane.doe@email.com" 
                    required 
                    autoComplete="email"
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="password" className="transition-colors group-focus-within:text-primary">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    autoComplete="current-password"
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="transition-all duration-300 hover:scale-110" />
                    <Label htmlFor="remember" className="font-normal cursor-pointer hover:text-primary transition-colors">
                      Remember me
                    </Label>
                  </div>
                  <Link href="#" className="text-primary hover:underline transition-all hover:translate-x-1">
                    Forgot password?
                  </Link>
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                  size="lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            New to Event Hub?{" "}
            <Link href="/onboarding" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

