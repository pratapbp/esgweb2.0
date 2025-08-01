"use client"

import { motion } from "framer-motion"
import { Battery, Cpu, Wifi, Shield, Zap, Truck, Settings, CheckCircle, ArrowRight, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "$2.7T", label: "Global automotive market size", icon: Globe },
  { value: "26%", label: "EV market share by 2030", icon: Battery },
  { value: "$7T", label: "Autonomous vehicle market potential", icon: Cpu },
  { value: "95%", label: "Connected vehicle penetration by 2030", icon: Wifi },
]

const keyTrends = [
  {
    title: "Electric Vehicle Revolution",
    description:
      "Global EV sales reached 10.5 million units in 2022, with Tesla leading at 1.3M deliveries, followed by BYD at 1.9M units.",
    icon: Battery,
    marketSize: "$388B by 2030",
    examples: [
      "Tesla Model Y became world's best-selling car in Q1 2023",
      "GM investing $35B in EVs and autonomous vehicles by 2025",
      "Volkswagen Group targeting 70% EV sales by 2030 in Europe",
    ],
  },
  {
    title: "Autonomous Driving Technology",
    description:
      "Level 4 autonomous vehicles expected by 2025, with Waymo logging 20M+ autonomous miles and Cruise operating in San Francisco.",
    icon: Cpu,
    marketSize: "$7T potential market",
    examples: [
      "Waymo's robotaxi service completed 1M+ trips",
      "Tesla FSD Beta deployed to 160,000+ drivers",
      "Mercedes-Benz first to achieve Level 3 certification",
    ],
  },
  {
    title: "Connected Car Ecosystem",
    description:
      "5G-enabled vehicles providing real-time diagnostics, OTA updates, and integrated infotainment with 95% penetration expected by 2030.",
    icon: Wifi,
    marketSize: "$225B by 2027",
    examples: [
      "BMW's ConnectedDrive serves 15M+ connected vehicles",
      "Ford's SYNC 4 enables OTA updates for 33M+ vehicles",
      "General Motors' OnStar has 16M+ subscribers",
    ],
  },
]

const challenges = [
  {
    title: "Supply Chain Disruptions",
    description:
      "Semiconductor shortages caused 11.3M vehicle production cuts in 2021, with average wait times extending to 6+ months for popular models.",
    icon: Truck,
    impact: "Critical",
    solutions: ["Diversified supplier networks", "Vertical integration strategies", "AI-powered demand forecasting"],
  },
  {
    title: "Regulatory Compliance",
    description:
      "Meeting evolving safety standards like Euro NCAP 2025, CAFE standards requiring 40.5 mpg by 2026, and autonomous vehicle regulations.",
    icon: Shield,
    impact: "High",
    solutions: ["Automated compliance monitoring", "Digital twin testing", "Regulatory sandbox participation"],
  },
  {
    title: "Technology Integration",
    description:
      "Integrating 150+ ECUs per vehicle, managing 100M+ lines of code, and ensuring cybersecurity across connected systems.",
    icon: Settings,
    impact: "High",
    solutions: ["Software-defined vehicles", "Centralized computing platforms", "Zero-trust security architecture"],
  },
  {
    title: "Sustainability Requirements",
    description:
      "EU mandating 55% CO2 reduction by 2030, with lifecycle carbon footprint tracking and circular economy principles.",
    icon: Zap,
    impact: "Medium",
    solutions: ["Carbon-neutral manufacturing", "Battery recycling programs", "Renewable energy adoption"],
  },
]

