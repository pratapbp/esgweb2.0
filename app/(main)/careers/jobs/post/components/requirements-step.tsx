"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Plus, X, Star, Code, AlertCircle, Lightbulb } from "lucide-react"

interface RequirementsStepProps {
  data: {
    requirements: string[]
    preferred_skills: string[]
    technologies: string[]
  }
  errors: Record<string, string>
  onChange: (updates: any) => void
}

const COMMON_TECHNOLOGIES = [
  // Programming Languages
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  // Frontend
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Svelte",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "SASS",
  // Backend
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "ASP.NET",
  "Laravel",
  "Ruby on Rails",
  // Databases
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Elasticsearch",
  "SQLite",
  "Oracle",
  "SQL Server",
  // Cloud & DevOps
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitLab CI",
  "Terraform",
  // AI/ML
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "Pandas",
  "NumPy",
  "OpenAI",
  "Hugging Face",
  // Other
  "Git",
  "Linux",
  "Agile",
  "Scrum",
  "REST APIs",
  "GraphQL",
  "Microservices",
]

const REQUIREMENT_EXAMPLES = [
  "Bachelor's degree in Computer Science or related field",
  "3+ years of professional software development experience",
  "Strong problem-solving and analytical skills",
  "Excellent written and verbal communication skills",
  "Experience with agile development methodologies",
  "Ability to work independently and in team environments",
]

const PREFERRED_SKILL_EXAMPLES = [
  "Master's degree or advanced certifications",
  "Experience with cloud platforms (AWS, Azure, GCP)",
  "Knowledge of DevOps practices and tools",
  "Previous startup or fast-paced environment experience",
  "Open source contributions",
  "Industry-specific domain knowledge",
]

