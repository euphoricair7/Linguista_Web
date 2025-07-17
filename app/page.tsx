import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Users, Feather, Leaf, Flower } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const recentPosts = [
    {
      id: 1,
      title: "Spring Haiku Collection",
      author: "Prachi Jha",
      type: "poetry",
      excerpt: "Cherry blossoms fall, whispers of ancient wisdom...",
      tags: ["poetry", "japanese", "nature"],
    },
    {
      id: 2,
      title: "French Literature Discussion",
      author: "Zia",
      type: "literature",
      excerpt: "Exploring themes of existentialism in Camus' masterpiece...",
      tags: ["french", "literature", "discussion"],
    },
    {
      id: 3,
      title: "Kannada Pronunciation Guide",
      author: "Shrey R Sinha",
      type: "resource",
      excerpt: "Essential tones and sounds for beginners...",
      tags: ["Kannada", "resource", "pronunciation"],
    },
  ]

  const upcomingEvents = [
    {
      date: "2024-01-15",
      title: "Poetry Reading Night",
      description: "Share your original works in any language",
    },
    {
      date: "2025-04-22",
      title: "Books, Banter, Bash",
      description: "Bring a book along and yap :))",
    },
    {
      date: "2025-08-29",
      title: "Treasure Hunt",
      description: "Get packed for a fun-filled day of clues and challenges",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Flower className="h-8 w-8 text-rose-400" />
                <Leaf className="h-4 w-4 text-emerald-400 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                Linguista
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-rose-500 transition-colors">
                Home
              </Link>
              <Link href="/events" className="text-slate-600 hover:text-rose-500 transition-colors">
                Events
              </Link>
              <Link href="/wiki" className="text-slate-600 hover:text-rose-500 transition-colors">
                Wiki
              </Link>
              <Link href="/posts" className="text-slate-600 hover:text-rose-500 transition-colors">
                Posts
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent">
                  Member Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="relative inline-block mb-6">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
              Where Languages
            </h2>
            <div className="absolute -top-4 -right-4 opacity-30">
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-rose-300">
                <path
                  d="M20 5 C25 10, 35 10, 30 20 C35 30, 25 30, 20 35 C15 30, 5 30, 10 20 C5 10, 15 10, 20 5 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Bloom Together
          </h3>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            A nurturing community where language learners, poets, and literature enthusiasts gather to share knowledge,
            creativity, and cultural discoveries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white px-8"
              >
                Join Our Garden
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-8 bg-transparent"
              >
                Explore Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-700">Cultivate Your Linguistic Journey</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-rose-100 hover:shadow-lg transition-shadow bg-white/80">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-6 w-6 text-rose-500" />
                  <CardTitle className="text-rose-700">Literature & Poetry</CardTitle>
                </div>
                <CardDescription>
                  Share original poetry, discuss world literature, and explore the beauty of language through art.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-violet-100 hover:shadow-lg transition-shadow bg-white/80">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-6 w-6 text-violet-500" />
                  <CardTitle className="text-violet-700">Cultural Events</CardTitle>
                </div>
                <CardDescription>
                  Join book clubs, poetry nights, language exchanges, and cultural celebrations throughout the year.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow bg-white/80">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-6 w-6 text-emerald-500" />
                  <CardTitle className="text-emerald-700">Learning Community</CardTitle>
                </div>
                <CardDescription>
                  Connect with fellow learners, access our language wiki, and grow together in a supportive environment.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-slate-700">Recent Blossoms</h3>
            <Link href="/posts">
              <Button variant="ghost" className="text-rose-600 hover:text-rose-700">
                View All Posts →
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="border-slate-100 hover:shadow-md transition-shadow bg-white/80">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Feather className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-500">{post.author}</span>
                  </div>
                  <CardTitle className="text-lg text-slate-700">{post.title}</CardTitle>
                  <CardDescription className="text-slate-600">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-rose-50 text-rose-600 hover:bg-rose-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-gradient-to-r from-violet-50 to-rose-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-slate-700">Upcoming Gatherings</h3>
            <Link href="/events">
              <Button variant="ghost" className="text-violet-600 hover:text-violet-700">
                View Calendar →
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-violet-100 bg-white/80">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-violet-500" />
                    <span className="text-sm text-violet-600 font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-slate-700">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flower className="h-6 w-6 text-rose-400" />
            <span className="text-xl font-bold text-slate-700">Linguista</span>
            <Leaf className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-slate-600 mb-4">Nurturing language learning through literature, poetry, and community</p>
          <div className="flex justify-center space-x-6 text-sm text-slate-500">
            <Link href="/about" className="hover:text-rose-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-rose-500 transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-rose-500 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
