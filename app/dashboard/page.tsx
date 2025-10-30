"use client"

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MessageSquare, TrendingUp, Clock, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ChatWidget } from "@/components/chat-widget"
import Link from "next/link"
import { useUser } from "@/hooks/use-supabase"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there'
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 12) {
      return "Good Morning"
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon"
    } else if (hour >= 17 && hour < 22) {
      return "Good Evening"
    } else {
      return "It's Too Late, Time to go to Bed"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-foreground tracking-tight">
            {getGreeting()}, {displayName}
          </h1>
          <p className="text-lg text-muted-foreground">Here&apos;s your personalized event experience.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card className="border-border/40 transition-all duration-200 hover:bg-muted/30 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Calendar className="h-5 w-5 text-primary/70" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Today</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold mb-1">5</p>
                  <p className="text-sm text-muted-foreground">Sessions scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 transition-all duration-200 hover:bg-muted/30 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-primary/70" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Network</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold mb-1">12</p>
                  <p className="text-sm text-muted-foreground">New connections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 transition-all duration-200 hover:bg-muted/30 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <MessageSquare className="h-5 w-5 text-primary/70" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inbox</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold mb-1">3</p>
                  <p className="text-sm text-muted-foreground">Unread messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 transition-all duration-200 hover:bg-muted/30 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-5 w-5 text-primary/70" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Rate</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold mb-1">95%</p>
                  <p className="text-sm text-muted-foreground">Match quality</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Link href="/agenda" className="group">
            <Card className="h-full border-border/40 transition-all duration-200 hover:bg-muted/30 hover:border-primary/40 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-200 group-hover:bg-primary/20">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    5 Sessions
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold mb-2">My Agenda</CardTitle>
                <CardDescription className="text-base">
                  Your personalized schedule for today
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  View upcoming sessions and add new ones to your schedule
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/networking" className="group">
            <Card className="h-full border-border/40 transition-all duration-200 hover:bg-muted/30 hover:border-primary/40 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-200 group-hover:bg-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    12 New
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold mb-2">Networking</CardTitle>
                <CardDescription className="text-base">
                  Connect with professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  Discover and connect with like-minded attendees
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat" className="group">
            <Card className="h-full border-border/40 transition-all duration-200 hover:bg-muted/30 hover:border-primary/40 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-200 group-hover:bg-primary/20">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    24/7
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold mb-2">AI Concierge</CardTitle>
                <CardDescription className="text-base">
                  Your personal event assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  Get instant help, recommendations, and answers
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Today's Schedule Preview */}
        <Card className="border-border/40">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold">Today&apos;s Schedule</CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild className="hover:bg-muted/50">
                <Link href="/agenda">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/40 transition-all duration-200 hover:bg-muted/50 cursor-pointer group">
                <div className="flex flex-col items-center gap-1 min-w-[70px]">
                  <span className="text-lg font-semibold text-primary">9:00</span>
                  <span className="text-xs text-muted-foreground">AM</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-base mb-1 group-hover:text-primary transition-colors">
                    The Future of AI in Web Development
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Main Stage <span className="mx-1">·</span> Sarah Chen
                  </p>
                </div>
                <Star className="h-5 w-5 text-primary/70 flex-shrink-0 mt-1" />
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/40 transition-all duration-200 hover:bg-muted/50 cursor-pointer group">
                <div className="flex flex-col items-center gap-1 min-w-[70px]">
                  <span className="text-lg font-semibold text-primary">4:15</span>
                  <span className="text-xs text-muted-foreground">PM</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-base mb-1 group-hover:text-primary transition-colors">
                    Advanced Machine Learning Techniques
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Main Stage <span className="mx-1">·</span> Dr. James Liu
                  </p>
                </div>
                <Star className="h-5 w-5 text-primary/70 flex-shrink-0 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ChatWidget />
    </div>
  )
}
