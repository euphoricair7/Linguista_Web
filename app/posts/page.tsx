import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Heart, MessageCircle, Feather, Filter, Flower, Leaf, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function PostsPage() {
  const posts = [
    {
      id: 1,
      title: "Cherry Blossoms in Spring",
      content: "Petals dance on morning breeze,\nWhispers of ancient wisdom fall,\nSpring's gentle poetry...",
      author: "Maria Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "poetry",
      language: "English",
      tags: ["poetry", "nature", "haiku", "spring"],
      likes: 24,
      comments: 8,
      date: "2024-01-12",
      trending: true,
    },
    {
      id: 2,
      title: "Understanding French Subjunctive",
      content:
        "The subjunctive mood in French can be challenging for learners. Here's a comprehensive guide to help you master this essential grammatical concept...",
      author: "Jean Baptiste",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "resource",
      language: "French",
      tags: ["french", "grammar", "subjunctive", "tutorial"],
      likes: 18,
      comments: 12,
      date: "2024-01-11",
      trending: false,
    },
    {
      id: 3,
      title: "Reflexiones sobre Cien años de soledad",
      content:
        "García Márquez nos transporta a Macondo, un lugar donde la realidad y la fantasía se entrelazan de manera magistral...",
      author: "Carlos Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "literature",
      language: "Spanish",
      tags: ["spanish", "literature", "garcia-marquez", "magical-realism"],
      likes: 31,
      comments: 15,
      date: "2024-01-10",
      trending: true,
    },
    {
      id: 4,
      title: "Japanese Tea Ceremony: A Cultural Journey",
      content:
        "The way of tea (茶道, sadō) is more than just preparing tea—it's a spiritual practice that embodies harmony, respect, purity, and tranquility...",
      author: "Yuki Tanaka",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "cultural",
      language: "Japanese",
      tags: ["japanese", "culture", "tea-ceremony", "tradition"],
      likes: 27,
      comments: 9,
      date: "2024-01-09",
      trending: false,
    },
    {
      id: 5,
      title: "Mandarin Tones Made Simple",
      content:
        "Mastering the four tones in Mandarin Chinese is crucial for clear communication. Here are some practical tips and exercises...",
      author: "Li Wei",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "resource",
      language: "Mandarin",
      tags: ["mandarin", "pronunciation", "tones", "beginner"],
      likes: 22,
      comments: 6,
      date: "2024-01-08",
      trending: false,
    },
    {
      id: 6,
      title: "Autumn Leaves (Poesia d'Autunno)",
      content: "Foglie dorate cadono lente,\nSussurri del vento d'autunno,\nLa natura dipinge i suoi sogni...",
      author: "Isabella Romano",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "poetry",
      language: "Italian",
      tags: ["poetry", "italian", "autumn", "nature"],
      likes: 19,
      comments: 4,
      date: "2024-01-07",
      trending: false,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "poetry":
        return "bg-rose-100 text-rose-700"
      case "literature":
        return "bg-violet-100 text-violet-700"
      case "resource":
        return "bg-emerald-100 text-emerald-700"
      case "cultural":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Flower className="h-6 w-6 text-rose-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                Linguista
              </span>
              <Leaf className="h-4 w-4 text-emerald-400" />
            </Link>
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
              <Link href="/posts" className="text-rose-600 font-medium">
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

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
              Community Posts
            </h1>
            <div className="absolute -top-2 -right-6 opacity-30">
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-rose-300">
                <path
                  d="M16 4 C20 8, 28 8, 24 16 C28 24, 20 24, 16 28 C12 24, 4 24, 8 16 C4 8, 12 8, 16 4 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Discover poetry, language resources, cultural insights, and literary discussions shared by our vibrant
            learning community.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search posts, authors, or topics..."
              className="pl-10 border-rose-200 focus:border-rose-400 bg-white/80"
            />
          </div>
          <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Posts Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Posts */}
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="border-slate-100 bg-white/80 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-rose-100 text-rose-600">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-700">{post.author}</p>
                        <p className="text-sm text-slate-500">{formatDate(post.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {post.trending && (
                        <div className="flex items-center space-x-1 text-amber-500">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-xs font-medium">Trending</span>
                        </div>
                      )}
                      <Badge className={getTypeColor(post.type)}>{post.type}</Badge>
                    </div>
                  </div>

                  <CardTitle className="text-xl text-slate-700 mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-slate-500">
                      <button className="flex items-center space-x-1 hover:text-rose-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-violet-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </div>
                    <Button variant="ghost" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card className="border-slate-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-slate-700">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["poetry", "spanish", "french", "japanese", "literature", "grammar", "culture", "beginner"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                      >
                        #{tag}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="border-slate-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-slate-700">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Maria Chen", posts: 12, avatar: "/placeholder.svg?height=32&width=32" },
                  { name: "Jean Baptiste", posts: 8, avatar: "/placeholder.svg?height=32&width=32" },
                  { name: "Carlos Rodriguez", posts: 7, avatar: "/placeholder.svg?height=32&width=32" },
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-violet-100 text-violet-600 text-xs">
                        {contributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">{contributor.name}</p>
                      <p className="text-xs text-slate-500">{contributor.posts} posts</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Join Community */}
            <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-violet-50">
              <CardHeader>
                <CardTitle className="text-emerald-700">Join the Conversation</CardTitle>
                <CardDescription>Share your own poetry, insights, and language learning resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-violet-500 hover:from-emerald-600 hover:to-violet-600">
                    <Feather className="h-4 w-4 mr-2" />
                    Start Writing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
