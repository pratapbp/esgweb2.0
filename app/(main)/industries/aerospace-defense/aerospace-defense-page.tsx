"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plane,
  Rocket,
  Shield,
  Radar,
  Satellite,
  Globe,
  TrendingUp,
  Users,
  DollarSign,
  ChevronRight,
  Star,
  Target,
  Cpu,
  Lock,
  Fuel,
  Bot,
} from "lucide-react"

const AerospaceDefensePage = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const industryStats = [
    { label: "Global Market Size", value: "$838B", growth: "+3.8%", icon: DollarSign },
    { label: "Global Employment", value: "3.7M+", growth: "+2.1%", icon: Users },
    { label: "R&D Investment", value: "$95B", growth: "+5.2%", icon: TrendingUp },
    { label: "Countries Involved", value: "195+", growth: "Stable", icon: Globe },
  ]

  const keySegments = [
    {
      title: "Commercial Aviation",
      icon: Plane,
      marketSize: "$181B",
      growth: "+4.2%",
      description: "Passenger and cargo aircraft manufacturing, maintenance, and services",
      keyPlayers: ["Boeing", "Airbus", "Embraer", "Bombardier"],
      examples: ["Boeing 787 Dreamliner", "Airbus A350", "Boeing 737 MAX", "Airbus A320neo"],
    },
    {
      title: "Military Aviation",
      icon: Shield,
      marketSize: "$127B",
      growth: "+3.1%",
      description: "Fighter jets, transport aircraft, helicopters, and military drones",
      keyPlayers: ["Lockheed Martin", "Boeing Defense", "Northrop Grumman", "BAE Systems"],
      examples: ["F-35 Lightning II", "F-22 Raptor", "B-21 Raider", "Apache AH-64"],
    },
    {
      title: "Space Systems",
      icon: Rocket,
      marketSize: "$469B",
      growth: "+8.7%",
      description: "Satellites, launch vehicles, space stations, and exploration missions",
      keyPlayers: ["SpaceX", "Blue Origin", "NASA", "ESA", "Boeing", "Lockheed Martin"],
      examples: ["Falcon Heavy", "Starship", "James Webb Telescope", "ISS"],
    },
    {
      title: "Defense Systems",
      icon: Radar,
      marketSize: "$61B",
      growth: "+4.8%",
      description: "Missile defense, radar systems, electronic warfare, and cybersecurity",
      keyPlayers: ["Raytheon", "Lockheed Martin", "Northrop Grumman", "General Dynamics"],
      examples: ["THAAD", "Patriot", "AEGIS", "Iron Dome"],
    },
  ]

  const challenges = [
    {
      title: "Technological Innovation",
      description: "Rapid advancement in hypersonic flight, AI integration, and advanced materials",
      impact: "High",
      solutions: ["Increased R&D investment", "Public-private partnerships", "International collaboration"],
      examples: ["Hypersonic weapons development", "AI-powered autonomous systems", "Carbon fiber composites"],
    },
    {
      title: "Regulatory Compliance",
      description: "Complex international regulations including ITAR, export controls, and safety standards",
      impact: "Critical",
      solutions: ["Compliance automation", "Regulatory expertise", "Government liaison"],
      examples: ["ITAR compliance for defense exports", "FAA certification processes", "International space law"],
    },
    {
      title: "Global Competition",
      description: "Intense competition from emerging markets and geopolitical tensions",
      impact: "High",
      solutions: ["Strategic partnerships", "Innovation focus", "Market diversification"],
      examples: ["China's COMAC C919", "European defense consolidation", "India's space program"],
    },
    {
      title: "Supply Chain Complexity",
      description: "Global supply chains with critical dependencies and security concerns",
      impact: "Critical",
      solutions: ["Supply chain resilience", "Domestic sourcing", "Risk management"],
      examples: ["Semiconductor shortages", "Rare earth materials", "Titanium supply chains"],
    },
  ]

  const caseStudies = [
    {
      company: "Lockheed Martin",
      project: "F-35 Lightning II Program",
      investment: "$1.7T",
      impact: "Revolutionary stealth fighter with advanced sensor fusion",
      details:
        "The F-35 program represents the largest defense acquisition in history, featuring cutting-edge stealth technology, advanced avionics, and unprecedented international collaboration with 15 partner nations.",
      technologies: ["Stealth coating", "Sensor fusion", "Advanced radar", "Electronic warfare"],
      results: ["3,000+ aircraft delivered", "15 international partners", "Advanced manufacturing techniques"],
    },
    {
      company: "SpaceX",
      project: "Falcon 9 Reusability",
      investment: "$1B+",
      impact: "Revolutionized space launch economics with reusable rockets",
      details:
        "SpaceX's development of reusable rocket technology has reduced launch costs by over 90%, making space more accessible and enabling new commercial opportunities.",
      technologies: ["Reusable boosters", "Autonomous landing", "Rapid turnaround", "Advanced propulsion"],
      results: ["200+ successful landings", "90% cost reduction", "Market leadership in launches"],
    },
    {
      company: "Boeing",
      project: "787 Dreamliner Development",
      investment: "$32B",
      impact: "Advanced composite aircraft with 20% fuel efficiency improvement",
      details:
        "The 787 Dreamliner introduced revolutionary composite materials and advanced systems, setting new standards for fuel efficiency and passenger comfort in commercial aviation.",
      technologies: ["Carbon fiber composites", "Advanced engines", "Fly-by-wire", "Smart systems"],
      results: ["1,000+ aircraft delivered", "20% fuel savings", "New route possibilities"],
    },
    {
      company: "Raytheon",
      project: "THAAD Missile Defense",
      investment: "$15B",
      impact: "Advanced ballistic missile defense system protecting allied nations",
      details:
        "The Terminal High Altitude Area Defense system provides critical protection against ballistic missile threats, with deployments in multiple countries and a perfect intercept record in testing.",
      technologies: ["Hit-to-kill technology", "Advanced radar", "Command systems", "Mobile launchers"],
      results: ["100% test success rate", "Multiple international deployments", "Enhanced regional security"],
    },
  ]

  const futureTrends = [
    {
      trend: "Autonomous Systems",
      icon: Bot,
      timeline: "2024-2030",
      description: "AI-powered autonomous aircraft, drones, and space systems",
      impact: "Revolutionary",
      examples: ["Autonomous fighter jets", "Self-piloting cargo aircraft", "Robotic space missions"],
      marketPotential: "$127B by 2030",
    },
    {
      trend: "Sustainable Aviation",
      icon: Fuel,
      timeline: "2025-2035",
      description: "Electric aircraft, hydrogen propulsion, and sustainable aviation fuels",
      impact: "Transformative",
      examples: ["Electric regional aircraft", "Hydrogen-powered jets", "Biofuel adoption"],
      marketPotential: "$89B by 2035",
    },
    {
      trend: "Space Commercialization",
      icon: Satellite,
      timeline: "2024-2040",
      description: "Commercial space stations, asteroid mining, and space tourism",
      impact: "Game-changing",
      examples: ["Commercial LEO stations", "Space manufacturing", "Lunar bases"],
      marketPotential: "$1T+ by 2040",
    },
    {
      trend: "Cybersecurity Integration",
      icon: Lock,
      timeline: "2024-2028",
      description: "Advanced cyber defense for aerospace and defense systems",
      impact: "Critical",
      examples: ["Quantum encryption", "AI threat detection", "Secure communications"],
      marketPotential: "$45B by 2028",
    },
  ]

  const majorCompanies = [
    {
      name: "Boeing",
      revenue: "$66.6B",
      employees: "156,000",
      focus: "Commercial & Defense Aviation",
      marketCap: "$127B",
      keyProducts: ["737", "787", "F/A-18", "KC-46"],
      strengths: ["Commercial aviation leadership", "Defense contracts", "Global presence"],
    },
    {
      name: "Lockheed Martin",
      revenue: "$67.0B",
      employees: "116,000",
      focus: "Defense & Space Systems",
      marketCap: "$108B",
      keyProducts: ["F-35", "F-22", "THAAD", "Orion"],
      strengths: ["Advanced technology", "Defense expertise", "Space capabilities"],
    },
    {
      name: "Raytheon Technologies",
      revenue: "$64.4B",
      employees: "181,000",
      focus: "Defense & Commercial Aerospace",
      marketCap: "$95B",
      keyProducts: ["Patriot", "GTCP", "Pratt & Whitney engines"],
      strengths: ["Missile systems", "Engine technology", "Integrated solutions"],
    },
    {
      name: "Northrop Grumman",
      revenue: "$36.6B",
      employees: "95,000",
      focus: "Defense & Space Technology",
      marketCap: "$72B",
      keyProducts: ["B-21", "Global Hawk", "James Webb Telescope"],
      strengths: ["Stealth technology", "Space systems", "Autonomous platforms"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Aerospace & Defense Industry</Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Aerospace & Defense
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Driving national security, technological advancement, and global economic activity through cutting-edge
              aviation, space exploration, and defense systems
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="outline" className="text-lg py-2 px-4">
                <Plane className="w-4 h-4 mr-2" />
                Aviation
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4">
                <Rocket className="w-4 h-4 mr-2" />
                Space Systems
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4">
                <Shield className="w-4 h-4 mr-2" />
                Defense
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4">
                <Satellite className="w-4 h-4 mr-2" />
                Technology
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Statistics */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {stat.growth}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="segments">Key Segments</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="cases">Case Studies</TabsTrigger>
              <TabsTrigger value="future">Future Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Industry Definition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      The aerospace and defense industry encompasses the design, development, manufacturing, and
                      maintenance of aircraft, spacecraft, missiles, and related systems. This critical sector serves
                      both civilian and military markets, playing a vital role in national security, technological
                      advancement, and global economic activity.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Core Components:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Commercial and military aircraft manufacturing</li>
                        <li>• Space exploration and satellite systems</li>
                        <li>• Defense systems and missile technology</li>
                        <li>• Maintenance, repair, and overhaul (MRO) services</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Economic Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">$838B</div>
                        <div className="text-sm text-gray-600">Global Market Size</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">3.7M+</div>
                        <div className="text-sm text-gray-600">Global Jobs</div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      The aerospace and defense industry contributes significantly to global GDP, supporting millions of
                      high-skilled jobs and driving technological innovation across multiple sectors. The industry's R&D
                      investments often lead to breakthrough technologies with civilian applications.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Strategic Importance</CardTitle>
                  <CardDescription>
                    The aerospace and defense industry's role in national security and technological leadership
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-red-50 rounded-lg">
                      <Shield className="w-8 h-8 mx-auto mb-4 text-red-600" />
                      <h4 className="font-semibold text-gray-900 mb-2">National Security</h4>
                      <p className="text-gray-700 text-sm">
                        Critical defense capabilities protecting national interests and allied nations
                      </p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <Cpu className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 mb-2">Technology Leadership</h4>
                      <p className="text-gray-700 text-sm">
                        Driving innovation in materials, electronics, and advanced manufacturing
                      </p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <DollarSign className="w-8 h-8 mx-auto mb-4 text-green-600" />
                      <h4 className="font-semibold text-gray-900 mb-2">Economic Engine</h4>
                      <p className="text-gray-700 text-sm">
                        Supporting high-value manufacturing and export competitiveness
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="segments" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {keySegments.map((segment, index) => (
                  <motion.div
                    key={segment.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <segment.icon className="w-6 h-6 text-blue-600" />
                          {segment.title}
                        </CardTitle>
                        <div className="flex gap-4">
                          <Badge variant="outline">{segment.marketSize}</Badge>
                          <Badge className="bg-green-100 text-green-800">{segment.growth}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700">{segment.description}</p>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Players:</h4>
                          <div className="flex flex-wrap gap-2">
                            {segment.keyPlayers.map((player) => (
                              <Badge key={player} variant="secondary">
                                {player}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Notable Examples:</h4>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            {segment.examples.map((example) => (
                              <li key={example}>• {example}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-8">
              <div className="space-y-6">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-red-600" />
                            {challenge.title}
                          </CardTitle>
                          <Badge variant={challenge.impact === "Critical" ? "destructive" : "secondary"}>
                            {challenge.impact} Impact
                          </Badge>
                        </div>
                        <CardDescription>{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Solutions & Strategies:</h4>
                            <ul className="space-y-2">
                              {challenge.solutions.map((solution, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                  <ChevronRight className="w-4 h-4 text-green-600" />
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Real-World Examples:</h4>
                            <ul className="space-y-2">
                              {challenge.examples.map((example, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                  <Star className="w-4 h-4 text-blue-600" />
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cases" className="space-y-8">
              <div className="space-y-8">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">{study.company}</CardTitle>
                            <CardDescription className="text-lg font-medium text-blue-600">
                              {study.project}
                            </CardDescription>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-lg py-1 px-3">{study.investment}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Impact:</h4>
                          <p className="text-blue-600 font-medium">{study.impact}</p>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-6">{study.details}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Key Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech) => (
                                <Badge key={tech} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Results Achieved:</h4>
                            <ul className="space-y-1">
                              {study.results.map((result, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                  <ChevronRight className="w-4 h-4 text-green-600" />
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="future" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {futureTrends.map((trend, index) => (
                  <motion.div
                    key={trend.trend}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <trend.icon className="w-6 h-6 text-purple-600" />
                          {trend.trend}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{trend.timeline}</Badge>
                          <Badge className="bg-purple-100 text-purple-800">{trend.impact}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700">{trend.description}</p>

                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="text-lg font-semibold text-purple-600 mb-1">Market Potential</div>
                          <div className="text-2xl font-bold text-gray-900">{trend.marketPotential}</div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Applications:</h4>
                          <ul className="space-y-1">
                            {trend.examples.map((example, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-gray-700">
                                <ChevronRight className="w-4 h-4 text-purple-600" />
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Expert Insights & Future Outlook</CardTitle>
                  <CardDescription>Industry perspectives on the future of aerospace and defense</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Technology Convergence</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        "The next decade will see unprecedented convergence of AI, quantum computing, and advanced
                        materials, fundamentally transforming how we design and operate aerospace and defense systems."
                        - Industry Research Report 2024
                      </p>
                    </div>
                    <div className="p-6 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Sustainability Focus</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        "Environmental sustainability is becoming a key driver of innovation, with electric aircraft and
                        sustainable fuels expected to capture 30% of the market by 2035." - Aviation Week Analysis
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Speculative Scenarios</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">2030</div>
                        <div className="text-sm text-gray-700">Autonomous military aircraft operational</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">2035</div>
                        <div className="text-sm text-gray-700">Commercial space stations established</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">2040</div>
                        <div className="text-sm text-gray-700">Hypersonic passenger travel available</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Major Companies Comparison */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Leaders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comparing the major players shaping the aerospace and defense landscape
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {majorCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{company.name}</CardTitle>
                      <Badge variant="outline">{company.focus}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{company.revenue}</div>
                        <div className="text-xs text-gray-600">Annual Revenue</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{company.employees}</div>
                        <div className="text-xs text-gray-600">Employees</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Products:</h4>
                      <div className="flex flex-wrap gap-2">
                        {company.keyProducts.map((product) => (
                          <Badge key={product} variant="secondary">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Core Strengths:</h4>
                      <ul className="space-y-1">
                        {company.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Aerospace & Defense Solutions?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover how cutting-edge aerospace and defense technologies can transform your operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
              Request Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Download Industry Report
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AerospaceDefensePage
