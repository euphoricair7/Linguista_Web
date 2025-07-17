import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Globe, BookOpen, Users, Star, Flower, Leaf, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WikiPage() {
  const languages = [
    {
      name: "Spanish",
      nativeName: "Español",
      speakers: "500M+",
      difficulty: "Beginner",
      family: "Romance",
      articles: 45,
      contributors: 12,
    },
    {
      name: "Japanese",
      nativeName: "日本語",
      speakers: "125M+",
      difficulty: "Advanced",
      family: "Japonic",
      articles: 38,
      contributors: 8,
    },
    {
      name: "French",
      nativeName: "Français",
      speakers: "280M+",
      difficulty: "Intermediate",
      family: "Romance",
      articles: 52,
      contributors: 15,
    },
    {
      name: "Mandarin",
      nativeName: "中文",
      speakers: "1B+",
      difficulty: "Advanced",
      family: "Sino-Tibetan",
      articles: 29,
      contributors: 6,
    },
    {
      name: "German",
      nativeName: "Deutsch",
      speakers: "100M+",
      difficulty: "Intermediate",
      family: "Germanic",
      articles: 41,
      contributors: 10,
    },
    {
      name: "Italian",
      nativeName: "Italiano",
      speakers: "65M+",
      difficulty: "Beginner",
      family: "Romance",
      articles: 33,
      contributors: 9,
    },
  ]

  const featuredArticles = [
    {
      title: "Understanding Spanish Subjunctive Mood",
      language: "Spanish",
      author: "Carlos Rodriguez",
      views: 1240,
      rating: 4.8,
    },
    {
      title: "Japanese Honorific System Guide",
      language: "Japanese",
      author: "Yuki Tanaka",
      views: 890,
      rating: 4.9,
    },
    {
      title: "French Pronunciation Fundamentals",
      language: "French",
      author: "Marie Dubois",
      views: 1560,
      rating: 4.7,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 text-emerald-700"
      case "Intermediate":
        return "bg-amber-100 text-amber-700"
      case "Advanced":
        return "bg-rose-100 text-rose-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
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
              <Link href="/wiki" className="text-rose-600 font-medium">
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

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
              Language Wiki
            </h1>
            <div className="absolute -top-2 -right-6 opacity-30">
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-violet-300">
                <path
                  d="M16 4 C20 8, 28 8, 24 16 C28 24, 20 24, 16 28 C12 24, 4 24, 8 16 C4 8, 12 8, 16 4 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            A collaborative knowledge base for language learners, featuring comprehensive guides, cultural insights, and
            learning resources contributed by our community.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search languages, topics, or articles..."
              className="pl-10 border-rose-200 focus:border-rose-400 bg-white/80"
            />
          </div>
        </div>

        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-700 mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="border-slate-100 bg-white/80 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-violet-50 text-violet-600">
                      {article.language}
                    </Badge>
                    <div className="flex items-center space-x-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{article.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-slate-700">{article.title}</CardTitle>
                  <CardDescription>
                    By {article.author} • {article.views.toLocaleString()} views
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Languages Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-700">Languages</h2>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            >
              <Globe className="h-4 w-4 mr-2" />
              Browse All
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <Card
                key={index}
                className="border-slate-100 bg-white/80 hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg text-slate-700 group-hover:text-rose-600 transition-colors">
                        {language.name}
                      </CardTitle>
                      <p className="text-slate-500 text-sm">{language.nativeName}</p>
                    </div>
                    <Badge className={getDifficultyColor(language.difficulty)}>{language.difficulty}</Badge>
                  </div>
                  <CardDescription>
                    {language.speakers} speakers • {language.family} family
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{language.articles} articles</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{language.contributors} contributors</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-600 group-hover:text-rose-600 group-hover:bg-rose-50 transition-colors"
                  >
                    Explore {language.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contribute Section */}
        <section className="mt-16 text-center">
          <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50 to-violet-50 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-700">Contribute to the Wiki</CardTitle>
              <CardDescription className="text-lg">Share your language expertise and help others learn</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                Our wiki thrives on community contributions. Whether you're a native speaker, language teacher, or
                passionate learner, your knowledge can help others on their journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-emerald-500 to-violet-500 hover:from-emerald-600 hover:to-violet-600">
                    Start Contributing
                  </Button>
                </Link>
                <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
