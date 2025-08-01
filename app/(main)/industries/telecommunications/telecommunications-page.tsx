"use client"

import { motion } from "framer-motion"
import {
  Smartphone,
  Wifi,
  Shield,
  Zap,
  Globe,
  Settings,
  BarChart3,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Lock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "$1.7T", label: "Global telecom market size", icon: Globe },
  { value: "5.3B", label: "Mobile subscribers worldwide", icon: Smartphone },
  { value: "38B", label: "IoT connections by 2030", icon: Wifi },
  { value: "130%", label: "Data traffic growth annually", icon: TrendingUp },
]

const networkTypes = [
  {
    title: "5G Networks",
    description:
      "Ultra-fast, low-latency networks enabling IoT, autonomous vehicles, and immersive experiences with speeds up to 10 Gbps.",
    coverage: "Global deployment by major carriers",
    examples: [
      "Verizon's 5G Ultra Wideband covers 200M+ people",
      "T-Mobile's 5G network spans 1.7M square miles",
      "AT&T 5G+ available in 40+ cities nationwide",
    ],
    applications: ["Enhanced Mobile Broadband", "Massive IoT", "Ultra-Reliable Communications"],
    icon: Zap,
  },
  {
    title: "Fiber Optic Networks",
    description:
      "High-speed fixed-line infrastructure providing gigabit internet with 99.9% reliability for homes and businesses.",
    coverage: "Expanding to rural and underserved areas",
    examples: [
      "Google Fiber offers 2 Gig speeds in 18 cities",
      "Verizon Fios serves 7M+ customers across 9 states",
      "AT&T Fiber available to 15.5M+ locations",
    ],
    applications: ["Residential Broadband", "Business Connectivity", "Backbone Infrastructure"],
    icon: Globe,
  },
  {
    title: "Satellite Networks",
    description:
      "Global connectivity solutions reaching remote areas with low Earth orbit (LEO) satellite constellations.",
    coverage: "Worldwide coverage including remote regions",
    examples: [
      "Starlink serves 1.5M+ subscribers globally",
      "OneWeb constellation of 648 satellites operational",
      "Amazon's Project Kuiper planning 3,236 satellites",
    ],
    applications: ["Rural Connectivity", "Maritime Communications", "Emergency Services"],
    icon: Wifi,
  },
]

const challenges = [
  {
    title: "Network Security",
    description:
      "Telecom networks face 1.5B+ cyber attacks annually, with 5G introducing new attack vectors and requiring zero-trust architecture.",
    icon: Shield,
    impact: "Critical",
    statistics: [
      "$43B annual cybersecurity spending",
      "300% increase in DDoS attacks",
      "5G security standards still evolving",
    ],
    solutions: ["AI-powered threat detection", "Network slicing security", "Quantum-safe encryption"],
  },
  {
    title: "Infrastructure Development",
    description:
      "5G deployment requires 10x more cell sites than 4G, with $275B investment needed for full US coverage by 2030.",
    icon: Settings,
    impact: "High",
    statistics: [
      "800,000+ new cell sites needed",
      "$275B infrastructure investment",
      "Permitting delays average 18 months",
    ],
    solutions: ["Small cell deployment", "Infrastructure sharing", "Streamlined permitting"],
  },
  {
    title: "Data Privacy Compliance",
    description:
      "Managing customer data across jurisdictions with GDPR, CCPA, and emerging privacy regulations affecting 4B+ subscribers.",
    icon: Lock,
    impact: "High",
    statistics: [
      "$4.35M average data breach cost",
      "GDPR fines totaling €1.6B since 2018",
      "72-hour breach notification requirement",
    ],
    solutions: ["Privacy by design", "Data localization", "Automated compliance monitoring"],
  },
  {
    title: "Network Capacity Management",
    description:
      "Mobile data traffic growing 25% annually, requiring network optimization and capacity expansion to maintain quality of service.",
    icon: BarChart3,
    impact: "Medium",
    statistics: ["77 exabytes monthly mobile traffic", "25% annual growth rate", "Video accounts for 69% of traffic"],
    solutions: ["Network function virtualization", "Edge computing", "Dynamic spectrum sharing"],
  },
]