export function RequirementsStep({ data, errors, onChange }: RequirementsStepProps) {
  const [newRequirement, setNewRequirement] = useState("")
  const [newPreferredSkill, setNewPreferredSkill] = useState("")
  const [newTechnology, setNewTechnology] = useState("")

  const addItem = (type: "requirements" | "preferred_skills" | "technologies", value: string) => {
    if (value.trim()) {
      const currentItems = data[type].filter(Boolean)
      const updatedItems = [...currentItems, value.trim()]
      onChange({ [type]: updatedItems })

      // Clear the input
      if (type === "requirements") setNewRequirement("")
      else if (type === "preferred_skills") setNewPreferredSkill("")
      else if (type === "technologies") setNewTechnology("")
    }
  }

  const removeItem = (type: "requirements" | "preferred_skills" | "technologies", index: number) => {
    const updatedItems = data[type].filter((_, i) => i !== index)
    onChange({ [type]: updatedItems })
  }

  const updateItem = (type: "requirements" | "preferred_skills" | "technologies", index: number, value: string) => {
    const updatedItems = [...data[type]]
    updatedItems[index] = value
    onChange({ [type]: updatedItems })
  }

  const addTechnology = (tech: string) => {
    if (!data.technologies.includes(tech)) {
      const updatedTechnologies = [...data.technologies.filter(Boolean), tech]
      onChange({ technologies: updatedTechnologies })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            Requirements & Skills
          </CardTitle>
          <p className="text-gray-400">Define what candidates need to succeed in this role</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="requirements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="requirements" className="data-[state=active]:bg-blue-600">
                Must-Have Requirements
              </TabsTrigger>
              <TabsTrigger value="preferred" className="data-[state=active]:bg-green-600">
                Nice-to-Have Skills
              </TabsTrigger>
              <TabsTrigger value="technologies" className="data-[state=active]:bg-purple-600">
                Technologies
              </TabsTrigger>
            </TabsList>

            {/* Required Skills */}
            <TabsContent value="requirements" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-red-400" />
                <h3 className="text-white font-medium">Essential Requirements</h3>
                <Badge variant="outline" className="border-red-500/50 text-red-400">
                  Must Have
                </Badge>
              </div>

              {/* Existing Requirements */}
              <div className="space-y-3">
                {data.requirements.filter(Boolean).map((requirement, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <Input
                      value={requirement}
                      onChange={(e) => updateItem("requirements", index, e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white flex-1"
                      placeholder="Enter a requirement..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("requirements", index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add New Requirement */}
              <div className="flex gap-3 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add a new requirement..."
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                  onKeyPress={(e) => e.key === "Enter" && addItem("requirements", newRequirement)}
                />
                <Button
                  onClick={() => addItem("requirements", newRequirement)}
                  disabled={!newRequirement.trim()}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {errors.requirements && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">{errors.requirements}</AlertDescription>
                </Alert>
              )}

              {/* Suggestions */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Common Requirements:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {REQUIREMENT_EXAMPLES.map((example) => (
                    <Badge
                      key={example}
                      variant="outline"
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 cursor-pointer"
                      onClick={() => setNewRequirement(example)}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Preferred Skills */}
            <TabsContent value="preferred" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-medium">Preferred Skills</h3>
                <Badge variant="outline" className="border-green-500/50 text-green-400">
                  Nice to Have
                </Badge>
              </div>

              {/* Existing Preferred Skills */}
              <div className="space-y-3">
                {data.preferred_skills.filter(Boolean).map((skill, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <Input
                      value={skill}
                      onChange={(e) => updateItem("preferred_skills", index, e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white flex-1"
                      placeholder="Enter a preferred skill..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("preferred_skills", index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add New Preferred Skill */}
              <div className="flex gap-3 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
                <Input
                  value={newPreferredSkill}
                  onChange={(e) => setNewPreferredSkill(e.target.value)}
                  placeholder="Add a preferred skill..."
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                  onKeyPress={(e) => e.key === "Enter" && addItem("preferred_skills", newPreferredSkill)}
                />
                <Button
                  onClick={() => addItem("preferred_skills", newPreferredSkill)}
                  disabled={!newPreferredSkill.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Suggestions */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Preferred Skill Examples:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {PREFERRED_SKILL_EXAMPLES.map((example) => (
                    <Badge
                      key={example}
                      variant="outline"
                      className="border-green-500/50 text-green-400 hover:bg-green-500/10 cursor-pointer"
                      onClick={() => setNewPreferredSkill(example)}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Technologies */}
            <TabsContent value="technologies" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-purple-400" />
                <h3 className="text-white font-medium">Technologies & Tools</h3>
                <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                  Tech Stack
                </Badge>
              </div>

              {/* Selected Technologies */}
              {data.technologies.filter(Boolean).length > 0 && (
                <div className="space-y-2">
                  <Label className="text-white font-medium">Selected Technologies:</Label>
                  <div className="flex flex-wrap gap-2">
                    {data.technologies.filter(Boolean).map((tech, index) => (
                      <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/50 pr-1">
                        {tech}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem("technologies", index)}
                          className="ml-1 h-4 w-4 p-0 text-purple-400 hover:text-purple-300"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Custom Technology */}
              <div className="flex gap-3 items-center">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a custom technology..."
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                  onKeyPress={(e) => e.key === "Enter" && addItem("technologies", newTechnology)}
                />
                <Button
                  onClick={() => addItem("technologies", newTechnology)}
                  disabled={!newTechnology.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Common Technologies */}
              <div className="space-y-4">
                <Label className="text-white font-medium">Or select from common technologies:</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {COMMON_TECHNOLOGIES.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className={`cursor-pointer transition-all ${
                        data.technologies.includes(tech)
                          ? "border-purple-500 bg-purple-500/20 text-purple-400"
                          : "border-gray-600 text-gray-400 hover:border-purple-500/50 hover:text-purple-400"
                      }`}
                      onClick={() => addTechnology(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Summary */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Requirements Summary:</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-red-400">Must-Have:</span>
                <span className="text-white ml-2">{data.requirements.filter(Boolean).length}</span>
              </div>
              <div>
                <span className="text-green-400">Nice-to-Have:</span>
                <span className="text-white ml-2">{data.preferred_skills.filter(Boolean).length}</span>
              </div>
              <div>
                <span className="text-purple-400">Technologies:</span>
                <span className="text-white ml-2">{data.technologies.filter(Boolean).length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
