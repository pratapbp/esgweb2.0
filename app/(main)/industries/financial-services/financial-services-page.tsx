"use client"

import { motion } from "framer-motion"
import {
  Shield,
  TrendingUp,
  Users,
  Zap,
  Lock,
  Smartphone,
  Globe,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "$26.5T", label: "Global financial services market", icon: Globe },
  { value: "73%", label: "Digital banking adoption rate", icon: Smartphone },
  { value: "$150B", label: "Annual fintech investment", icon: TrendingUp },
  { value: "45%", label: "Cost reduction through AI", icon: BarChart3 },
]

const challenges = [
  {
    title: "Regulatory Compliance",
    description:
      "Navigating complex frameworks like Basel III, MiFID II, and PSD2 while maintaining operational efficiency across multiple jurisdictions.",
    icon: Shield,
    impact: "High",
    examples: [
      "GDPR compliance costs $2.7B annually",
      "Basel III requires 13% capital ratio",
      "PCI DSS affects 90% of transactions",
    ],
  },
  {
    title: "Cybersecurity Threats",
    description:
      "Financial institutions face 300x more cyber attacks than other industries, with average breach costs of $5.97M.",
    icon: Lock,
    impact: "Critical",
    examples: ["Equifax breach affected 147M people", "Capital One breach cost $150M", "Ransomware attacks up 238%"],
  },
  {
    title: "Digital Transformation",
    description:
      "Legacy systems handling 43% of transactions need modernization while ensuring 99.99% uptime requirements.",
    icon: Zap,
    impact: "High",
    examples: ["COBOL systems run 95% of ATM swipes", "Core banking upgrades take 3-5 years", "API adoption at 67%"],
  },
  {
    title: "Customer Experience",
    description:
      "Meeting demands for instant, personalized services across 15+ touchpoints while maintaining security.",
    icon: Users,
    impact: "Medium",
    examples: ["Mobile banking usage up 200%", "Chatbot adoption at 85%", "Real-time payments expected"],
  },
]

const solutions = [
  {
    title: "AI-Powered Risk Management",
    description:
      "Advanced machine learning algorithms providing real-time fraud detection, credit scoring, and regulatory compliance automation.",
    technologies: ["Machine Learning", "Natural Language Processing", "Predictive Analytics"],
    benefits: [
      "60% reduction in false positives",
      "Real-time transaction monitoring",
      "Automated compliance reporting",
    ],
    image: "/images/financial/ai-risk-management.jpg",
  },
  {
    title: "Blockchain Infrastructure",
    description:
      "Secure, transparent blockchain solutions for cross-border payments, smart contracts, and digital identity verification.",
    technologies: ["Distributed Ledger", "Smart Contracts", "Cryptography"],
    benefits: ["Instant cross-border payments", "Reduced settlement time to minutes", "Immutable transaction records"],
    image: "/images/financial/blockchain-infrastructure.jpg",
  },
  {
    title: "Cloud-Native Banking",
    description:
      "Scalable cloud infrastructure enabling rapid deployment of financial products with microservices architecture.",
    technologies: ["Microservices", "API-First Design", "Container Orchestration"],
    benefits: ["50% faster product launches", "99.99% uptime guarantee", "Elastic scaling capabilities"],
    image: "/images/financial/cloud-banking.jpg",
  },
  {
    title: "Open Banking APIs",
    description:
      "PSD2-compliant API infrastructure enabling third-party integrations and innovative financial services.",
    technologies: ["RESTful APIs", "OAuth 2.0", "API Gateway"],
    benefits: ["300+ fintech integrations", "New revenue streams", "Enhanced customer choice"],
    image: "/images/financial/open-banking.jpg",
  },
]

const caseStudies = [
  {
    title: "JPMorgan Chase: AI-Powered Fraud Detection",
    company: "JPMorgan Chase",
    industry: "Investment Banking",
    challenge: "Processing 5 billion transactions daily while detecting sophisticated fraud patterns in real-time.",
    solution: "Implemented machine learning models analyzing 150+ variables per transaction with real-time scoring.",
    results: [
      "92% reduction in false positive fraud alerts",
      "$150M annual savings in fraud prevention",
      "2-second average transaction processing time",
      "99.7% fraud detection accuracy rate",
    ],
    technologies: ["TensorFlow", "Apache Kafka", "Real-time Analytics"],
    image: "/images/case-studies/jpmorgan-fraud.jpg",
  },
  {
    title: "Ant Financial: Super App Ecosystem",
    company: "Ant Financial (Alipay)",
    industry: "Digital Payments",
    challenge:
      "Creating integrated financial services for 1.3 billion users across payments, lending, and wealth management.",
    solution:
      "Built comprehensive fintech platform with AI-driven credit scoring and blockchain-based supply chain finance.",
    results: [
      "1.3B active users globally",
      "$17T annual payment volume",
      "3-minute loan approval process",
      "40% of China's mobile payments",
    ],
    technologies: ["Blockchain", "AI Credit Scoring", "Mobile-First Architecture"],
    image: "/images/case-studies/ant-financial.jpg",
  },
  {
    title: "Goldman Sachs: Marcus Digital Bank",
    company: "Goldman Sachs",
    industry: "Consumer Banking",
    challenge: "Entering consumer banking market with digital-first approach and competitive rates.",
    solution: "Launched Marcus digital platform with AI-powered personal finance management and automated investing.",
    results: [
      "$100B in deposits within 4 years",
      "5M+ consumer customers acquired",
      "2.5% average savings rate offered",
      "85% customer satisfaction score",
    ],
    technologies: ["Cloud Infrastructure", "AI Personal Finance", "Mobile Banking"],
    image: "/images/case-studies/goldman-marcus.jpg",
  },
]

