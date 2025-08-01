"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Cpu, Network, Braces, Database, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TechIntelligenceWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animation for the canvas background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }[] = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(56, 189, 248, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      // Draw connections between particles
      particles.forEach((particleA, i) => {
        particles.slice(i + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Default fallback image
  const techBackgroundImage = "/interconnected-tech-network.png"

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={techBackgroundImage || "/placeholder.svg?height=800&width=1600&query=technology network"}
          alt="Technology Intelligence Network"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-900/80 to-gray-950/90"></div>
      </div>

      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technology <span className="gradient-text">Intelligence</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our cutting-edge technology stack powers intelligent solutions that drive business transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu className="h-6 w-6" />,
              title: "AI & Machine Learning",
              description:
                "Advanced algorithms and neural networks that learn from your data to deliver predictive insights.",
              color: "from-blue-600 to-cyan-400",
            },
            {
              icon: <Network className="h-6 w-6" />,
              title: "Neural Networks",
              description:
                "Deep learning architectures that mimic human brain function to solve complex business problems.",
              color: "from-violet-600 to-purple-400",
            },
            {
              icon: <Braces className="h-6 w-6" />,
              title: "Natural Language Processing",
              description: "Sophisticated text analysis capabilities that understand and generate human language.",
              color: "from-emerald-600 to-green-400",
            },
            {
              icon: <Database className="h-6 w-6" />,
              title: "Big Data Processing",
              description: "Scalable infrastructure to handle massive datasets and extract meaningful patterns.",
              color: "from-amber-600 to-yellow-400",
            },
            {
              icon: <Server className="h-6 w-6" />,
              title: "Cloud Infrastructure",
              description:
                "Secure, scalable cloud platforms that provide the foundation for your digital transformation.",
              color: "from-red-600 to-pink-400",
            },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${tech.color} w-fit mb-4`}>{tech.icon}</div>
              <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
              <p className="text-gray-400 mb-4">{tech.description}</p>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
            Explore Our Technology Stack <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
