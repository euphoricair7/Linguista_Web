"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Globe,
  Calendar,
  Edit,
  Heart,
  MessageCircle,
  BookOpen,
  Flower,
  Leaf,
  Languages,
  Award,
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/auth"

interface Profile {
  id: string
  email: string
  full_name: string | null
  username: string | null
  bio: string | null
  avatar_url: string | null
  languages_learning: string[] | null
  languages_native: string[] | null
  location: string | null
  website: string | null
  joined_at: string
}

interface Post {
  id: string
  title: string
  content: string
  type: string
  language: string | null
  tags: string[] | null
  likes_count: number
  comments_count: number
  created_at: string
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("posts")

  useEffect(() => {
    loadProfile()
  }, [params.username])

  const loadProfile = async () => {
    try {
      // Get profile by username
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", params.username)
        .single()

      if (profileError) throw profileError

      setProfile(profileData)

      // Get user's posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("author_id", profileData.id)
        .eq("status", "published")
        .order("created_at", { ascending: false })

      if (postsError) throw postsError

      setPosts(postsData || [])

      // Check if this is the current user's profile
      const currentUser = await getCurrentUser()
      setIsOwnProfile(currentUser?.id === profileData.id)
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setLoading(false)
    }
  }

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
      month: "long",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <Flower className="h-8 w-8 text-rose-400 animate-pulse mx-auto mb-4" />
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Profile Not Found</h1>
          <p className="text-slate-600 mb-4">The user you're looking for doesn't exist.</p>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
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
              <Link href="/wiki" className="text-slate-600 hover:text-rose-500 transition-colors">
                Wiki
              </Link>
              <Link href="/posts" className="text-slate-600 hover:text-rose-500 transition-colors">
                Posts
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent">
                  Dashboard
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="border-slate-100 bg-white/80 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-rose-100 text-rose-600 text-2xl">
                  {profile.full_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-700">
                      {profile.full_name || profile.username || "Anonymous"}
                    </h1>
                    {profile.username && <p className="text-slate-500">@{profile.username}</p>}
                  </div>
                  {isOwnProfile && (
                    <Link href="/settings/profile">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                  )}
                </div>

                {profile.bio && <p className="text-slate-600 mb-4 leading-relaxed">{profile.bio}</p>}

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  {profile.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-500 hover:text-rose-600"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(profile.joined_at)}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-4 space-y-2">
                  {profile.languages_native && profile.languages_native.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Languages className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-slate-600">Native:</span>
                      <div className="flex flex-wrap gap-1">
                        {profile.languages_native.map((lang) => (
                          <Badge key={lang} className="bg-emerald-100 text-emerald-700 text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.languages_learning && profile.languages_learning.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-violet-500" />
                      <span className="text-sm text-slate-600">Learning:</span>
                      <div className="flex flex-wrap gap-1">
                        {profile.languages_learning.map((lang) => (
                          <Badge key={lang} className="bg-violet-100 text-violet-700 text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-rose-100 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Posts</CardTitle>
              <div className="text-2xl font-bold text-rose-600">{posts.length}</div>
            </CardHeader>
          </Card>
          <Card className="border-violet-100 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Likes</CardTitle>
              <div className="text-2xl font-bold text-violet-600">
                {posts.reduce((sum, post) => sum + post.likes_count, 0)}
              </div>
            </CardHeader>
          </Card>
          <Card className="border-emerald-100 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Comments</CardTitle>
              <div className="text-2xl font-bold text-emerald-600">
                {posts.reduce((sum, post) => sum + post.comments_count, 0)}
              </div>
            </CardHeader>
          </Card>
          <Card className="border-amber-100 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Languages</CardTitle>
              <div className="text-2xl font-bold text-amber-600">
                {(profile.languages_learning?.length || 0) + (profile.languages_native?.length || 0)}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 border border-rose-100">
            <TabsTrigger value="posts" className="data-[state=active]:bg-rose-50">
              Posts ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-rose-50">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="border-slate-100 bg-white/80 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getTypeColor(post.type)}>{post.type}</Badge>
                          {post.language && (
                            <Badge variant="outline" className="text-xs">
                              {post.language}
                            </Badge>
                          )}
                          <span className="text-sm text-slate-500">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-slate-700 mb-2">{post.title}</CardTitle>
                        <CardDescription className="text-slate-600 leading-relaxed">
                          {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments_count}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-slate-100 bg-white/80">
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No posts yet</h3>
                  <p className="text-slate-500">
                    {isOwnProfile
                      ? "Start sharing your thoughts, poetry, or language insights!"
                      : "This user hasn't shared any posts yet."}
                  </p>
                  {isOwnProfile && (
                    <Link href="/dashboard/editor" className="mt-4 inline-block">
                      <Button className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600">
                        Create Your First Post
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-slate-100 bg-white/80">
              <CardContent className="text-center py-12">
                <Award className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">Activity Timeline</h3>
                <p className="text-slate-500">Activity tracking coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
