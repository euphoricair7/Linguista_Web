"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PenTool, Calendar, BookOpen, Users, Flower, Leaf, Plus, Edit, Eye, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const userPosts = [
    {
      id: 1,
      title: "Autumn Reflections",
      type: "poetry",
      status: "published",
      likes: 12,
      comments: 3,
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "Spanish Grammar Tips",
      type: "resource",
      status: "draft",
      likes: 0,
      comments: 0,
      date: "2024-01-12",
    },
  ]

  const upcomingEvents = [
    {
      title: "Poetry Reading Night",
      date: "2024-01-15",
      time: "7:00 PM",
      attending: true,
    },
    {
      title: "Spanish Book Club",
      date: "2024-01-22",
      time: "6:30 PM",
      attending: false,
    },
  ]

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
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-rose-100 text-rose-600">MC</AvatarFallback>
              </Avatar>
              <span className="text-slate-700 font-medium">Maria Chen</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-700 mb-2">Welcome back, Maria!</h1>
          <p className="text-slate-600">Your creative garden awaits your next contribution.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 border border-rose-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-rose-50">
              Overview
            </TabsTrigger>
            <TabsTrigger value="posts" className="data-[state=active]:bg-rose-50">
              My Posts
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-rose-50">
              Events
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-rose-50">
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-rose-100 bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Posts Published</CardTitle>
                  <div className="text-2xl font-bold text-rose-600">8</div>
                </CardHeader>
              </Card>
              <Card className="border-violet-100 bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Events Attended</CardTitle>
                  <div className="text-2xl font-bold text-violet-600">12</div>
                </CardHeader>
              </Card>
              <Card className="border-emerald-100 bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Community Likes</CardTitle>
                  <div className="text-2xl font-bold text-emerald-600">47</div>
                </CardHeader>
              </Card>
              <Card className="border-amber-100 bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Languages Learning</CardTitle>
                  <div className="text-2xl font-bold text-amber-600">3</div>
                </CardHeader>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-slate-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-slate-700">Quick Actions</CardTitle>
                <CardDescription>What would you like to create today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/dashboard/editor">
                    <Button className="w-full h-20 bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 flex flex-col items-center space-y-2">
                      <PenTool className="h-6 w-6" />
                      <span>Write Poetry</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/editor?type=resource">
                    <Button
                      variant="outline"
                      className="w-full h-20 border-emerald-200 text-emerald-600 hover:bg-emerald-50 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <BookOpen className="h-6 w-6" />
                      <span>Share Resource</span>
                    </Button>
                  </Link>
                  <Link href="/events">
                    <Button
                      variant="outline"
                      className="w-full h-20 border-violet-200 text-violet-600 hover:bg-violet-50 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <Calendar className="h-6 w-6" />
                      <span>Browse Events</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-slate-100 bg-white/80">
                <CardHeader>
                  <CardTitle className="text-slate-700">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-700">{post.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {post.type}
                          </Badge>
                          <span className="text-xs text-slate-500">{post.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-500">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-slate-100 bg-white/80">
                <CardHeader>
                  <CardTitle className="text-slate-700">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-700">{event.title}</h4>
                        <p className="text-sm text-slate-500">
                          {event.date} at {event.time}
                        </p>
                      </div>
                      <Badge variant={event.attending ? "default" : "outline"}>
                        {event.attending ? "Attending" : "Not Attending"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-700">My Posts</h2>
              <Link href="/dashboard/editor">
                <Button className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600">
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {userPosts.map((post) => (
                <Card key={post.id} className="border-slate-100 bg-white/80">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-700">{post.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{post.type}</Badge>
                          <Badge variant={post.status === "published" ? "default" : "outline"}>{post.status}</Badge>
                          <span className="text-sm text-slate-500">{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">Events Coming Soon</h3>
              <p className="text-slate-500">Check back for upcoming community events and gatherings.</p>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">Community Features</h3>
              <p className="text-slate-500">Connect with other members and explore community discussions.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