const solutions = [
  {
    title: "5G Network Infrastructure",
    description:
      "Complete 5G deployment solutions including radio access networks, core infrastructure, and edge computing capabilities for ultra-low latency applications.",
    technologies: ["Massive MIMO", "Network Slicing", "Edge Computing", "Software-Defined Networking"],
    benefits: ["Sub-millisecond latency", "10 Gbps peak speeds", "1M devices per km²", "99.999% reliability"],
    realWorldExample:
      "Verizon's 5G Ultra Wideband network achieves 4 Gbps speeds in optimal conditions using our infrastructure solutions.",
  },
  {
    title: "IoT Connectivity Platform",
    description:
      "Scalable IoT connectivity solutions enabling massive device deployment with optimized network resources and centralized management.",
    technologies: ["NB-IoT", "LTE-M", "LoRaWAN", "Device Management"],
    benefits: ["10-year battery life", "Global roaming support", "Massive scale deployment", "Real-time monitoring"],
    realWorldExample:
      "AT&T's IoT platform manages 78M+ connected devices across industries using our connectivity solutions.",
  },
  {
    title: "Network Optimization AI",
    description:
      "AI-powered network optimization systems that automatically adjust network parameters for optimal performance and efficiency.",
    technologies: ["Machine Learning", "Predictive Analytics", "Self-Organizing Networks", "Traffic Analysis"],
    benefits: ["30% capacity improvement", "Automated optimization", "Predictive maintenance", "Real-time adaptation"],
    realWorldExample:
      "T-Mobile's network optimization reduces congestion by 40% using our AI-powered traffic management system.",
  },
  {
    title: "Edge Computing Solutions",
    description:
      "Distributed edge computing infrastructure bringing processing closer to users for low-latency applications and services.",
    technologies: [
      "Multi-Access Edge Computing",
      "Container Orchestration",
      "5G Integration",
      "Cloud-Native Functions",
    ],
    benefits: ["Sub-10ms latency", "Local data processing", "Bandwidth optimization", "Enhanced security"],
    realWorldExample:
      "AWS Wavelength zones deployed in Verizon's 5G network enable <10ms latency for gaming applications.",
  },
]

const caseStudies = [
  {
    title: "Verizon: 5G Ultra Wideband Deployment",
    company: "Verizon Communications",
    challenge:
      "Deploying nationwide 5G network to serve 200M+ people while maintaining network quality and expanding coverage.",
    solution:
      "Implemented comprehensive 5G infrastructure with millimeter wave and C-band spectrum, edge computing integration, and network slicing capabilities.",
    results: [
      "200M+ people covered by 5G Ultra Wideband",
      "4 Gbps peak speeds achieved in optimal conditions",
      "$45B invested in 5G infrastructure",
      "30+ edge computing locations deployed",
    ],
    technologies: ["5G NR", "Massive MIMO", "Edge Computing"],
    impact: "Leading 5G deployment in the US with fastest network speeds",
  },
  {
    title: "China Mobile: World's Largest 5G Network",
    company: "China Mobile",
    challenge: "Building world's largest 5G network to serve 957M subscribers across diverse geographic regions.",
    solution:
      "Deployed 590,000+ 5G base stations with AI-powered network optimization and comprehensive IoT platform integration.",
    results: [
      "590,000+ 5G base stations deployed",
      "957M mobile subscribers served",
      "200M+ 5G subscribers acquired",
      "World's largest 5G network by coverage",
    ],
    technologies: ["5G Standalone", "AI Network Optimization", "IoT Platform"],
    impact: "Achieved global leadership in 5G deployment scale and subscriber adoption",
  },
  {
    title: "Starlink: Global Satellite Internet",
    company: "SpaceX Starlink",
    challenge:
      "Providing high-speed internet access to underserved and remote areas worldwide using satellite constellation.",
    solution:
      "Deployed 4,000+ low Earth orbit satellites with advanced phased array antennas and ground station network.",
    results: [
      "1.5M+ active subscribers globally",
      "4,000+ satellites in orbit",
      "100+ Mbps typical download speeds",
      "Coverage across 60+ countries",
    ],
    technologies: ["LEO Satellites", "Phased Array Antennas", "Laser Inter-satellite Links"],
    impact: "Revolutionizing global internet access with satellite-based broadband",
  },
]

const majorProviders = [
  {
    provider: "Verizon",
    marketPosition: "Leading US wireless carrier",
    subscribers: "143M+",
    keyServices: ["5G Ultra Wideband", "Fios Fiber", "Business Solutions"],
    networkCoverage: "99% 4G LTE, 200M+ 5G coverage",
    recentInitiatives: ["C-band 5G expansion", "Private network solutions", "Edge computing deployment"],
  },
  {
    provider: "AT&T",
    marketPosition: "Largest US telecom by revenue",
    subscribers: "203M+",
    keyServices: ["5G+", "Fiber Internet", "FirstNet"],
    networkCoverage: "99% 4G LTE, nationwide 5G",
    recentInitiatives: ["Fiber expansion to 30M locations", "5G standalone network", "IoT platform growth"],
  },
  {
    provider: "T-Mobile",
    marketPosition: "Fastest growing US carrier",
    subscribers: "110M+",
    keyServices: ["5G UC", "Home Internet", "Business Unlimited"],
    networkCoverage: "Extended Range 5G nationwide",
    recentInitiatives: ["Sprint network integration", "Mid-band 5G expansion", "Fixed wireless access"],
  },
  {
    provider: "China Mobile",
    marketPosition: "World's largest mobile operator",
    subscribers: "957M+",
    keyServices: ["5G Network", "IoT Solutions", "Cloud Services"],
    networkCoverage: "World's largest 5G network",
    recentInitiatives: ["5G-Advanced development", "Digital transformation services", "International expansion"],
  },
]

