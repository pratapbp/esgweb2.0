"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, X, Send, Lightbulb, TrendingUp, Users, Target } from "lucide-react"

interface AIAssistantPanelProps {
  currentStep: number
  formData: any
  onSuggestion: (updates: any) => void
  onClose: () => void
}

const STEP_SUGGESTIONS = {
  0: {
    title: "Job Title Optimization",
    suggestions: [
      "Use specific, searchable titles like 'Senior React Developer' instead of 'Ninja Coder'",
      "Include seniority level in the title for better matching",
      "Consider adding key technologies to the title",
    ],
  },
  1: {
    title: "Description Enhancement",
    suggestions: [
      "Start with an engaging hook about your company culture",
      "Highlight growth opportunities and learning potential",
      "Mention specific projects or technologies they'll work with",
    ],
  },
  2: {
    title: "Requirements Optimization",
    suggestions: [
      "Separate must-have from nice-to-have requirements",
      "Be specific about years of experience needed",
      "Include both technical and soft skills",
    ],
  },
  3: {
    title: "Compensation Strategy",
    suggestions: [
      "Jobs with salary ranges get 30% more applications",
      "Research market rates for similar positions",
      "Highlight unique benefits that set you apart",
    ],
  },
  4: {
    title: "Final Optimization",
    suggestions: [
      "Featured jobs get 3x more visibility",
      "Set a reasonable application deadline",
      "Include hiring manager info for personal touch",
    ],
  },
}

export function AIAssistantPanel({ currentStep, formData, onSuggestion, onClose }: AIAssistantPanelProps) {
  const [query, setQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const currentSuggestions = STEP_SUGGESTIONS[currentStep as keyof typeof STEP_SUGGESTIONS] || STEP_SUGGESTIONS[0]

  const handleAIGenerate = async () => {
    setIsGenerating(true)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI suggestions based on current step
    if (currentStep === 0 && query.toLowerCase().includes("title")) {
      onSuggestion({
        title: "Senior Full Stack Engineer - React & Node.js",
      })
    } else if (currentStep === 1 && query.toLowerCase().includes("description")) {
      onSuggestion({
        description: `Join our innovative team where you'll work on cutting-edge projects that impact millions of users worldwide. We're looking for a passionate developer who thrives in a collaborative environment and loves solving complex technical challenges.

In this role, you'll have the opportunity to work with modern technologies, contribute to architectural decisions, and mentor junior developers. Our company culture emphasizes continuous learning, work-life balance, and professional growth.

You'll be part of a diverse, inclusive team that values different perspectives and encourages innovation. We offer flexible work arrangements, comprehensive benefits, and the chance to make a real impact on our product and users.`,
      })
    }

    setIsGenerating(false)
    setQuery("")
  }

  const applyQuickSuggestion = (suggestion: string) => {
    if (currentStep === 0) {
      onSuggestion({ title: suggestion })
    } else if (currentStep === 1) {
      onSuggestion({
        responsibilities: [...formData.responsibilities.filter(Boolean), suggestion],
      })
    }
  }

  return (
    <Card className="bg-gradient-to-b from-purple-900/20 to-blue-900/20 border-purple-500/30 sticky top-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Step Suggestions */}
        <div className="space-y-3">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            {currentSuggestions.title}
          </h4>
          <div className="space-y-2">
            {currentSuggestions.suggestions.map((suggestion, index) => (
              <div key={index} className="text-sm text-gray-300 p-2 bg-gray-800/50 rounded">
                • {suggestion}
              </div>
            ))}
          </div>
        </div>

        {/* AI Query Input */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Ask AI for Help</h4>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'Help me write a better job title' or 'Suggest responsibilities for this role'"
            className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
          />
          <Button
            onClick={handleAIGenerate}
            disabled={!query.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent"
              onClick={() => {
                // Generate market insights
                onSuggestion({
                  ai_generated_summary:
                    "This role offers competitive compensation and excellent growth opportunities in a fast-paced environment.",
                })
              }}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Get Market Insights
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
              onClick={() => {
                // Optimize for candidates
                if (currentStep === 2) {
                  onSuggestion({
                    preferred_skills: [
                      ...formData.preferred_skills.filter(Boolean),
                      "Strong communication skills",
                      "Team collaboration experience",
                    ],
                  })
                }
              }}
            >
              <Users className="w-4 h-4 mr-2" />
              Optimize for Candidates
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent"
              onClick={() => {
                // Improve targeting
                onSuggestion({
                  ai_skill_tags: ["JavaScript", "React", "Node.js", "Full Stack", "Remote"],
                })
              }}
            >
              <Target className="w-4 h-4 mr-2" />
              Improve Targeting
            </Button>
          </div>
        </div>

        {/* AI Stats */}
        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/30">
          <h4 className="text-purple-400 font-medium mb-2">AI Insights</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Completion:</span>
              <span className="text-white">{Math.round(((currentStep + 1) / 6) * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Optimization Score:</span>
              <Badge className="bg-green-500/20 text-green-400">Good</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expected Applications:</span>
              <span className="text-white">15-25</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