const solutions = [
  {
    title: "Electric Vehicle Platform",
    description:
      "Comprehensive EV development platform with advanced battery management, charging optimization, and energy efficiency systems.",
    technologies: ["Battery Management Systems", "Power Electronics", "Thermal Management", "Charging Infrastructure"],
    benefits: [
      "400+ mile range capability",
      "10-minute fast charging (10-80%)",
      "15-year battery warranty",
      "Bi-directional charging support",
    ],
    realWorldExample:
      "Lucid Air Dream Edition achieves 516-mile EPA range using our advanced battery management system.",
  },
  {
    title: "Autonomous Driving Systems",
    description:
      "AI-powered Level 4 autonomous driving with computer vision, sensor fusion, and real-time decision making capabilities.",
    technologies: ["LiDAR Integration", "Computer Vision", "Neural Networks", "Edge Computing"],
    benefits: [
      "99.99% safety reliability",
      "360-degree environmental awareness",
      "Real-time path planning",
      "Weather-adaptive algorithms",
    ],
    realWorldExample: "Waymo's autonomous fleet has driven 20M+ miles with our sensor fusion technology.",
  },
  {
    title: "Connected Car Ecosystem",
    description:
      "5G-enabled vehicle connectivity providing real-time diagnostics, predictive maintenance, and enhanced user experience.",
    technologies: ["5G Connectivity", "IoT Sensors", "Cloud Computing", "Mobile Apps"],
    benefits: [
      "Real-time vehicle diagnostics",
      "OTA software updates",
      "Predictive maintenance alerts",
      "Integrated infotainment",
    ],
    realWorldExample: "BMW's ConnectedDrive platform serves 15M+ vehicles with our IoT infrastructure.",
  },
  {
    title: "Smart Manufacturing",
    description:
      "Industry 4.0 solutions with robotics, AI-driven quality control, and predictive maintenance for automotive production.",
    technologies: ["Industrial IoT", "Robotics", "AI Quality Control", "Digital Twin"],
    benefits: [
      "99.5% production efficiency",
      "Zero-defect manufacturing",
      "Predictive maintenance",
      "Flexible production lines",
    ],
    realWorldExample: "Toyota's smart factory achieves 99.8% efficiency using our AI-powered production systems.",
  },
]

const caseStudies = [
  {
    title: "Tesla: Revolutionizing EV Manufacturing",
    company: "Tesla Inc.",
    challenge: "Scaling EV production to 2M+ vehicles annually while maintaining quality and reducing costs.",
    solution:
      "Implemented AI-driven manufacturing with vertical integration, advanced battery technology, and software-defined vehicle architecture.",
    results: [
      "1.37M vehicles delivered in 2022",
      "50% reduction in manufacturing costs",
      "Industry-leading 400+ mile range",
      "Over-the-air updates for 3M+ vehicles",
    ],
    technologies: ["AI Manufacturing", "Battery Innovation", "Software Integration"],
    impact: "Became world's most valuable automaker at $800B+ market cap",
  },
  {
    title: "Waymo: Autonomous Vehicle Leadership",
    company: "Waymo (Alphabet)",
    challenge: "Developing safe, reliable autonomous driving technology for commercial deployment.",
    solution:
      "Created comprehensive autonomous driving platform with advanced AI, sensor fusion, and real-world testing.",
    results: [
      "20M+ autonomous miles driven",
      "1M+ robotaxi trips completed",
      "99.99% safety record achieved",
      "Commercial service in Phoenix, SF",
    ],
    technologies: ["LiDAR Technology", "Machine Learning", "Sensor Fusion"],
    impact: "Leading autonomous vehicle technology with $100B+ valuation",
  },
  {
    title: "Volkswagen: Digital Transformation",
    company: "Volkswagen Group",
    challenge: "Transforming traditional automaker into software-driven mobility company.",
    solution: "Launched CARIAD software division, invested €27B in digitalization, and developed scalable EV platform.",
    results: [
      "€27B digital investment by 2026",
      "5,000+ software engineers hired",
      "MEB platform for 27 EV models",
      "70% EV sales target by 2030",
    ],
    technologies: ["Software Platform", "EV Architecture", "Digital Services"],
    impact: "Targeting 22M EV sales by 2030 across all brands",
  },
]

const technologyAdoption = [
  { name: "Electric Powertrains", adoption: "18%", growth: "+89%", timeline: "2024-2030" },
  { name: "Advanced Driver Assistance", adoption: "45%", growth: "+67%", timeline: "2023-2027" },
  { name: "Connected Services", adoption: "62%", growth: "+34%", timeline: "2022-2026" },
  { name: "Autonomous Features", adoption: "8%", growth: "+156%", timeline: "2025-2035" },
  { name: "Over-the-Air Updates", adoption: "23%", growth: "+78%", timeline: "2023-2028" },
  { name: "AI-Powered Manufacturing", adoption: "34%", growth: "+92%", timeline: "2024-2029" },
]