const futureApplications = [
  {
    application: "Autonomous Vehicles",
    description: "5G networks enabling vehicle-to-everything (V2X) communication for safe autonomous driving",
    requirements: "Ultra-low latency (<1ms), 99.999% reliability",
    marketPotential: "$7T autonomous vehicle market",
  },
  {
    application: "Industrial IoT",
    description: "Massive IoT connectivity for smart factories, predictive maintenance, and supply chain optimization",
    requirements: "Massive device density, long battery life",
    marketPotential: "$110B industrial IoT market by 2025",
  },
  {
    application: "Augmented Reality",
    description: "Immersive AR/VR experiences requiring high bandwidth and low latency for real-time rendering",
    requirements: "High bandwidth (>1 Gbps), low latency (<20ms)",
    marketPotential: "$209B AR/VR market by 2025",
  },
  {
    application: "Smart Cities",
    description: "Connected infrastructure for traffic management, public safety, and environmental monitoring",
    requirements: "Wide area coverage, diverse device support",
    marketPotential: "$2.5T smart cities market by 2025",
  },
]

export default function TelecommunicationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 bg-teal-500/20 text-teal-300 border-teal-500/30">Telecommunications Industry</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Connect the World with{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Next-Generation Networks
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build the future of connectivity with advanced 5G networks, IoT infrastructure, and intelligent network
              optimization that enable seamless communication and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
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
                    <stat.icon className="h-8 w-8 text-teal-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Types Section */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Network Infrastructure</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Comprehensive telecommunications infrastructure serving diverse connectivity needs
            </p>
          </motion.div>

          <div className="space-y-8">
            {networkTypes.map((network, index) => (
              <motion.div
                key={network.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <network.icon className="h-8 w-8 text-teal-400" />
                        <h3 className="text-2xl font-bold text-white">{network.title}</h3>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{network.coverage}</Badge>
                      </div>
                      <p className="text-gray-300 text-lg">{network.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Real-World Examples</h4>
                          <div className="space-y-2">
                            {network.examples.map((example, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">{example}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Key Applications</h4>
                          <div className="space-y-2">
                            {network.applications.map((app, idx) => (
                              <Badge key={idx} variant="outline" className="border-teal-500/30 text-teal-300 mr-2 mb-2">
                                {app}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <network.icon className="h-16 w-16 text-white" />
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
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Key Statistics
                      </h4>
                      <div className="space-y-1">
                        {challenge.statistics.map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                            <span className="text-gray-300 text-sm">{stat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Solutions</h4>
                      <div className="space-y-1">
                        {challenge.solutions.map((solution, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{solution}</span>
                          </div>
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
              Advanced technologies enabling next-generation telecommunications
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
                          <Badge key={tech} variant="outline" className="border-teal-500/30 text-teal-300">
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
              Real-world implementations transforming telecommunications
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
                          <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 mb-4">
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

                        <div className="p-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-lg border border-teal-500/20">
                          <h4 className="text-sm font-semibold text-teal-300 mb-2">Industry Impact</h4>
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

      {/* Major Providers Comparison */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Major Telecommunications Providers</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Leading global telecommunications companies and their market positions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {majorProviders.map((provider, index) => (
              <motion.div
                key={provider.provider}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-white text-xl">{provider.provider}</CardTitle>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{provider.subscribers}</Badge>
                    </div>
                    <CardDescription className="text-gray-300 text-base">{provider.marketPosition}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Key Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.keyServices.map((service) => (
                          <Badge key={service} variant="outline" className="border-teal-500/30 text-teal-300">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Network Coverage
                      </h4>
                      <p className="text-gray-300 text-sm">{provider.networkCoverage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Recent Initiatives
                      </h4>
                      <div className="space-y-1">
                        {provider.recentInitiatives.map((initiative, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                            <span className="text-gray-300 text-sm">{initiative}</span>
                          </div>
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

      {/* Future Applications */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Future Applications</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Emerging applications enabled by next-generation telecommunications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futureApplications.map((app, index) => (
              <motion.div
                key={app.application}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-white text-xl">{app.application}</CardTitle>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        {app.marketPotential}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300 text-base">{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Technical Requirements
                      </h4>
                      <p className="text-gray-300 text-sm">{app.requirements}</p>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Next-Generation Networks?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Partner with us to implement cutting-edge telecommunications technologies that enable seamless
              connectivity, drive innovation, and support the digital economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Download Network Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