const technologies = [
  { name: "Artificial Intelligence", adoption: "78%", growth: "+45%" },
  { name: "Blockchain Technology", adoption: "34%", growth: "+120%" },
  { name: "Cloud Computing", adoption: "89%", growth: "+25%" },
  { name: "API-First Architecture", adoption: "67%", growth: "+67%" },
  { name: "Robotic Process Automation", adoption: "56%", growth: "+89%" },
  { name: "Quantum Computing", adoption: "12%", growth: "+200%" },
]

const marketTrends = [
  {
    trend: "Open Banking Revolution",
    description: "PSD2 and similar regulations driving API-first banking with 2,500+ licensed TPPs in Europe.",
    impact: "High",
    timeline: "2024-2026",
  },
  {
    trend: "Central Bank Digital Currencies",
    description: "87 countries exploring CBDCs with China's digital yuan processing $14B in transactions.",
    impact: "Critical",
    timeline: "2025-2030",
  },
  {
    trend: "Embedded Finance",
    description:
      "Non-financial companies integrating payment, lending, and insurance services directly into their platforms.",
    impact: "High",
    timeline: "2024-2027",
  },
  {
    trend: "Quantum-Safe Cryptography",
    description: "Preparing for quantum computing threats with post-quantum cryptographic standards.",
    impact: "Medium",
    timeline: "2028-2035",
  },
]

export default function FinancialServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">Financial Services Industry</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transform Financial Services with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionize banking, insurance, investment management, and fintech operations with advanced AI,
              blockchain, and cloud technologies that enhance customer experience and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
                    <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl font-bold text-white mb-6">The Financial Services Landscape</h2>
              <p className="text-gray-300 mb-6 text-lg">
                The financial services industry encompasses banking, insurance, investment management, and emerging
                fintech solutions, representing a $26.5 trillion global market. As digital transformation accelerates,
                financial institutions face unprecedented challenges in regulatory compliance, cybersecurity, and
                customer experience while navigating opportunities in blockchain, AI, and cloud computing innovations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Banking & Digital Payments ($8.2T market)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Insurance & Risk Management ($5.4T market)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Investment Management ($103T AUM)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Fintech Innovation ($150B annual investment)</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/images/financial/financial-overview.jpg"
                alt="Financial Services Overview"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Industry Challenges</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Financial institutions face complex challenges requiring innovative technological solutions
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
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Key Examples</h4>
                      {challenge.examples.map((example, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          <span className="text-gray-300 text-sm">{example}</span>
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Technology Solutions</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Advanced technologies transforming financial services operations and customer experiences
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
                          <Badge key={tech} variant="outline" className="border-blue-500/30 text-blue-300">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Real-world implementations demonstrating the transformative power of financial technology
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{study.industry}</Badge>
                          <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                        </div>
                        <p className="text-gray-400 mb-4">
                          <strong>Challenge:</strong> {study.challenge}
                        </p>
                        <p className="text-gray-300 mb-6">
                          <strong>Solution:</strong> {study.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Results Achieved</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300">{result}</span>
                            </div>
                          ))}
                        </div>
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

                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <img
                          src={study.image || "/placeholder.svg"}
                          alt={study.title}
                          className="rounded-lg shadow-xl max-w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-lg" />
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Technology Adoption Trends</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Current adoption rates and growth trends in financial services technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
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
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Adoption Rate</span>
                        <span className="text-white font-semibold">{tech.adoption}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: tech.adoption }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Future Market Trends</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Emerging trends shaping the future of financial services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <motion.div
                key={trend.trend}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-white text-xl">{trend.trend}</CardTitle>
                      <Badge
                        variant={
                          trend.impact === "Critical"
                            ? "destructive"
                            : trend.impact === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {trend.impact}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300 text-base">{trend.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Timeline:</span>
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                        {trend.timeline}
                      </Badge>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Financial Services?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Partner with us to implement cutting-edge financial technology solutions that drive growth, enhance
              security, and improve customer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
