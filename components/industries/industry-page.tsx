"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Settings, AlertTriangle, Truck, Zap, Users, Brain, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { IndustryData } from "@/data/industry-data"
import AITechIcons from "@/components/industries/ai-tech-icons"
import FuturisticParticles from "@/components/industries/futuristic-particles"

// Map string icon names to Lucide components
const iconMap: Record<string, any> = {
  Settings,
  AlertTriangle,
  CheckCircle,
  Truck,
  Zap,
  Users,
  Brain,
}

interface IndustryPageProps {
  industry: IndustryData
}

export default function IndustryPage({ industry }: IndustryPageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("challenges")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <FuturisticParticles />
      </div>

      {/* Glowing accent elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>

      <AnimatePresence>
        {isLoaded && (
          <>
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative min-h-[60vh] flex items-center overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={
                    industry.heroImage && industry.heroImage.trim() !== ""
                      ? industry.heroImage
                      : "/placeholder.svg?height=1200&width=1600&query=digital technology background"
                  }
                  alt={industry.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60"></div>
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl"
                >
                  <div className="flex items-center text-sm text-foreground/70 mb-4">
                    <Link href="/industries" className="hover:text-primary transition-colors">
                      Industries
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span>{industry.name}</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{industry.heroTitle}</h1>

                  <p className="text-xl text-foreground/80 mb-8 max-w-2xl">{industry.heroDescription}</p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                      <Link href="#solutions">
                        Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button size="lg" variant="outline" asChild>
                      <Link href="/contact">Contact Our Experts</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Futuristic elements */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              <motion.div
                className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </motion.div>

            {/* Overview Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-20"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Industry Overview</h2>
                  <p className="text-lg text-foreground/80">{industry.overview}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                  {industry.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-foreground/70">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Challenges & Solutions Tabs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="py-20 bg-gradient-to-b from-background to-background/90"
              id="solutions"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Industry Challenges & Solutions</h2>
                    <p className="text-foreground/70 max-w-2xl">
                      Discover how our AI-powered solutions address key challenges in the {industry.name} industry
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <Button
                      variant={activeTab === "challenges" ? "default" : "outline"}
                      onClick={() => setActiveTab("challenges")}
                    >
                      Challenges
                    </Button>
                    <Button
                      variant={activeTab === "solutions" ? "default" : "outline"}
                      onClick={() => setActiveTab("solutions")}
                    >
                      Solutions
                    </Button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "challenges" ? (
                    <motion.div
                      key="challenges"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industry.challenges.map((challenge, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            transition={{ delay: index * 0.1 }}
                            className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                              {challenge.icon && iconMap[challenge.icon] ? (
                                React.createElement(iconMap[challenge.icon], { className: "h-6 w-6 text-primary" })
                              ) : (
                                <Brain className="h-6 w-6 text-primary" />
                              )}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                            <p className="text-foreground/70">{challenge.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="solutions"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {industry.solutions.map((solution, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                          >
                            <div className="relative h-48">
                              <Image
                                src={
                                  solution.image && solution.image.trim() !== ""
                                    ? solution.image
                                    : "/placeholder.svg?height=400&width=600&query=technology solution"
                                }
                                alt={solution.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {solution.title}
                              </h3>
                              <p className="text-foreground/70 mb-4">{solution.description}</p>
                              <Button variant="link" className="p-0 h-auto text-primary">
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* AI Technology Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="py-20"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-2">AI-Powered Technologies</h2>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    Our cutting-edge AI technologies that drive transformation in the {industry.name} industry
                  </p>
                </div>

                <AITechIcons />
              </div>
            </motion.section>

            {/* Case Studies Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="py-20 bg-gradient-to-b from-background to-background/90"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    Real-world examples of how our solutions have transformed {industry.name} businesses
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {industry.caseStudies.map((caseStudy, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      transition={{ delay: index * 0.1 }}
                      className="bg-card/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={
                            caseStudy.image && caseStudy.image.trim() !== ""
                              ? caseStudy.image
                              : "/placeholder.svg?height=400&width=600&query=business case study"
                          }
                          alt={caseStudy.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                        <p className="text-foreground/70 mb-4">{caseStudy.description}</p>

                        <h4 className="font-medium text-sm text-primary mb-2">Key Results:</h4>
                        <ul className="space-y-2">
                          {caseStudy.results.map((result, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Technologies Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="py-20"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-2">Technology Stack</h2>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    The cutting-edge technologies we leverage to deliver exceptional results
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {industry.technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="bg-card/30 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="py-20"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Ready to Transform Your {industry.name} Operations?
                    </h2>
                    <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                      Contact our industry experts today to discuss how our AI-powered solutions can address your
                      specific challenges.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <Link href="/contact">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/industries">Explore Other Industries</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
