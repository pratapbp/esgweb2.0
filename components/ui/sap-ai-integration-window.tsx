"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Network, Activity, Database, Zap, Shield, Cpu, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import DynamicLogo from "@/components/ui/dynamic-logo"

interface NetworkNode {
  id: string
  label: string
  x: number
  y: number
  color: string
  icon: React.ReactNode
}

interface Connection {
  from: string
  to: string
  animated: boolean
}

const networkNodes: NetworkNode[] = [
  { id: "sap", label: "SAP Hub", x: 50, y: 50, color: "#3b82f6", icon: <Database className="w-4 h-4" /> },
  { id: "ai", label: "AI Engine", x: 25, y: 25, color: "#8b5cf6", icon: <Cpu className="w-4 h-4" /> },
  { id: "ml", label: "ML Models", x: 75, y: 25, color: "#06b6d4", icon: <Zap className="w-4 h-4" /> },
  { id: "iot", label: "IoT Data", x: 25, y: 75, color: "#10b981", icon: <Activity className="w-4 h-4" /> },
  { id: "rpa", label: "RPA Bots", x: 75, y: 75, color: "#f59e0b", icon: <RotateCcw className="w-4 h-4" /> },
  { id: "bi", label: "BI Analytics", x: 15, y: 50, color: "#ef4444", icon: <Shield className="w-4 h-4" /> },
  { id: "erp", label: "ERP Systems", x: 85, y: 50, color: "#84cc16", icon: <Network className="w-4 h-4" /> },
]

const connections: Connection[] = [
  { from: "sap", to: "ai", animated: true },
  { from: "sap", to: "ml", animated: true },
  { from: "sap", to: "iot", animated: true },
  { from: "sap", to: "rpa", animated: true },
  { from: "sap", to: "bi", animated: true },
  { from: "sap", to: "erp", animated: true },
]

const floatingIcons = [
  { icon: <Database className="w-6 h-6" />, delay: 0, color: "#3b82f6" },
  { icon: <Zap className="w-6 h-6" />, delay: 1, color: "#8b5cf6" },
  { icon: <Shield className="w-6 h-6" />, delay: 2, color: "#06b6d4" },
  { icon: <Cpu className="w-6 h-6" />, delay: 3, color: "#10b981" },
]

export default function SAPAIIntegrationWindow() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [processCount, setProcessCount] = useState(1247)
  const [efficiency, setEfficiency] = useState(94.7)
  const [activeConnections, setActiveConnections] = useState<string[]>([])

  const demoStates = [
    {
      title: "Real-time Data Processing",
      description: "AI algorithms processing SAP data streams in real-time",
      activeNodes: ["sap", "ai", "ml"],
    },
    {
      title: "Predictive Analytics Engine",
      description: "Machine learning models predicting business outcomes",
      activeNodes: ["sap", "ml", "bi", "erp"],
    },
    {
      title: "Automated Process Optimization",
      description: "RPA bots optimizing workflows based on AI insights",
      activeNodes: ["sap", "rpa", "iot", "ai"],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoStates.length)
      setProcessCount((prev) => prev + Math.floor(Math.random() * 50))
      setEfficiency((prev) => Math.min(99.9, prev + (Math.random() - 0.5) * 2))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const connectionInterval = setInterval(() => {
      const randomConnection = connections[Math.floor(Math.random() * connections.length)]
      setActiveConnections((prev) => {
        const newConnections = [...prev, `${randomConnection.from}-${randomConnection.to}`]
        return newConnections.slice(-3) // Keep only last 3 active
      })
    }, 1000)

    return () => clearInterval(connectionInterval)
  }, [])

  const currentState = demoStates[currentDemo]

  return (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Browser Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <DynamicLogo variant="window" adaptive={true} />
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>AI Processing</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Data Sync</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative h-96 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Floating Tech Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-gray-600"
            style={{ color: item.color }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: item.delay,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Network Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {connections.map((connection, index) => {
                const fromNode = networkNodes.find((n) => n.id === connection.from)
                const toNode = networkNodes.find((n) => n.id === connection.to)
                if (!fromNode || !toNode) return null

                const isActive = activeConnections.includes(`${connection.from}-${connection.to}`)

                return (
                  <motion.line
                    key={`${connection.from}-${connection.to}`}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={isActive ? "#3b82f6" : "#374151"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray={connection.animated ? "5,5" : "none"}
                    animate={{
                      strokeDashoffset: connection.animated ? [0, -10] : 0,
                      opacity: isActive ? [0.3, 1, 0.3] : 0.3,
                    }}
                    transition={{
                      strokeDashoffset: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      },
                      opacity: {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                  />
                )
              })}
            </svg>

            {/* Network Nodes */}
            {networkNodes.map((node) => {
              const isActive = currentState.activeNodes.includes(node.id)
              const isCentral = node.id === "sap"

              return (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  animate={{
                    scale: isActive ? [1, 1.2, 1] : 1,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className={`relative flex items-center justify-center rounded-full border-2 ${
                      isCentral ? "w-16 h-16" : "w-12 h-12"
                    }`}
                    style={{
                      backgroundColor: `${node.color}20`,
                      borderColor: node.color,
                    }}
                  >
                    <div style={{ color: node.color }}>{node.icon}</div>

                    {/* Pulsing Ring for Active Nodes */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: node.color }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </div>

                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs text-gray-400 font-medium">{node.label}</span>
                  </div>
                </motion.div>
              )
            })}

            {/* Data Flow Particles */}
            <AnimatePresence>
              {currentState.activeNodes.includes("sap") && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                        ease: "easeOut",
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Content Card */}
      <div className="relative p-6 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Network className="w-6 h-6 text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white">SAP & AI Integration</h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentDemo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-blue-400 mb-2">{currentState.title}</h4>
                <p className="text-gray-300 mb-4">{currentState.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-gray-400">Active</span>
              </div>

              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">AI Processing</span>
              </div>

              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Data Sync</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-3">
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-right">
                <div className="text-gray-400">Processes</div>
                <div className="text-xl font-bold text-green-400">{processCount.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400">Efficiency</div>
                <div className="text-xl font-bold text-blue-400">{efficiency.toFixed(1)}%</div>
              </div>
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
