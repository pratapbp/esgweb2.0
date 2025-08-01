"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-web"), { ssr: false })
// Import the animation data
import dataFlowAnimation from "/animations/data-flow.json"

export default function SAPHero() {
  const lottieRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8])

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Separate the Lottie initialization into its own useEffect to ensure it only runs client-side
  useEffect(() => {
    // Skip if not client side or ref isn't ready
    if (!isClient || !lottieRef.current) return

    // Use dynamic import for lottie-web to ensure it only loads on the client
    import("lottie-web").then((LottieModule) => {
      try {
        const anim = LottieModule.default.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: dataFlowAnimation,
        })

        return () => {
          anim.destroy()
        }
      } catch (error) {
        console.error("Failed to initialize Lottie animation:", error)
      }
    })
  }, [isClient]) // Only run when isClient changes to true

  return (
    <div ref={containerRef} className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
      {/* Hero content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto text-white"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            SAP Services
          </span>{" "}
          Enhanced with Gen AI
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8 leading-relaxed">
          Transform your enterprise operations with our AI-powered SAP solutions offering advanced analytics,
          automation, and intelligent process optimization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-3 px-8 text-lg">
            Explore Solutions
          </Button>
          <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-900/20 py-3 px-8 text-lg">
            Schedule Consultation
          </Button>
        </div>

        {/* Animated workflow diagram */}
        <div className="w-full max-w-4xl mx-auto h-64 md:h-80">
          {isClient && <div ref={lottieRef} className="w-full h-full"></div>}
        </div>
      </motion.div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
        {isClient && (
          <Image
            src="/abstract-digital-background.png"
            alt="Digital Transformation Background"
            fill
            priority
            className="object-cover opacity-40"
          />
        )}
        {/* Animated particles or light effects could be added here */}
        <div className="absolute inset-0 bg-blue-900/10"></div>
      </div>
    </div>
  )
}
