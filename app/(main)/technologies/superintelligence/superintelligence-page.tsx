"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Zap,
  Shield,
  AlertTriangle,
  Users,
  Globe,
  Lightbulb,
  Target,
  TrendingUp,
  Eye,
  Settings,
  Cpu,
  Atom,
  Infinity,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SuperintelligencePage() {
  const [activeScenario, setActiveScenario] = useState(0)

  const intelligenceLevels = [
    {
      level: "Artificial Narrow Intelligence (ANI)",
      description: "AI systems designed for specific tasks",
      capabilities: ["Task-specific", "Pattern recognition", "Data processing", "Automation"],
      examples: ["Image recognition", "Language translation", "Game playing", "Recommendation systems"],
      status: "Current State",
      color: "from-blue-500 to-cyan-500",
    },
    {
      level: "Artificial General Intelligence (AGI)",
      description: "AI with human-level cognitive abilities across domains",
      capabilities: ["General reasoning", "Learning transfer", "Creative problem-solving", "Contextual understanding"],
      examples: ["Scientific research", "Creative writing", "Complex planning", "Multi-domain expertise"],
      status: "Near Future",
      color: "from-purple-500 to-pink-500",
    },
    {
      level: "Artificial Superintelligence (ASI)",
      description: "AI that surpasses human intelligence in all domains",
      capabilities: ["Superior reasoning", "Recursive self-improvement", "Novel discoveries", "Transcendent insights"],
      examples: [
        "Scientific breakthroughs",
        "Technological singularity",
        "Global optimization",
        "Consciousness simulation",
      ],
      status: "Theoretical",
      color: "from-orange-500 to-red-500",
    },
  ]

  const potentialCapabilities = [
    {
      title: "Scientific Discovery",
      description: "Accelerate research and make breakthrough discoveries across all scientific domains",
      icon: Atom,
      impact: "1000x faster research",
      applications: ["Drug discovery", "Climate solutions", "Energy breakthroughs", "Space exploration"],
    },
    {
      title: "Problem Solving",
      description: "Solve complex global challenges that have persisted for decades or centuries",
      icon: Target,
      impact: "Global challenge resolution",
      applications: ["Poverty elimination", "Disease eradication", "Resource optimization", "Conflict resolution"],
    },
    {
      title: "Technological Innovation",
      description: "Create revolutionary technologies beyond current human imagination",
      icon: Lightbulb,
      impact: "Paradigm-shifting innovations",
      applications: ["Quantum computing", "Nanotechnology", "Biotechnology", "Space technology"],
    },
    {
      title: "Economic Transformation",
      description: "Optimize global economic systems for maximum efficiency and equity",
      icon: TrendingUp,
      impact: "Post-scarcity economy",
      applications: ["Resource allocation", "Market optimization", "Wealth distribution", "Automation economy"],
    },
  ]

  const ethicalConsiderations = [
    {
      category: "Control Problem",
      description: "Ensuring superintelligent systems remain aligned with human values and goals",
      icon: Settings,
      challenges: ["Value alignment", "Goal specification", "Control mechanisms", "Shutdown procedures"],
      approaches: ["AI safety research", "Value learning", "Corrigibility", "Interpretability"],
    },
    {
      category: "Existential Risk",
      description: "Managing potential threats to human existence and civilization",
      icon: AlertTriangle,
      challenges: ["Uncontrolled optimization", "Resource competition", "Human obsolescence", "Catastrophic failure"],
      approaches: ["Risk assessment", "Safety protocols", "Gradual development", "International cooperation"],
    },
    {
      category: "Social Impact",
      description: "Addressing societal disruption and inequality from superintelligence",
      icon: Users,
      challenges: ["Job displacement", "Power concentration", "Social stratification", "Human purpose"],
      approaches: ["Universal basic income", "Education reform", "Governance frameworks", "Human enhancement"],
    },
    {
      category: "Governance & Regulation",
      description: "Establishing frameworks for responsible superintelligence development",
      icon: Shield,
      challenges: ["Global coordination", "Regulatory frameworks", "Enforcement mechanisms", "Democratic oversight"],
      approaches: ["International treaties", "AI governance bodies", "Ethical guidelines", "Public participation"],
    },
  ]

  const developmentScenarios = [
    {
      scenario: "Gradual Development",
      timeline: "2040-2060",
      description: "Steady progress through incremental improvements in AI capabilities",
      probability: "High",
      characteristics: ["Predictable timeline", "Manageable risks", "Regulatory adaptation", "Human oversight"],
      implications: ["Time for preparation", "Gradual adaptation", "Risk mitigation", "Democratic governance"],
    },
    {
      scenario: "Intelligence Explosion",
      timeline: "2030-2040",
      description: "Rapid recursive self-improvement leading to superintelligence",
      probability: "Medium",
      characteristics: ["Exponential growth", "Unpredictable timeline", "Control challenges", "Rapid transformation"],
      implications: ["Limited preparation time", "Sudden disruption", "Control difficulties", "Uncertain outcomes"],
    },
    {
      scenario: "Distributed Intelligence",
      timeline: "2050-2070",
      description: "Multiple specialized superintelligent systems working in coordination",
      probability: "Medium",
      characteristics: ["Specialized domains", "Collaborative networks", "Distributed control", "Modular development"],
      implications: ["Reduced single-point risks", "Complex coordination", "Diverse applications", "Balanced power"],
    },
    {
      scenario: "Human-AI Merger",
      timeline: "2060-2080",
      description: "Integration of human and artificial intelligence through enhancement",
      probability: "Low",
      characteristics: [
        "Biological enhancement",
        "Brain-computer interfaces",
        "Hybrid intelligence",
        "Gradual transition",
      ],
      implications: ["Preserved human agency", "Enhanced capabilities", "Identity questions", "Evolutionary path"],
    },
  ]

  const researchAreas = [
    {
      area: "AI Safety & Alignment",
      description: "Ensuring AI systems remain beneficial and aligned with human values",
      icon: Shield,
      focus: ["Value alignment", "Robustness", "Interpretability", "Corrigibility"],
    },
    {
      area: "Machine Consciousness",
      description: "Understanding and potentially creating conscious artificial minds",
      icon: Brain,
      focus: ["Consciousness theories", "Subjective experience", "Self-awareness", "Qualia simulation"],
    },
    {
      area: "Cognitive Architecture",
      description: "Designing AI systems that can achieve general intelligence",
      icon: Cpu,
      focus: ["General reasoning", "Transfer learning", "Meta-learning", "Cognitive models"],
    },
    {
      area: "Recursive Self-Improvement",
      description: "AI systems that can improve their own capabilities",
      icon: Infinity,
      focus: ["Self-modification", "Capability amplification", "Stability analysis", "Control preservation"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10" />
          {/* Neural Network Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000">
              {[...Array(50)].map((_, i) => (
                <g key={i}>
                  <circle
                    cx={Math.random() * 1000}
                    cy={Math.random() * 1000}
                    r="2"
                    fill="currentColor"
                    className="text-purple-400"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.1;0.8;0.1"
                      dur={`${3 + Math.random() * 4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {[...Array(3)].map((_, j) => (
                    <line
                      key={j}
                      x1={Math.random() * 1000}
                      y1={Math.random() * 1000}
                      x2={Math.random() * 1000}
                      y2={Math.random() * 1000}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-purple-400"
                      opacity="0.3"
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              Superintelligence Research
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Beyond
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Human Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Exploring the frontiers of artificial superintelligence, its potential to transform civilization, and the
              critical challenges we must address to ensure a beneficial future for humanity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Research
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Scenarios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intelligence Levels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Intelligence{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hierarchy
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the progression from narrow AI to artificial general intelligence and ultimately to
              superintelligence.
            </p>
          </motion.div>

          <div className="space-y-8">
            {intelligenceLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${level.color} flex-shrink-0`}>
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-white">{level.level}</h3>
                          <Badge className={`bg-gradient-to-r ${level.color} text-white border-none`}>
                            {level.status}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-6">{level.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-white mb-3">Capabilities:</h4>
                            <div className="space-y-2">
                              {level.capabilities.map((capability, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-300">
                                  <Zap className="h-3 w-3 text-yellow-400 mr-2 flex-shrink-0" />
                                  {capability}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-3">Examples:</h4>
                            <div className="flex flex-wrap gap-2">
                              {level.examples.map((example, idx) => (
                                <Badge key={idx} className="bg-white/10 text-gray-300 border-white/20 text-xs">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Potential Capabilities */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Potential{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Exploring the transformative potential of superintelligence across scientific, technological, and societal
              domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {potentialCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <capability.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{capability.title}</CardTitle>
                        <div className="text-orange-400 font-semibold text-sm">{capability.impact}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{capability.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-white mb-3 text-sm">Applications:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {capability.applications.map((app, idx) => (
                        <Badge
                          key={idx}
                          className="bg-white/10 text-gray-300 border-white/20 text-xs justify-center py-1"
                        >
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Scenarios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Development{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Scenarios
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Exploring different pathways to superintelligence and their potential implications for humanity's future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developmentScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveScenario(index)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    activeScenario === index
                      ? "bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-xl text-white">{scenario.scenario}</CardTitle>
                      <div className="text-right">
                        <div className="text-blue-400 font-semibold text-sm">{scenario.timeline}</div>
                        <Badge
                          className={`mt-1 ${
                            scenario.probability === "High"
                              ? "bg-green-600/20 text-green-300 border-green-500/30"
                              : scenario.probability === "Medium"
                                ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                                : "bg-red-600/20 text-red-300 border-red-500/30"
                          }`}
                        >
                          {scenario.probability} Probability
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{scenario.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Characteristics:</h4>
                      <div className="space-y-1">
                        {scenario.characteristics.map((char, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-300">
                            <div className="w-1 h-1 bg-blue-400 rounded-full mr-2 flex-shrink-0" />
                            {char}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Implications:</h4>
                      <div className="space-y-1">
                        {scenario.implications.map((impl, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-300">
                            <div className="w-1 h-1 bg-purple-400 rounded-full mr-2 flex-shrink-0" />
                            {impl}
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

      {/* Ethical Considerations */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ethical{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Considerations
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Addressing the critical ethical challenges and risks associated with the development of superintelligent
              systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ethicalConsiderations.map((consideration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                        <consideration.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{consideration.category}</CardTitle>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{consideration.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Challenges:</h4>
                      <div className="space-y-1">
                        {consideration.challenges.map((challenge, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-300">
                            <AlertTriangle className="h-3 w-3 text-red-400 mr-2 flex-shrink-0" />
                            {challenge}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Research Approaches:</h4>
                      <div className="space-y-1">
                        {consideration.approaches.map((approach, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-300">
                            <Shield className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                            {approach}
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

      {/* Research Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Research{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Areas</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Key areas of research and development in the pursuit of safe and beneficial superintelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                        <area.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{area.area}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-sm">{area.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-white mb-3 text-sm">Research Focus:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {area.focus.map((focus, idx) => (
                        <Badge
                          key={idx}
                          className="bg-white/10 text-gray-300 border-white/20 text-xs justify-center py-1"
                        >
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Shape the Future of Intelligence</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join us in researching and developing safe, beneficial superintelligence that can help solve
                  humanity's greatest challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Join Research Initiative
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Explore Partnerships
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
