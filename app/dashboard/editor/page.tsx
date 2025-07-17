"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, Quote, Save, Eye, Send, X, Plus, Flower, Leaf } from "lucide-react"
import Link from "next/link"

export default function EditorPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [postType, setPostType] = useState("poetry")
  const [isPreview, setIsPreview] = useState(false)

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    // Save as draft
    console.log("Saving draft...")
  }

  const handlePublish = () => {
    // Publish post
    console.log("Publishing post...")
  }

  const formatText = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = selectedText
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "quote":
        formattedText = `> ${selectedText}`
        break
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Flower className="h-6 w-6 text-rose-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                Linguista
              </span>
              <Leaf className="h-4 w-4 text-emerald-400" />
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleSave} className="border-slate-200 bg-transparent">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={handlePublish}
                className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-700 mb-2">Create New Post</h1>
            <p className="text-slate-600">Share your thoughts, poetry, or resources with the community.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-slate-100 bg-white/80">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-700">Content</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreview(!isPreview)}
                      className="border-slate-200"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {isPreview ? "Edit" : "Preview"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your post title..."
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>

                  {!isPreview ? (
                    <>
                      {/* Formatting Toolbar */}
                      <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded-lg border">
                        <Button variant="ghost" size="sm" onClick={() => formatText("bold")} className="h-8 w-8 p-0">
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => formatText("italic")} className="h-8 w-8 p-0">
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => formatText("quote")} className="h-8 w-8 p-0">
                          <Quote className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-6 bg-slate-300" />
                        <span className="text-xs text-slate-500">Markdown supported</span>
                      </div>

                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Write your content here... You can use Markdown formatting."
                          className="min-h-[400px] border-rose-200 focus:border-rose-400 resize-none"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="min-h-[400px] p-4 bg-slate-50 rounded-lg border">
                      <h2 className="text-2xl font-bold text-slate-700 mb-4">{title || "Untitled"}</h2>
                      <div className="prose prose-slate max-w-none">
                        {content ? (
                          <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">{content}</pre>
                        ) : (
                          <p className="text-slate-500 italic">No content yet...</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <Card className="border-slate-100 bg-white/80">
                <CardHeader>
                  <CardTitle className="text-slate-700">Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="type">Post Type</Label>
                    <Select value={postType} onValueChange={setPostType}>
                      <SelectTrigger className="border-rose-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poetry">Poetry</SelectItem>
                        <SelectItem value="literature">Literature Discussion</SelectItem>
                        <SelectItem value="resource">Language Resource</SelectItem>
                        <SelectItem value="cultural">Cultural Insight</SelectItem>
                        <SelectItem value="general">General Discussion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag..."
                        className="border-rose-200 focus:border-rose-400"
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button onClick={addTag} size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-rose-50 text-rose-600">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="ml-2 hover:text-rose-800">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="border-emerald-100 bg-emerald-50/50">
                <CardHeader>
                  <CardTitle className="text-emerald-700 text-sm">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-emerald-600 space-y-2">
                  <p>• Use **bold** and *italic* for emphasis</p>
                  <p>• Start lines with {">"} for quotes</p>
                  <p>• Add relevant tags to help others find your content</p>
                  <p>• Preview your post before publishing</p>
                </CardContent>
              </Card>

              {/* Community Guidelines */}
              <Card className="border-violet-100 bg-violet-50/50">
                <CardHeader>
                  <CardTitle className="text-violet-700 text-sm">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-violet-600 space-y-2">
                  <p>• Be respectful and supportive</p>
                  <p>• Share original content when possible</p>
                  <p>• Credit sources for resources</p>
                  <p>• Use appropriate language tags</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
