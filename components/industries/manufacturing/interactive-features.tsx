"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Cpu, BarChart3, Factory, Zap } from "lucide-react"

export default function InteractiveFeatures() {
  const [activeTab, setActiveTab] = useState("predictive")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Predictive maintenance simulation
  useEffect(() => {
    if (activeTab !== "predictive" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    let animationFrameId: number
    let time = 0

    // Machine health data (simulated)
    const normalRange = { min: 0.7, max: 0.9 }
    const warningThreshold = 0.6
    const criticalThreshold = 0.4

    const machines = [
      { id: 1, name: "CNC Machine 1", health: 0.85, trend: -0.001, x: 100, y: 100 },
      { id: 2, name: "Assembly Robot 2", health: 0.75, trend: -0.002, x: 300, y: 150 },
      { id: 3, name: "Packaging Unit 3", health: 0.65, trend: -0.003, x: 200, y: 250 },
      { id: 4, name: "Inspection System 4", health: 0.55, trend: -0.001, x: 400, y: 300 },
      { id: 5, name: "Conveyor Belt 5", health: 0.45, trend: -0.002, x: 150, y: 350 },
    ]

    const getHealthColor = (health: number) => {
      if (health >= normalRange.min) return "#22c55e" // Green
      if (health >= warningThreshold) return "#eab308" // Yellow
      if (health >= criticalThreshold) return "#ef4444" // Red
      return "#ef4444" // Red
    }

    const drawMachine = (machine: (typeof machines)[0]) => {
      if (!ctx) return

      const radius = 30
      const healthColor = getHealthColor(machine.health)

      // Draw machine circle
      ctx.beginPath()
      ctx.arc(machine.x, machine.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${healthColor === "#22c55e" ? "34, 197, 94" : healthColor === "#eab308" ? "234, 179, 8" : "239, 68, 68"}, 0.2)`
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = healthColor
      ctx.stroke()

      // Draw machine ID
      ctx.font = "bold 16px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(machine.id.toString(), machine.x, machine.y)

      // Draw machine name and health
      ctx.font = "14px Arial"
      ctx.fillStyle = "#aaa"
      ctx.textAlign = "center"
      ctx.fillText(machine.name, machine.x, machine.y + radius + 20)

      ctx.font = "12px Arial"
      ctx.fillStyle = healthColor
      ctx.fillText(`Health: ${Math.round(machine.health * 100)}%`, machine.x, machine.y + radius + 40)

      // Draw prediction line
      if (machine.health < normalRange.min) {
        const predictionSteps = 5
        const predictionPoints = []

        let predictedHealth = machine.health
        for (let i = 1; i <= predictionSteps; i++) {
          predictedHealth += machine.trend * 10
          predictionPoints.push({
            x: machine.x + i * 30,
            y: machine.y - (predictedHealth - 0.5) * 100,
          })
        }

        ctx.beginPath()
        ctx.moveTo(machine.x, machine.y)
        for (const point of predictionPoints) {
          ctx.lineTo(point.x, point.y)
        }

        ctx.strokeStyle = "rgba(239, 68, 68, 0.5)"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw maintenance alert if critical
        if (machine.health < criticalThreshold) {
          ctx.font = "bold 12px Arial"
          ctx.fillStyle = "#ef4444"
          ctx.fillText("MAINTENANCE REQUIRED", machine.x, machine.y - radius - 10)
        } else if (machine.health < warningThreshold) {
          ctx.font = "bold 12px Arial"
          ctx.fillStyle = "#eab308"
          ctx.fillText("MAINTENANCE SOON", machine.x, machine.y - radius - 10)
        }
      }
    }

    const connectMachines = () => {
      if (!ctx) return

      for (let i = 0; i < machines.length; i++) {
        for (let j = i + 1; j < machines.length; j++) {
          const machine1 = machines[i]
          const machine2 = machines[j]

          ctx.beginPath()
          ctx.moveTo(machine1.x, machine1.y)
          ctx.lineTo(machine2.x, machine2.y)
          ctx.strokeStyle = "rgba(59, 130, 246, 0.2)"
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    const animate = () => {
      if (!ctx) return

      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update machine health based on trend
      machines.forEach((machine) => {
        machine.health += machine.trend
        if (machine.health < 0.3) {
          machine.health = 0.3
          machine.trend = 0
        }
      })

      // Draw connections between machines
      connectMachines()

      // Draw machines
      machines.forEach(drawMachine)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [activeTab])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="gradient-text">Manufacturing Intelligence</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our interactive visualizations to see how our AI-powered solutions transform manufacturing
            operations.
          </p>
        </div>

        <Tabs defaultValue="predictive" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="predictive" className="flex items-center gap-2 py-3">
                <Cpu className="h-5 w-5" />
                <span className="hidden sm:inline">Predictive Maintenance</span>
              </TabsTrigger>
              <TabsTrigger value="production" className="flex items-center gap-2 py-3">
                <Factory className="h-5 w-5" />
                <span className="hidden sm:inline">Production Optimization</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 py-3">
                <BarChart3 className="h-5 w-5" />
                <span className="hidden sm:inline">Real-time Analytics</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <TabsContent value="predictive" className="mt-0">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Cpu className="h-6 w-6 text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold">Predictive Maintenance Simulation</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  This interactive visualization shows how our AI algorithms monitor equipment health in real-time,
                  predict failures before they occur, and recommend maintenance actions.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
                      <canvas ref={canvasRef} className="w-full h-[400px]"></canvas>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        Normal Operation
                      </h4>
                      <p className="text-sm text-gray-300">
                        Equipment operating within normal parameters with no maintenance required.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        Warning Zone
                      </h4>
                      <p className="text-sm text-gray-300">
                        Equipment showing early signs of degradation. Maintenance should be scheduled.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        Critical Zone
                      </h4>
                      <p className="text-sm text-gray-300">
                        Equipment at high risk of failure. Immediate maintenance required.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                      <h4 className="font-bold mb-2 flex items-center">
                        <Zap className="h-4 w-4 text-blue-400 mr-2" />
                        AI Insights
                      </h4>
                      <p className="text-sm text-gray-300">
                        Our AI has detected that CNC Machine 1 will require maintenance in approximately 7 days based on
                        current degradation patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="production" className="mt-0">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Factory className="h-6 w-6 text-purple-400 mr-3" />
                  <h3 className="text-xl font-bold">Production Optimization</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  See how our AI algorithms optimize production schedules, resource allocation, and workflow to maximize
                  throughput and efficiency.
                </p>

                <div className="bg-gray-950 rounded-lg border border-gray-800 p-6 h-[400px] flex items-center justify-center">
                  <p className="text-gray-400">Select this tab to load the production optimization visualization</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-400 mr-3" />
                  <h3 className="text-xl font-bold">Real-time Analytics</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Explore real-time manufacturing analytics that provide actionable insights for continuous improvement.
                </p>

                <div className="bg-gray-950 rounded-lg border border-gray-800 p-6 h-[400px] flex items-center justify-center">
                  <p className="text-gray-400">Select this tab to load the real-time analytics visualization</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}
