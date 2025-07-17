"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Flower, Leaf, Save, AlertCircle, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"
import { updatePassword } from "@/lib/auth"

export default function PasswordSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const newPassword = formData.get("new_password") as string
    const confirmPassword = formData.get("confirm_password") as string

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long" })
      setLoading(false)
      return
    }

    try {
      const { error } = await updatePassword(newPassword)
      if (error) throw error

      setMessage({ type: "success", text: "Password updated successfully!" })

      // Reset form
      const form = e.currentTarget
      form.reset()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update password" })
    } finally {
      setLoading(false)
    }
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
              <Link href="/settings/profile" className="text-slate-600 hover:text-rose-500 transition-colors">
                Profile Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-violet-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-slate-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-700 mb-2">Change Password</h1>
            <p className="text-slate-600">Update your account password for better security.</p>
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

          <Card className="border-slate-100 bg-white/80">
            <CardHeader>
              <CardTitle className="text-slate-700">New Password</CardTitle>
              <CardDescription>Choose a strong password to protect your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    name="new_password"
                    type="password"
                    placeholder="Enter new password"
                    className="border-rose-200 focus:border-rose-400"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm new password"
                    className="border-rose-200 focus:border-rose-400"
                    required
                    minLength={6}
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• At least 6 characters long</li>
                    <li>• Mix of letters and numbers recommended</li>
                    <li>• Avoid common passwords</li>
                  </ul>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Link href="/dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600"
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
