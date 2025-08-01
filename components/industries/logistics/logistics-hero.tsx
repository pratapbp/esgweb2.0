"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, MapPin, Clock, TrendingUp, Zap } from "lucide-react"

export function LogisticsHero() {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    efficiency: 0,
    cost: 0,
    delivery: 0,
    visibility: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedMetrics({
        efficiency: 45,
        cost: 30,
        delivery: 25,
        visibility: 99,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const floatingElements = [
    { icon: Truck, delay: 0, x: 10, y: 20 },
    { icon: Package, delay: 1000, x: 80, y: 15 },
    { icon: MapPin, delay: 2000, x: 20, y: 70 },
    { icon: Clock, delay: 1500, x: 85, y: 60 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/global-supply-chain.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-purple-900/80" />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}ms`,
            animationDuration: "6s",
          }}
        >
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <element.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Badge className="mb-4 bg-blue-500/20 text-blue-200 border-blue-400/30">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Logistics Revolution
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Intelligent
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Supply Chain
            </span>
            <span className="block text-4xl md:text-5xl mt-2">Orchestration</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your logistics operations with ESGit's AI-first approach. Predictive routing, real-time
            visibility, and autonomous optimization powered by SAP TM/EWM integration.
          </p>
        </div>

        {/* Animated Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{animatedMetrics.efficiency}%</div>
            <div className="text-blue-200 text-sm">Efficiency Gain</div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{animatedMetrics.cost}%</div>
            <div className="text-blue-200 text-sm">Cost Reduction</div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{animatedMetrics.delivery}%</div>
            <div className="text-blue-200 text-sm">Faster Delivery</div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{animatedMetrics.visibility}%</div>
            <div className="text-blue-200 text-sm">Supply Visibility</div>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
            <TrendingUp className="w-5 h-5 mr-2" />
            Start Transformation
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
          >
            <Package className="w-5 h-5 mr-2" />
            View Demo
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
