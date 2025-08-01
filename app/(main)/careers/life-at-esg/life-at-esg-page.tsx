"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Users,
  Heart,
  Zap,
  Globe,
  Award,
  Coffee,
  Gamepad2,
  Dumbbell,
  GraduationCap,
  Plane,
  Shield,
  Star,
  Quote,
  MapPin,
  Calendar,
  Briefcase,
  Building,
} from "lucide-react"
import Link from "next/link"

interface TeamMember {
  name: string
  role: string
  department: string
  location: string
  tenure: string
  avatar: string
  quote: string
  highlights: string[]
}

interface Benefit {
  category: string
  title: string
  description: string
  icon: any
  color: string
}

interface Office {
  city: string
  address: string
  employees: number
  image: string
  highlights: string[]
}

export default function LifeAtESGPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Chen",
      role: "Senior AI Engineer",
      department: "AI & Analytics",
      location: "San Francisco, CA",
      tenure: "3 years",
      avatar: "/placeholder-user.jpg",
      quote:
        "Working at ESGit has been transformative. The AI projects we work on are cutting-edge, and the team support is incredible.",
      highlights: ["Led 5 major AI implementations", "Mentored 12 junior developers", "Published 3 research papers"],
    },
    {
      name: "Marcus Rodriguez",
      role: "SAP Solutions Architect",
      department: "Enterprise Solutions",
      location: "New York, NY",
      tenure: "5 years",
      avatar: "/placeholder-user.jpg",
      quote:
        "The diversity of projects and clients keeps every day exciting. Plus, the learning opportunities are endless.",
      highlights: ["Architected solutions for Fortune 100", "SAP certified expert", "Team lead for 15+ consultants"],
    },
    {
      name: "Priya Patel",
      role: "Cloud Security Specialist",
      department: "Cybersecurity",
      location: "Austin, TX",
      tenure: "2 years",
      avatar: "/placeholder-user.jpg",
      quote: "ESGit's commitment to security excellence and innovation makes it the perfect place to grow my career.",
      highlights: ["Zero security incidents", "Implemented SOC 2 compliance", "Led security training programs"],
    },
  ]

  const benefits: Benefit[] = [
    {
      category: "Health & Wellness",
      title: "Comprehensive Health Coverage",
      description: "Medical, dental, vision, and mental health support with 100% premium coverage",
      icon: Heart,
      color: "text-red-400",
    },
    {
      category: "Health & Wellness",
      title: "Fitness & Wellness",
      description: "$200/month wellness stipend for gym, yoga, or fitness apps",
      icon: Dumbbell,
      color: "text-green-400",
    },
    {
      category: "Financial",
      title: "401(k) Matching",
      description: "6% company match with immediate vesting",
      icon: Shield,
      color: "text-blue-400",
    },
    {
      category: "Financial",
      title: "Stock Options",
      description: "Equity participation in company growth for all employees",
      icon: Award,
      color: "text-purple-400",
    },
    {
      category: "Learning & Growth",
      title: "Learning Budget",
      description: "$5,000 annual budget for courses, conferences, and certifications",
      icon: GraduationCap,
      color: "text-orange-400",
    },
    {
      category: "Learning & Growth",
      title: "Conference Attendance",
      description: "Attend major tech conferences with full expense coverage",
      icon: Users,
      color: "text-cyan-400",
    },
    {
      category: "Work-Life Balance",
      title: "Flexible PTO",
      description: "Unlimited paid time off with minimum 3 weeks encouraged",
      icon: Plane,
      color: "text-pink-400",
    },
    {
      category: "Work-Life Balance",
      title: "Remote Work",
      description: "Work from anywhere with flexible hybrid options",
      icon: Globe,
      color: "text-indigo-400",
    },
    {
      category: "Perks",
      title: "Free Meals",
      description: "Catered lunches, snacks, and premium coffee in all offices",
      icon: Coffee,
      color: "text-yellow-400",
    },
    {
      category: "Perks",
      title: "Game Rooms",
      description: "Fully equipped game rooms with consoles, arcade games, and pool tables",
      icon: Gamepad2,
      color: "text-green-400",
    },
  ]

  const offices: Office[] = [
    {
      city: "San Francisco",
      address: "123 Market Street, San Francisco, CA 94105",
      employees: 450,
      image: "/placeholder.jpg",
      highlights: ["Ocean views", "Rooftop terrace", "State-of-the-art AI lab", "Meditation room"],
    },
    {
      city: "New York",
      address: "456 Broadway, New York, NY 10013",
      employees: 380,
      image: "/placeholder.jpg",
      highlights: ["Manhattan skyline views", "Fitness center", "Innovation lab", "Collaboration spaces"],
    },
    {
      city: "Austin",
      address: "789 Congress Ave, Austin, TX 78701",
      employees: 220,
      image: "/placeholder.jpg",
      highlights: ["Downtown location", "Music room", "BBQ deck", "Bike storage"],
    },
  ]

  const benefitCategories = ["All", "Health & Wellness", "Financial", "Learning & Growth", "Work-Life Balance", "Perks"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[url('/interconnected-talent-network.png')] opacity-10" />

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Life at{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">ESGit</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Discover what makes ESGit an exceptional place to work. From cutting-edge projects to amazing benefits, see
            why our team loves what they do.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setActiveVideo("company-culture")}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Our Story
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              asChild
            >
              <Link href="/careers/jobs">
                <Briefcase className="w-5 h-5 mr-2" />
                View Open Positions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {activeVideo && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300">Company Culture Video</p>
                    <p className="text-slate-400 text-sm">Coming Soon</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveVideo(null)}
                  className="border-slate-600 text-slate-300 bg-transparent"
                >
                  Close Video
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Team Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Hear from Our Team</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Real stories from real people about what it's like to work at ESGit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-slate-700 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{member.name}</h3>
                      <p className="text-slate-400 text-sm">{member.role}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-slate-300 italic">"{member.quote}"</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {member.location}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {member.tenure} at ESGit
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Achievements:</h4>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {member.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Comprehensive Benefits</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We believe in taking care of our team with industry-leading benefits and perks
            </p>
          </div>

          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-slate-800 border-slate-700 mb-8">
              {benefitCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-slate-700 text-xs lg:text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {benefitCategories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits
                    .filter((benefit) => category === "All" || benefit.category === category)
                    .map((benefit, index) => (
                      <Card
                        key={index}
                        className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                              <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{benefit.title}</h3>
                              <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                {benefit.category}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-slate-400 text-sm">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Offices</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Beautiful workspaces designed for collaboration, creativity, and comfort
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <div className="aspect-video bg-slate-700 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Building className="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{office.city}</h3>
                  <p className="text-slate-400 text-sm mb-3">{office.address}</p>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                    <Users className="w-4 h-4" />
                    {office.employees} employees
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Office Highlights:</h4>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {office.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-blue-400" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl text-slate-300 mb-8">Experience the ESGit difference and build your career with us</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/careers/jobs">
                <Briefcase className="w-5 h-5 mr-2" />
                View Open Positions
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              asChild
            >
              <Link href="/contact">
                <Users className="w-5 h-5 mr-2" />
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
