"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Eye, Clock, History, Flower, Leaf, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/auth"

interface WikiPage {
  id: string
  title: string
  slug: string
  content: string
  language: string
  category: string
  tags: string[] | null
  created_by: string
  last_edited_by: string
  version: number
  views_count: number
  created_at: string
  updated_at: string
  author: {
    full_name: string | null
    username: string | null
    avatar_url: string | null
  }
  last_editor: {
    full_name: string | null
    username: string | null
    avatar_url: string | null
  }
}

export default function WikiPageView({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState<WikiPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    loadWikiPage()
  }, [params.slug])

  const loadWikiPage = async () => {
    try {
      const { data, error } = await supabase
        .from("wiki_pages")
        .select(`
          *,
          author:profiles!wiki_pages_created_by_fkey(full_name, username, avatar_url),
          last_editor:profiles!wiki_pages_last_edited_by_fkey(full_name, username, avatar_url)
        `)
        .eq("slug", params.slug)
        .eq("status", "published")
        .single()

      if (error) throw error

      setPage(data)

      // Increment view count
      await supabase
        .from("wiki_pages")
        .update({ views_count: data.views_count + 1 })
        .eq("id", data.id)

      // Check if user can edit (any authenticated user can edit wiki pages)
      const user = await getCurrentUser()
      setCanEdit(!!user)
    } catch (error) {
      console.error("Error loading wiki page:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "grammar":
        return "bg-rose-100 text-rose-700"
      case "vocabulary":
        return "bg-violet-100 text-violet-700"
      case "culture":
        return "bg-emerald-100 text-emerald-700"
      case "pronunciation":
        return "bg-amber-100 text-amber-700"
      case "writing":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-8 w-8 text-rose-400 animate-pulse mx-auto mb-4" />
          <p className="text-slate-600">Loading wiki page...</p>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Page Not Found</h1>
          <p className="text-slate-600 mb-4">The wiki page you're looking for doesn't exist.</p>
          <Link href="/wiki">
            <Button variant="outline">Back to Wiki</Button>
          </Link>
        </div>
      </div>
    )
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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
            <Link href="/wiki" className="hover:text-rose-500 transition-colors">
              Wiki
            </Link>
            <span>/</span>
            <span className="text-slate-700">{page.title}</span>
          </div>

          {/* Page Header */}
          <Card className="border-slate-100 bg-white/80 mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getCategoryColor(page.category)}>{page.category}</Badge>
                    <Badge variant="outline">{page.language}</Badge>
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{page.views_count} views</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-700 mb-4">{page.title}</h1>

                  {page.tags && page.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {page.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={page.author.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback className="bg-rose-100 text-rose-600 text-xs">
                          {page.author.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span>Created by {page.author.full_name || page.author.username || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Created {formatDate(page.created_at)}</span>
                    </div>
                  </div>

                  {page.last_edited_by !== page.created_by && (
                    <div className="flex items-center space-x-2 text-sm text-slate-500 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={page.last_editor.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback className="bg-violet-100 text-violet-600 text-xs">
                          {page.last_editor.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        Last edited by {page.last_editor.full_name || page.last_editor.username || "Anonymous"}
                      </span>
                      <span>on {formatDate(page.updated_at)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {canEdit && (
                    <Link href={`/wiki/${page.slug}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Page Content */}
          <Card className="border-slate-100 bg-white/80">
            <CardContent className="pt-6">
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">{page.content}</div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-8">
            <Link href="/wiki">
              <Button variant="ghost" className="text-slate-600 hover:text-rose-500">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Wiki
              </Button>
            </Link>

            <div className="text-sm text-slate-500">
              Version {page.version} • Last updated {formatDate(page.updated_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
