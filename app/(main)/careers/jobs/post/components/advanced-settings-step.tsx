"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Settings, Star, Calendar, User, AlertCircle, Crown } from "lucide-react"

interface AdvancedSettingsStepProps {
  data: {
    featured: boolean
    expires_at?: string
    hiring_manager_name: string
    hiring_manager_title: string
  }
  errors: Record<string, string>
  onChange: (updates: any) => void
}

export function AdvancedSettingsStep({ data, errors, onChange }: AdvancedSettingsStepProps) {
  // Calculate minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  // Calculate default expiry (30 days from now)
  const defaultExpiry = new Date()
  defaultExpiry.setDate(defaultExpiry.getDate() + 30)
  const defaultExpiryDate = defaultExpiry.toISOString().split("T")[0]

  return (
    <div className="space-y-6">
      {/* Posting Settings */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Posting Settings
          </CardTitle>
          <p className="text-gray-400">Configure how your job posting will be displayed</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Featured Posting */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  Featured Posting
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Premium</Badge>
                </h3>
                <p className="text-sm text-gray-400">Get 3x more visibility and appear at the top of search results</p>
              </div>
            </div>
            <Switch checked={data.featured} onCheckedChange={(checked) => onChange({ featured: checked })} />
          </div>

          {data.featured && (
            <Alert className="border-yellow-500/50 bg-yellow-500/10">
              <Star className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-400">
                <strong>Featured Benefits:</strong> Priority placement, highlighted badge, and inclusion in featured job
                emails to subscribers.
              </AlertDescription>
            </Alert>
          )}

          {/* Expiry Date */}
          <div className="space-y-3">
            <Label htmlFor="expires_at" className="text-white font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Application Deadline (Optional)
            </Label>
            <Input
              id="expires_at"
              type="date"
              value={data.expires_at || ""}
              onChange={(e) => onChange({ expires_at: e.target.value })}
              min={minDate}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-sm text-gray-400">
              Leave empty for no deadline. Default recommendation: {defaultExpiryDate}
            </p>
            {!data.expires_at && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ expires_at: defaultExpiryDate })}
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  Set to 30 days
                </button>
                <span className="text-gray-500">|</span>
                <button
                  type="button"
                  onClick={() => {
                    const sixtyDays = new Date()
                    sixtyDays.setDate(sixtyDays.getDate() + 60)
                    onChange({ expires_at: sixtyDays.toISOString().split("T")[0] })
                  }}
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  Set to 60 days
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hiring Manager Information */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-green-400" />
            Hiring Manager Information
          </CardTitle>
          <p className="text-gray-400">This information will be visible to candidates</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hiring Manager Name */}
          <div className="space-y-2">
            <Label htmlFor="hiring_manager_name" className="text-white font-medium">
              Hiring Manager Name *
            </Label>
            <Input
              id="hiring_manager_name"
              value={data.hiring_manager_name}
              onChange={(e) => onChange({ hiring_manager_name: e.target.value })}
              placeholder="e.g., Sarah Johnson"
              className={`bg-gray-800 border-gray-700 text-white ${errors.hiring_manager_name ? "border-red-500" : ""}`}
            />
            {errors.hiring_manager_name && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">{errors.hiring_manager_name}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Hiring Manager Title */}
          <div className="space-y-2">
            <Label htmlFor="hiring_manager_title" className="text-white font-medium">
              Hiring Manager Title *
            </Label>
            <Input
              id="hiring_manager_title"
              value={data.hiring_manager_title}
              onChange={(e) => onChange({ hiring_manager_title: e.target.value })}
              placeholder="e.g., VP of Engineering"
              className={`bg-gray-800 border-gray-700 text-white ${
                errors.hiring_manager_title ? "border-red-500" : ""
              }`}
            />
            {errors.hiring_manager_title && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">{errors.hiring_manager_title}</AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-gray-400">This helps candidates understand who they'll be working with</p>
          </div>

          {/* Preview Card */}
          {data.hiring_manager_name && data.hiring_manager_title && (
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-2">Preview:</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  {data.hiring_manager_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">{data.hiring_manager_name}</p>
                  <p className="text-sm text-gray-400">{data.hiring_manager_title}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings Summary */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">Settings Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Featured Posting:</span>
              <Badge className={data.featured ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}>
                {data.featured ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Application Deadline:</span>
              <span className="text-white">
                {data.expires_at ? new Date(data.expires_at).toLocaleDateString() : "No deadline"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hiring Manager:</span>
              <span className="text-white">{data.hiring_manager_name || "Not set"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Manager Title:</span>
              <span className="text-white">{data.hiring_manager_title || "Not set"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
