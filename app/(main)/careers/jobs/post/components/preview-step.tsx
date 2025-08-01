"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  Edit,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Calendar,
  Star,
  Crown,
  CheckCircle,
  Briefcase,
} from "lucide-react"

interface PreviewStepProps {
  data: {
    title: string
    department: string
    location: string
    remote_type: "remote" | "hybrid" | "onsite"
    employment_type: "full-time" | "part-time" | "contract" | "internship"
    experience_level: "entry" | "mid" | "senior" | "executive"
    description: string
    responsibilities: string[]
    requirements: string[]
    preferred_skills: string[]
    technologies: string[]
    salary_min?: number
    salary_max?: number
    benefits: string[]
    featured: boolean
    expires_at?: string
    hiring_manager_name: string
    hiring_manager_title: string
  }
  onEdit: (stepIndex: number) => void
}

export function PreviewStep({ data, onEdit }: PreviewStepProps) {
  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getRemoteTypeLabel = (type: string) => {
    switch (type) {
      case "remote":
        return "Remote"
      case "hybrid":
        return "Hybrid"
      case "onsite":
        return "On-site"
      default:
        return type
    }
  }

  const getEmploymentTypeLabel = (type: string) => {
    switch (type) {
      case "full-time":
        return "Full-time"
      case "part-time":
        return "Part-time"
      case "contract":
        return "Contract"
      case "internship":
        return "Internship"
      default:
        return type
    }
  }

  const getExperienceLevelLabel = (level: string) => {
    switch (level) {
      case "entry":
        return "Entry Level"
      case "mid":
        return "Mid Level"
      case "senior":
        return "Senior Level"
      case "executive":
        return "Executive"
      default:
        return level
    }
  }

  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            Job Posting Preview
          </CardTitle>
          <p className="text-gray-400">This is how your job posting will appear to candidates</p>
        </CardHeader>
      </Card>

      {/* Job Preview Card */}
      <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-blue-500/50 transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{data.department}</Badge>
              <Badge variant="outline" className="border-gray-600 text-green-400">
                {getEmploymentTypeLabel(data.employment_type)}
              </Badge>
              {data.remote_type === "remote" && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Remote OK</Badge>
              )}
              {data.featured && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Crown className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => onEdit(0)} className="text-blue-400 hover:text-blue-300">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>

          <CardTitle className="text-white text-xl mb-2">{data.title}</CardTitle>

          <div className="flex items-center text-gray-400 text-sm">
            <Building className="h-4 w-4 mr-1" />
            {getExperienceLevelLabel(data.experience_level)}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-300">
              <MapPin className="h-4 w-4 mr-2 text-blue-400 flex-shrink-0" />
              <span>
                {data.location} • {getRemoteTypeLabel(data.remote_type)}
              </span>
            </div>

            {(data.salary_min || data.salary_max) && (
              <div className="flex items-center text-gray-300">
                <DollarSign className="h-4 w-4 mr-2 text-green-400 flex-shrink-0" />
                <span>
                  {data.salary_min && data.salary_max
                    ? `${formatSalary(data.salary_min)} - ${formatSalary(data.salary_max)}`
                    : data.salary_min
                      ? `From ${formatSalary(data.salary_min)}`
                      : `Up to ${formatSalary(data.salary_max!)}`}
                </span>
              </div>
            )}

            <div className="flex items-center text-gray-300">
              <Clock className="h-4 w-4 mr-2 text-purple-400 flex-shrink-0" />
              <span>{getEmploymentTypeLabel(data.employment_type)}</span>
            </div>

            {data.expires_at && (
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-orange-400 flex-shrink-0" />
                <span>Apply by {new Date(data.expires_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <Separator className="bg-gray-700 mb-6" />

          {/* Job Description */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Job Description</h3>
              <Button variant="ghost" size="sm" onClick={() => onEdit(1)} className="text-blue-400 hover:text-blue-300">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{data.description}</p>
          </div>

          {/* Key Responsibilities */}
          {data.responsibilities.filter(Boolean).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {data.responsibilities.filter(Boolean).map((responsibility, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {data.requirements.filter(Boolean).length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Requirements</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(2)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              <ul className="space-y-2">
                {data.requirements.filter(Boolean).map((requirement, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preferred Skills */}
          {data.preferred_skills.filter(Boolean).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Preferred Skills</h3>
              <ul className="space-y-2">
                {data.preferred_skills.filter(Boolean).map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <Star className="w-4 h-4 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {data.technologies.filter(Boolean).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {data.technologies.filter(Boolean).map((tech, index) => (
                  <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {data.benefits.filter(Boolean).length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Benefits & Perks</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(3)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.benefits.filter(Boolean).map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="bg-gray-700 mb-6" />

          {/* Hiring Manager */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Hiring Manager</h3>
              <Button variant="ghost" size="sm" onClick={() => onEdit(4)} className="text-blue-400 hover:text-blue-300">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                {data.hiring_manager_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium">{data.hiring_manager_name}</p>
                <p className="text-gray-400">{data.hiring_manager_title}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-700">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1">
              <Briefcase className="w-4 h-4 mr-2" />
              Apply Now
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
              <Star className="w-4 h-4 mr-2" />
              Save Job
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
