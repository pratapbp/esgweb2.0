"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, X, Sparkles, AlertCircle, CheckCircle } from "lucide-react"

interface JobDescriptionStepProps {
  data: {
    description: string
    responsibilities: string[]
  }
  errors: Record<string, string>
  onChange: (updates: any) => void
}

export function JobDescriptionStep({ data, errors, onChange }: JobDescriptionStepProps) {
  const [newResponsibility, setNewResponsibility] = useState("")

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      const updatedResponsibilities = [...data.responsibilities.filter(Boolean), newResponsibility.trim()]
      onChange({ responsibilities: updatedResponsibilities })
      setNewResponsibility("")
    }
  }

  const removeResponsibility = (index: number) => {
    const updatedResponsibilities = data.responsibilities.filter((_, i) => i !== index)
    onChange({ responsibilities: updatedResponsibilities })
  }

  const updateResponsibility = (index: number, value: string) => {
    const updatedResponsibilities = [...data.responsibilities]
    updatedResponsibilities[index] = value
    onChange({ responsibilities: updatedResponsibilities })
  }

  const generateAIDescription = async () => {
    // TODO: Implement AI description generation
    const sampleDescription = `We are seeking a talented professional to join our dynamic team. This role offers an exciting opportunity to work on cutting-edge projects while contributing to our company's growth and success.

In this position, you will collaborate with cross-functional teams to deliver high-quality solutions that meet our clients' needs. You'll have the chance to work with modern technologies and methodologies while being supported by experienced colleagues who are passionate about innovation and excellence.

The ideal candidate will bring fresh perspectives and creative problem-solving skills to help us tackle complex challenges. We value continuous learning and provide opportunities for professional development to help you advance your career.`

    onChange({ description: sampleDescription })
  }

  const wordCount = data.description.length
  const minWords = 50
  const isDescriptionValid = wordCount >= minWords

  return (
    <div className="space-y-6">
      {/* Job Description */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Job Description
              </CardTitle>
              <p className="text-gray-400 mt-1">Provide a compelling overview of the role and your company</p>
            </div>
            <Button
              variant="outline"
              onClick={generateAIDescription}
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-white font-medium">
                Description *
              </Label>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isDescriptionValid ? "text-green-400" : "text-gray-400"}`}>
                  {wordCount}/{minWords} characters
                </span>
                {isDescriptionValid && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
            </div>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Describe the role, company culture, and what makes this opportunity exciting..."
              className={`bg-gray-800 border-gray-700 text-white min-h-[200px] ${
                errors.description ? "border-red-500" : isDescriptionValid ? "border-green-500" : ""
              }`}
            />
            {errors.description && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">{errors.description}</AlertDescription>
              </Alert>
            )}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">💡 Writing Tips:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Start with an engaging hook about your company or the role</li>
                <li>• Highlight what makes this opportunity unique</li>
                <li>• Mention growth opportunities and learning potential</li>
                <li>• Keep it conversational and authentic</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Responsibilities */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Key Responsibilities
          </CardTitle>
          <p className="text-gray-400">List the main duties and responsibilities for this role</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing Responsibilities */}
          <div className="space-y-3">
            {data.responsibilities.filter(Boolean).map((responsibility, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <Input
                  value={responsibility}
                  onChange={(e) => updateResponsibility(index, e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                  placeholder="Enter a key responsibility..."
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeResponsibility(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add New Responsibility */}
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
            <Input
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              placeholder="Add a new responsibility..."
              className="bg-gray-800 border-gray-700 text-white flex-1"
              onKeyPress={(e) => e.key === "Enter" && addResponsibility()}
            />
            <Button
              onClick={addResponsibility}
              disabled={!newResponsibility.trim()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {errors.responsibilities && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{errors.responsibilities}</AlertDescription>
            </Alert>
          )}

          {/* Suggestions */}
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
            <h4 className="text-blue-400 font-medium mb-2">💡 Responsibility Examples:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Lead cross-functional project teams",
                "Develop and maintain software applications",
                "Collaborate with stakeholders on requirements",
                "Mentor junior team members",
                "Participate in code reviews and technical discussions",
                "Analyze and optimize system performance",
              ].map((example) => (
                <Badge
                  key={example}
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 cursor-pointer"
                  onClick={() => setNewResponsibility(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <strong>Current count:</strong> {data.responsibilities.filter(Boolean).length} responsibilities
            {data.responsibilities.filter(Boolean).length < 3 && (
              <span className="text-yellow-400 ml-2">(Recommended: 3-7 responsibilities)</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