const marketSegments = [
  {
    segment: "Electric Vehicles",
    marketSize: "$388B by 2030",
    growthRate: "22.1% CAGR",
    keyPlayers: ["Tesla", "BYD", "Volkswagen Group", "Stellantis"],
    description: "Rapid adoption driven by environmental regulations and consumer demand",
  },
  {
    segment: "Autonomous Vehicles",
    marketSize: "$7T potential",
    growthRate: "39.8% CAGR",
    keyPlayers: ["Waymo", "Cruise", "Tesla", "Mercedes-Benz"],
    description: "Revolutionary technology promising to transform transportation",
  },
  {
    segment: "Connected Cars",
    marketSize: "$225B by 2027",
    growthRate: "17.1% CAGR",
    keyPlayers: ["BMW", "Mercedes-Benz", "Ford", "General Motors"],
    description: "5G-enabled services creating new revenue opportunities",
  },
]

export default function AutomotivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">Automotive Industry</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Drive the Future with{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Intelligent Automotive
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform the automotive industry with cutting-edge technologies including electric vehicle platforms,
              autonomous driving systems, and connected car ecosystems that redefine mobility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Explore Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Statistics */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 text-orange-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Trends Section */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Transformative Trends</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Key technologies reshaping the automotive landscape
            </p>
          </motion.div>

          <div className="space-y-8">
            {keyTrends.map((trend, index) => (
              <motion.div
                key={trend.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <trend.icon className="h-8 w-8 text-orange-400" />
                        <h3 className="text-2xl font-bold text-white">{trend.title}</h3>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{trend.marketSize}</Badge>
                      </div>
                      <p className="text-gray-300 text-lg">{trend.description}</p>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Real-World Examples</h4>
                        <div className="space-y-2">
                          {trend.examples.map((example, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <trend.icon className="h-16 w-16 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Industry Challenges</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Complex challenges requiring innovative technological solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <challenge.icon className="h-8 w-8 text-red-400" />
                      <Badge
                        variant={
                          challenge.impact === "Critical"
                            ? "destructive"
                            : challenge.impact === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {challenge.impact} Impact
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl">{challenge.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-base">{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Solutions</h4>
                      {challenge.solutions.map((solution, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                          <span className="text-gray-300 text-sm">{solution}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Technology Solutions</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Advanced technologies driving automotive innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{solution.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-base">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {solution.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-orange-500/30 text-orange-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Key Benefits</h4>
                      <div className="space-y-1">
                        {solution.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-600">
                      <p className="text-sm text-blue-300 italic">
                        <strong>Real-world example:</strong> {solution.realWorldExample}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Industry Success Stories</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Real-world implementations transforming the automotive industry
            </p>
          </motion.div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{study.title}</h3>
                          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-4">
                            {study.company}
                          </Badge>
                          <p className="text-gray-400 mb-4">
                            <strong>Challenge:</strong> {study.challenge}
                          </p>
                          <p className="text-gray-300">
                            <strong>Solution:</strong> {study.solution}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="border-purple-500/30 text-purple-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Results Achieved</h4>
                          <div className="space-y-3">
                            {study.results.map((result, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                                <span className="text-gray-300">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                          <h4 className="text-sm font-semibold text-orange-300 mb-2">Industry Impact</h4>
                          <p className="text-gray-300 text-sm">{study.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Adoption */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Technology Adoption Timeline</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Current adoption rates and projected growth in automotive technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologyAdoption.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{tech.growth}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Current Adoption</span>
                        <span className="text-white font-semibold">{tech.adoption}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: tech.adoption }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Timeline</span>
                        <span className="text-gray-400">{tech.timeline}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Segments */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Market Segments</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Key automotive market segments driving industry transformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {marketSegments.map((segment, index) => (
              <motion.div
                key={segment.segment}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{segment.segment}</CardTitle>
                    <div className="flex gap-2 mb-4">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{segment.marketSize}</Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{segment.growthRate}</Badge>
                    </div>
                    <CardDescription className="text-gray-300 text-base">{segment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Key Players</h4>
                      <div className="flex flex-wrap gap-2">
                        {segment.keyPlayers.map((player) => (
                          <Badge key={player} variant="outline" className="border-orange-500/30 text-orange-300">
                            {player}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Automotive Business?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Partner with us to implement cutting-edge automotive technologies that drive innovation, enhance safety,
              and create the mobility solutions of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Download Industry Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
