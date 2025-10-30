export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Calendar, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Vercel-style gradient background */}
      <div className="fixed inset-0 vercel-gradient vercel-mesh -z-10" />
      
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-background" />
              </div>
              <span className="text-xl font-semibold">Event Hub</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Button variant="ghost" size="sm" asChild className="text-sm">
                <Link href="/login">Log In</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 md:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-secondary/50 backdrop-blur-sm text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Event Experience
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight animate-fade-in-up leading-[1.1]">
            Your Intelligent
            <br />
            <span className="vercel-text-gradient">Event Companion</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Transform your event experience with AI-powered networking, personalized agendas, and intelligent
            recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <Button size="lg" className="text-base px-8 h-12 rounded-lg shadow-lg hover:shadow-xl transition-all" asChild>
              <Link href="/onboarding">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 h-12 rounded-lg" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-24 md:py-32" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything you need
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered platform that adapts to your interests and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group relative p-8 rounded-2xl vercel-border-glow bg-card hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Networking</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered matching connects you with the most relevant attendees based on your interests and goals.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl vercel-border-glow bg-card hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Agenda</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get intelligent session recommendations tailored to your professional interests and learning objectives.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl vercel-border-glow bg-card hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Concierge</h3>
              <p className="text-muted-foreground leading-relaxed">
                24/7 intelligent assistant to help you navigate the event, find sessions, and answer questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-background" />
              </div>
              <span className="font-semibold text-sm">Event Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Event Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
