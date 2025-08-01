"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Wifi,
  Globe,
  Shield,
  Server,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Network,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface NetworkTest {
  id: string
  name: string
  status: "pending" | "running" | "success" | "warning" | "error"
  result?: string
  details?: string
  latency?: number
  icon: React.ComponentType<any>
}

export default function NetworkDiagnostics() {
  const [tests, setTests] = useState<NetworkTest[]>([
    {
      id: "connectivity",
      name: "Internet Connectivity",
      status: "pending",
      icon: Wifi,
    },
    {
      id: "dns",
      name: "DNS Resolution",
      status: "pending",
      icon: Globe,
    },
    {
      id: "ssl",
      name: "SSL Certificate",
      status: "pending",
      icon: Shield,
    },
    {
      id: "server",
      name: "Server Response",
      status: "pending",
      icon: Server,
    },
    {
      id: "latency",
      name: "Network Latency",
      status: "pending",
      icon: Zap,
    },
    {
      id: "cdn",
      name: "CDN Performance",
      status: "pending",
      icon: Network,
    },
  ])

  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const runNetworkTests = async () => {
    setIsRunning(true)
    setProgress(0)

    const updatedTests = [...tests]

    for (let i = 0; i < updatedTests.length; i++) {
      const test = updatedTests[i]
      test.status = "running"
      setTests([...updatedTests])

      // Simulate test execution
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate test results
      switch (test.id) {
        case "connectivity":
          test.status = "success"
          test.result = "Connected"
          test.details = "Internet connection is stable"
          break

        case "dns":
          test.status = Math.random() > 0.3 ? "success" : "warning"
          test.result = test.status === "success" ? "Resolved" : "Slow Resolution"
          test.details =
            test.status === "success" ? "DNS resolution working normally" : "DNS resolution is slower than expected"
          test.latency = Math.floor(Math.random() * 100) + 20
          break

        case "ssl":
          test.status = "success"
          test.result = "Valid Certificate"
          test.details = "SSL certificate is valid and trusted"
          break

        case "server":
          test.status = Math.random() > 0.2 ? "success" : "error"
          test.result = test.status === "success" ? "200 OK" : "503 Service Unavailable"
          test.details = test.status === "success" ? "Server responding normally" : "Server is temporarily unavailable"
          test.latency = Math.floor(Math.random() * 500) + 100
          break

        case "latency":
          const latency = Math.floor(Math.random() * 300) + 50
          test.latency = latency
          test.status = latency < 100 ? "success" : latency < 200 ? "warning" : "error"
          test.result = `${latency}ms`
          test.details =
            latency < 100
              ? "Excellent network performance"
              : latency < 200
                ? "Good network performance"
                : "Network performance could be improved"
          break

        case "cdn":
          test.status = Math.random() > 0.4 ? "success" : "warning"
          test.result = test.status === "success" ? "Optimized" : "Suboptimal"
          test.details =
            test.status === "success" ? "CDN is serving content efficiently" : "CDN performance could be improved"
          test.latency = Math.floor(Math.random() * 200) + 50
          break
      }

      setTests([...updatedTests])
      setProgress(((i + 1) / updatedTests.length) * 100)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "running":
        return <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      case "running":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  useEffect(() => {
    runNetworkTests()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Network Diagnostics</h2>
          <p className="text-gray-400">Comprehensive network connectivity and performance testing</p>
        </div>
        <Button onClick={runNetworkTests} disabled={isRunning} className="bg-gradient-to-r from-cyan-600 to-purple-600">
          {isRunning ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Tests Again
            </>
          )}
        </Button>
      </div>

      {/* Progress Bar */}
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Test Progress</span>
              <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Network Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, index) => {
          const IconComponent = test.icon
          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-cyan-400" />
                      <span className="text-lg">{test.name}</span>
                    </div>
                    {getStatusIcon(test.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {test.result && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Result:</span>
                        <span className={`text-sm font-medium ${getStatusColor(test.status)}`}>{test.result}</span>
                      </div>
                      {test.latency && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Latency:</span>
                          <span className="text-sm text-gray-300">{test.latency}ms</span>
                        </div>
                      )}
                    </div>
                  )}
                  {test.details && <p className="text-sm text-gray-400">{test.details}</p>}
                  {test.status === "running" && (
                    <div className="flex items-center gap-2 text-blue-400">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Testing...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Network Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-cyan-400" />
              Connection Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Connection Type:</span>
                <span className="text-gray-300">Broadband</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Effective Type:</span>
                <span className="text-gray-300">4g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Downlink:</span>
                <span className="text-gray-300">10 Mbps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">RTT:</span>
                <span className="text-gray-300">50ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-cyan-400" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">IP Address:</span>
                <span className="text-gray-300">192.168.1.100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ISP:</span>
                <span className="text-gray-300">Example ISP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="text-gray-300">New York, US</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timezone:</span>
                <span className="text-gray-300">EST (UTC-5)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
