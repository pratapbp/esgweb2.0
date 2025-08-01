"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import FluidBackground from "@/components/backgrounds/fluid-background"
import AiCapabilityCard from "@/components/who-we-are/ai-capability-card"
import CoreValuePill from "@/components/who-we-are/core-value-pill"
import { ArrowRight, Brain, Cpu, Network, Bot, Shield, Zap, Database, Sparkles, Lock } from "lucide-react"
// Import the SapCapabilities component at the top of the file
import SapCapabilities from "@/components/sections/sap-capabilities"

function WhoWeArePage() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const aiCapabilities = [
    {
      title: "General AI",
      description: "Advanced systems capable of understanding, learning, and applying knowledge across domains.",
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Superintelligent AI",
      description: "Next-generation AI with cognitive capabilities surpassing human intelligence in most domains.",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Machine Learning",
      description: "Systems that automatically learn and improve from experience without explicit programming.",
      icon: <Network className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Robotic Process Automation",
      description: "Technology that automates repetitive tasks through software robots or artificial intelligence.",
      icon: <Bot className="w-6 h-6" />,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Blockchain",
      description: "Decentralized, secure ledger technology enabling transparent and immutable record-keeping.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-red-400 to-red-600",
    },
    {
      title: "Reactive Machines",
      description: "AI systems that respond to different kinds of stimuli without prior memory or past experiences.",
      icon: <Zap className="w-6 h-6" />,
      color: "from-indigo-400 to-indigo-600",
    },
    {
      title: "Limited Memory",
      description: "AI that can use past experiences to inform future decisions, learning from historical data.",
      icon: <Database className="w-6 h-6" />,
      color: "from-pink-400 to-pink-600",
    },
    {
      title: "Theory of Mind",
      description: "Advanced AI capable of understanding emotions, beliefs, and thoughts of other entities.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-teal-400 to-teal-600",
    },
    {
      title: "Self-aware AI",
      description: "Future AI systems with consciousness and understanding of their own existence.",
      icon: <Lock className="w-6 h-6" />,
      color: "from-orange-400 to-orange-600",
    },
  ]

  const coreValues = [
    { label: "Innovation", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
    { label: "Excellence", color: "bg-gradient-to-r from-purple-400 to-purple-600" },
    { label: "Integrity", color: "bg-gradient-to-r from-green-400 to-green-600" },
    { label: "Collaboration", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
    { label: "Empathy", color: "bg-gradient-to-r from-red-400 to-red-600" },
    { label: "Sustainability", color: "bg-gradient-to-r from-indigo-400 to-indigo-600" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Fluid Background */}
      <FluidBackground />

      <div ref={containerRef} className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center">
          <motion.div
            style={{ opacity, scale, y }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-full max-w-7xl mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[600px] h-[600px] max-w-full max-h-full">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-3xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Who{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                  We Are
                </span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                A team of visionaries and experts dedicated to transforming businesses through cutting-edge AI and
                enterprise solutions.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {coreValues.map((value, index) => (
                  <CoreValuePill key={index} label={value.label} color={value.color} delay={index * 0.1} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg">
                  {/* Water drop effect */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                    }}
                  />

                  <h2 className="text-3xl font-bold mb-6">
                    Our{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                      Story
                    </span>
                  </h2>
                  <p className="text-foreground/80 mb-4">
                    Founded in 2020, ESG emerged from a vision to revolutionize how businesses leverage technology. Our
                    founders, with decades of experience in enterprise solutions and artificial intelligence, recognized
                    the transformative potential of combining cutting-edge AI with deep industry expertise.
                  </p>
                  <p className="text-foreground/80 mb-4">
                    What began as a specialized SAP consultancy quickly evolved into a comprehensive technology partner,
                    as we expanded our capabilities to include advanced AI solutions, cloud services, and digital
                    transformation.
                  </p>
                  <p className="text-foreground/80">
                    Today, ESG stands at the forefront of technological innovation, helping businesses across industries
                    navigate the complexities of the digital landscape and unlock new opportunities for growth and
                    efficiency.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                  <Image src="/images/digital-transformation.jpg" alt="ESG Story" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <div className="absolute -bottom-6 -left-6 p-6 bg-blue-900/20 backdrop-blur-md rounded-xl border border-blue-900/50 max-w-xs">
                  <h3 className="text-xl font-bold mb-2">Innovation-Driven</h3>
                  <p className="text-foreground/80">
                    We continuously explore emerging technologies to deliver cutting-edge solutions that drive business
                    value.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our AI{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                  Capabilities
                </span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                We leverage a diverse range of AI technologies to deliver innovative solutions that address complex
                business challenges.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCapabilities.map((capability, index) => (
                <AiCapabilityCard
                  key={index}
                  title={capability.title}
                  description={capability.description}
                  icon={capability.icon}
                  color={capability.color}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SAP Capabilities Section */}
        <SapCapabilities />

        {/* Join Us Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative p-8 md:p-12 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg overflow-hidden">
              {/* Reflective highlight */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45"></div>

              {/* Water drop effect */}
              <motion.div
                className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Join Our{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                      Team
                    </span>
                  </h2>
                  <p className="text-foreground/80 mb-6">
                    At ESG, we're always looking for talented individuals who are passionate about technology and
                    innovation. Join our team of experts and be part of shaping the future of enterprise solutions and
                    artificial intelligence.
                  </p>
                  <p className="text-foreground/80 mb-8">
                    We offer a collaborative and inclusive work environment, opportunities for professional growth, and
                    the chance to work on cutting-edge projects that make a real impact.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium transition-transform"
                  >
                    View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>

                <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
                  <Image src="/images/team-collaboration.jpg" alt="Join Our Team" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 dark:text-blue-400"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                1
              </span>
            </div>
          </button>
          <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
            Chat with us 👋
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoWeArePage
