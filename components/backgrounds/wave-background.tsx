"use client"

import { useEffect, useRef } from "react"

const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      z: number
      radius: number
      color: string
      speed: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 200)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 0.5 + 0.5, // depth factor (0.5 to 1)
          radius: Math.random() * 1.5 + 0.5,
          color: `rgba(${30 + Math.random() * 50}, ${100 + Math.random() * 100}, ${200 + Math.random() * 55}, ${
            Math.random() * 0.6 + 0.2
          })`,
          speed: Math.random() * 0.2 + 0.1,
        })
      }
    }

    // Create wave effect
    const drawWaves = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * particle.z, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Wave motion
        particle.y += Math.sin(time / 1000 + particle.x / 100) * particle.speed
        particle.x += particle.speed

        // Reset particles that go off screen
        if (particle.x > canvas.width + particle.radius) {
          particle.x = -particle.radius
        }
        if (particle.y > canvas.height + particle.radius || particle.y < -particle.radius) {
          particle.y = Math.random() * canvas.height
        }
      })

      // Draw connections
      ctx.strokeStyle = "rgba(30, 100, 200, 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(() => drawWaves(time + 16))
    }

    window.addEventListener("resize", resize)
    resize()
    drawWaves(0)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 -z-10" />
    </>
  )
}

export default WaveBackground
