"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Cpu, Network, Zap } from "lucide-react"

export default function AIEnhancedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural network animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = 600
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Neural network nodes
    const nodes: { x: number; y: number; radius: number; vx: number; vy: number }[] = []
    const nodeCount = Math.floor(window.innerWidth / 30)

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw and update nodes
      ctx.fillStyle = "rgba(59, 130, 246, 0.6)"
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Neural Network Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pioneering the Future with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                AI-Powered Solutions
              </span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              At ESG, we combine cutting-edge AI technology with deep industry expertise to transform businesses and
              drive sustainable growth in the digital era.
            </p>
          </motion.div>

          {/* Floating AI Icons */}
          <div className="relative h-64 mt-12">
            <motion.div
              className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Brain className="w-10 h-10 text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                delay: 0.5,
              }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Cpu className="w-12 h-12 text-violet-400" />
              </div>
            </motion.div>

            <motion.div
              className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                delay: 1,
              }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Network className="w-10 h-10 text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -8, 0, 8, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                delay: 1.5,
              }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-violet-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
