"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Flower, Leaf, Save, AlertCircle, CheckCircle, Upload, X, Plus } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, getProfile, updateProfile } from "@/lib/auth"

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
}

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [newLearningLang, setNewLearningLang] = useState("")
  const [newNativeLang, setNewNativeLang] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        window.location.href = "/login"
        return
      }

      const { data, error } = await getProfile(user.id)
      if (error) throw error

      setProfile(data)
    } catch (error) {
      console.error("Error loading profile:", error)
      setMessage({ type: "error", text: "Failed to load profile" })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const updates = {
      full_name: formData.get("full_name") as string,
      username: formData.get("username") as string,
      bio: formData.get("bio") as string,
      location: formData.get("location") as string,
      website: formData.get("website") as string,
      languages_learning: profile.languages_learning,
      languages_native: profile.languages_native,
    }

    try {
      const { data, error } = await updateProfile(profile.id, updates)
      if (error) throw error

      setProfile(data)
      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update profile" })
    } finally {
      setSaving(false)
    }
  }

  const addLanguage = (type: "learning" | "native") => {
    if (!profile) return

    const newLang = type === "learning" ? newLearningLang : newNativeLang
    if (!newLang.trim()) return

    const currentLangs = type === "learning" ? profile.languages_learning || [] : profile.languages_native || []

    if (currentLangs.includes(newLang.trim())) return

    const updatedProfile = {
      ...profile,
      [type === "learning" ? "languages_learning" : "languages_native"]: [...currentLangs, newLang.trim()],
    }

    setProfile(updatedProfile)

    if (type === "learning") {
      setNewLearningLang("")
    } else {
      setNewNativeLang("")
    }
  }

  const removeLanguage = (type: "learning" | "native", langToRemove: string) => {
    if (!profile) return

    const currentLangs = type === "learning" ? profile.languages_learning || [] : profile.languages_native || []
    const updatedLangs = currentLangs.filter((lang) => lang !== langToRemove)

    const updatedProfile = {
      ...profile,
      [type === "learning" ? "languages_learning" : "languages_native"]: updatedLangs,
    }

    setProfile(updatedProfile)
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
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-4">Please log in to access your profile settings.</p>
          <Link href="/login">
            <Button>Sign In</Button>
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
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Flower className="h-6 w-6 text-rose-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                Linguista
              </span>
              <Leaf className="h-4 w-4 text-emerald-400" />
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-rose-500 transition-colors">
                Dashboard
              </Link>
              <Link
                href={`/profile/${profile.username || profile.id}`}
                className="text-slate-600 hover:text-rose-500 transition-colors"
              >
                View Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-700 mb-2">Profile Settings</h1>
            <p className="text-slate-600">Manage your profile information and preferences.</p>
          </div>

          {message && (
            <Alert
              className={`mb-6 ${message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
            >
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={message.type === "error" ? "text-red-700" : "text-green-700"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <Card className="border-slate-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-slate-700">Profile Picture</CardTitle>
                <CardDescription>Upload a profile picture to personalize your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback className="bg-rose-100 text-rose-600 text-xl">
                      {profile.full_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" className="mb-2 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-sm text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-slate-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-slate-700">Basic Information</CardTitle>
                <CardDescription>Your public profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      defaultValue={profile.full_name || ""}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      defaultValue={profile.username || ""}
                      placeholder="Choose a unique username"
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile.bio || ""}
                    placeholder="Tell us about yourself, your language learning journey, or interests..."
                    className="border-rose-200 focus:border-rose-400 min-h-[100px]"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      defaultValue={profile.location || ""}
                      placeholder="City, Country"
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      defaultValue={profile.website || ""}
                      placeholder="https://your-website.com"
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-slate-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-slate-700">Languages</CardTitle>
                <CardDescription>Share the languages you speak and are learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Native Languages */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">Native Languages</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.languages_native?.map((lang) => (
                      <Badge key={lang} className="bg-emerald-100 text-emerald-700">
                        {lang}
                        <button
                          type="button"
                          onClick={() => removeLanguage("native", lang)}
                          className="ml-2 hover:text-emerald-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newNativeLang}
                      onChange={(e) => setNewNativeLang(e.target.value)}
                      placeholder="Add native language..."
                      className="border-emerald-200 focus:border-emerald-400"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage("native"))}
                    />
                    <Button type="button" onClick={() => addLanguage("native")} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Learning Languages */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">Learning Languages</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.languages_learning?.map((lang) => (
                      <Badge key={lang} className="bg-violet-100 text-violet-700">
                        {lang}
                        <button
                          type="button"
                          onClick={() => removeLanguage("learning", lang)}
                          className="ml-2 hover:text-violet-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newLearningLang}
                      onChange={(e) => setNewLearningLang(e.target.value)}
                      placeholder="Add learning language..."
                      className="border-violet-200 focus:border-violet-400"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage("learning"))}
                    />
                    <Button type="button" onClick={() => addLanguage("learning")} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/dashboard">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600"
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
