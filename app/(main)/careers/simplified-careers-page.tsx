"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Globe,
  Award,
  TrendingUp,
  MapPin,
  DollarSign,
  ArrowRight,
  Heart,
  Coffee,
  Zap,
  Shield,
} from "lucide-react"
import Link from "next/link"

const companyStats = [
  { label: "Team Members", value: "2,500+", icon: Users },
  { label: "Global Offices", value: "15", icon: Globe },
  { label: "Client Success Rate", value: "98%", icon: Award },
  { label: "Years of Growth", value: "12+", icon: TrendingUp },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible hours, remote work options, and unlimited PTO policy",
  },
  {
    icon: Zap,
    title: "Professional Growth",
    description: "Learning stipends, conference attendance, and career development programs",
  },
  {
    icon: Shield,
    title: "Financial Security",
    description: "Competitive salary, equity options, 401k matching, and performance bonuses",
  },
]

const featuredJobs = [
  {
    id: "1",
    title: "Senior SAP Consultant",
    department: "Consulting",
    location: "Remote - USA",
    type: "Full-Time",
    salary: "$120,000 - $160,000",
    tags: ["SAP", "S/4HANA", "Remote"],
  },
  {
    id: "2",
    title: "AI Solutions Architect",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-Time",
    salary: "$140,000 - $180,000",
    tags: ["AI", "Machine Learning", "Python"],
  },
  {
    id: "3",
    title: "Cloud Infrastructure Engineer",
    department: "DevOps",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "$110,000 - $145,000",
    tags: ["AWS", "Kubernetes", "DevOps"],
  },
]

export default function SimplifiedCareersPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"
          style={{
            backgroundImage: `url("https://sjc.microlink.io/-Ad1_yUrc5aTuGsLv1YFdxO7aBbj1XQBp6GLwB7qvLE-8bp8-0LmgTt_8lFpvkDZemgUgjzTVSWaz1c5Bidubw.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Build the Future with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ESGit</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our mission to shape a smarter, more sustainable future through innovative SAP solutions and
              cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers/jobs">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  View Open Roles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/careers/lca-postings">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  LCA Postings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {companyStats.map((stat, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Culture & Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose ESGit?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We believe in creating an environment where innovation thrives and our team members can do their best
              work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-colors">
                <CardHeader>
                  <benefit.icon className="w-8 h-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Current Openings</h2>
              <p className="text-gray-400">Join our growing team of innovators</p>
            </div>
            <Link href="/careers/jobs">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card
                key={job.id}
                className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-colors group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/careers/jobs/${job.id}`}>
                      <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Make an Impact?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join ESGit and be part of a team that's transforming businesses through innovative SAP solutions and
              cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers/jobs">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Explore Opportunities
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
