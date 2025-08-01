"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

const useCaseReels = [
  {
    id: 1,
    title: "Predictive Maintenance",
    industry: "Manufacturing",
    description: "AI predicts equipment failures 30 days in advance",
    impact: "40% reduction in downtime",
    duration: "2:30",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Predictive+Maintenance",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Customer Behavior Analysis",
    industry: "Retail",
    description: "Real-time customer journey optimization",
    impact: "65% increase in conversion",
    duration: "1:45",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Customer+Analysis",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Supply Chain Optimization",
    industry: "Logistics",
    description: "AI-powered demand forecasting and inventory management",
    impact: "25% cost reduction",
    duration: "3:15",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Supply+Chain",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Financial Risk Assessment",
    industry: "Banking",
    description: "Real-time fraud detection and risk scoring",
    impact: "90% fraud detection rate",
    duration: "2:00",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Risk+Assessment",
    color: "from-red-500 to-orange-500",
  },
]

export function ReelsUseCases() {
  const [currentReel, setCurrentReel] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextReel = () => {
    setCurrentReel((prev) => (prev + 1) % useCaseReels.length)
    setIsPlaying(false)
  }

  const prevReel = () => {
    setCurrentReel((prev) => (prev - 1 + useCaseReels.length) % useCaseReels.length)
    setIsPlaying(false)
  }

  const currentCase = useCaseReels[currentReel]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800/30 to-gray-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30">
            <Play className="w-4 h-4 mr-2" />
            Interactive Use Cases
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">See AI in Action</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore real-world applications through our interactive video demonstrations
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Player */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReel}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentCase.color} opacity-20`} />
                  <img
                    src={currentCase.thumbnail || "/placeholder.svg"}
                    alt={currentCase.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30"
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </Button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 text-white border-white/20">{currentCase.duration}</Badge>
                  </div>

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevReel}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextReel}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReel}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className={`mb-4 bg-gradient-to-r ${currentCase.color} text-white border-none`}>
                    {currentCase.industry}
                  </Badge>
                  <h3 className="text-3xl font-bold text-luminous-white mb-4">{currentCase.title}</h3>
                  <p className="text-xl text-gray-300 mb-6">{currentCase.description}</p>
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="text-2xl font-bold text-success-green">{currentCase.impact}</div>
                    <div className="text-gray-400">Business Impact</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Reel Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {useCaseReels.map((reel, index) => (
                  <button
                    key={reel.id}
                    onClick={() => {
                      setCurrentReel(index)
                      setIsPlaying(false)
                    }}
                    className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentReel ? "ring-2 ring-electric-cyan scale-105" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={reel.thumbnail || "/placeholder.svg"}
                      alt={reel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${reel.color} opacity-30`} />
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue"
                >
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsPlaying(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
