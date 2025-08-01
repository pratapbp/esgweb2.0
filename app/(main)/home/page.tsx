"use client"

import { useState, useEffect } from "react"
import AiEnhancedHero from "@/components/home/ai-enhanced-hero"
import { LiveKPIStream } from "@/components/home/live-kpi-stream"
import { ESGOSModules } from "@/components/home/esg-os-modules"
import { SAPAIShowcase } from "@/components/home/sap-ai-showcase"
import { TechInnovationWall } from "@/components/home/tech-innovation-wall"
import { ReelsUseCases } from "@/components/home/reels-use-cases"
import { IndustrySolutions } from "@/components/home/industry-solutions"
import { TrustedBySection } from "@/components/home/trusted-by-section"
import { VoiceCopilotEntry } from "@/components/home/voice-copilot-entry"
import { FloatingActionButton } from "@/components/home/floating-action-button"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Brain, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setIsMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-2">Loading ESGit Intelligence</h1>
          <p className="text-gray-400">Initializing AI-powered enterprise solutions...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-cyan-600/20 animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Status Bar */}
            <div className="flex items-center justify-center space-x-6 mb-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI Systems Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-violet-200">
                Enterprise Solutions Powered by{" "}
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 animate-pulse">
                SAP Excellence & AI Innovation
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transform your business with cutting-edge SAP solutions, AI-powered insights, and intelligent automation.
              Experience the future of enterprise technology today.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                <Brain className="h-8 w-8 text-blue-400 mb-3 mx-auto group-hover:animate-pulse" />
                <h3 className="font-semibold text-white mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-400">Advanced machine learning and GenAI integration</p>
              </div>
              <div className="group p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-600/10 border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 hover:scale-105">
                <Zap className="h-8 w-8 text-violet-400 mb-3 mx-auto group-hover:animate-pulse" />
                <h3 className="font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Real-time processing and instant insights</p>
              </div>
              <div className="group p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105">
                <Shield className="h-8 w-8 text-cyan-400 mb-3 mx-auto group-hover:animate-pulse" />
                <h3 className="font-semibold text-white mb-2">Enterprise Secure</h3>
                <p className="text-sm text-gray-400">Bank-grade security and compliance</p>
              </div>
              <div className="group p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                <Sparkles className="h-8 w-8 text-green-400 mb-3 mx-auto group-hover:animate-pulse" />
                <h3 className="font-semibold text-white mb-2">Innovation First</h3>
                <p className="text-sm text-gray-400">Cutting-edge technology solutions</p>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                  <span>Start Your Transformation</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm bg-transparent"
              >
                <Link href="/services" className="flex items-center space-x-2">
                  <span>Explore AI Solutions</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live KPI Stream */}
      <LiveKPIStream />

      {/* Main Content Sections */}
      <AiEnhancedHero />
      <ESGOSModules />
      <SAPAIShowcase />
      <TechInnovationWall />
      <ReelsUseCases />
      <IndustrySolutions />
      <TrustedBySection />

      {/* Voice Copilot Entry Point */}
      <VoiceCopilotEntry />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </main>
  )
}
