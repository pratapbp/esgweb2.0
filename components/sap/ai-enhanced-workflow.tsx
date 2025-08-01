"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Database,
  Brain,
  Zap,
  Target,
  CheckCircle,
  TrendingUp,
  Clock,
} from "lucide-react"

interface WorkflowStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<any>
  duration: number
  metrics: {
    efficiency: string
    accuracy: string
    timeReduction: string
  }
  details: string[]
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Data Collection & Integration",
    description: "Automated data gathering from multiple SAP modules and external sources",
    icon: Database,
    duration: 3000,
    metrics: {
      efficiency: "95%",
      accuracy: "99.2%",
      timeReduction: "80%",
    },
    details: [
      "Real-time data extraction from SAP S/4HANA",
      "Integration with external APIs and databases",
      "Data validation and cleansing processes",
      "Automated error detection and correction",
    ],
  },
  {
    id: 2,
    title: "AI Processing & Analysis",
    description: "Machine learning algorithms analyze patterns and generate insights",
    icon: Brain,
    duration: 4000,
    metrics: {
      efficiency: "92%",
      accuracy: "96.8%",
      timeReduction: "75%",
    },
    details: [
      "Pattern recognition and anomaly detection",
      "Predictive analytics and forecasting",
      "Natural language processing for unstructured data",
      "Deep learning model execution",
    ],
  },
  {
    id: 3,
    title: "Intelligent Automation",
    description: "Automated decision-making and process execution based on AI insights",
    icon: Zap,
    duration: 2500,
    metrics: {
      efficiency: "98%",
      accuracy: "94.5%",
      timeReduction: "90%",
    },
    details: [
      "Automated workflow triggers and approvals",
      "Dynamic resource allocation",
      "Exception handling and escalation",
      "Process optimization recommendations",
    ],
  },
  {
    id: 4,
    title: "Optimization & Recommendations",
    description: "AI-driven suggestions for process improvements and cost savings",
    icon: Target,
    duration: 3500,
    metrics: {
      efficiency: "89%",
      accuracy: "97.1%",
      timeReduction: "65%",
    },
    details: [
      "Performance bottleneck identification",
      "Cost optimization opportunities",
      "Resource utilization analysis",
      "ROI impact projections",
    ],
  },
  {
    id: 5,
    title: "Results & Reporting",
    description: "Comprehensive dashboards and actionable insights delivery",
    icon: CheckCircle,
    duration: 2000,
    metrics: {
      efficiency: "96%",
      accuracy: "98.7%",
      timeReduction: "85%",
    },
    details: [
      "Real-time dashboard updates",
      "Automated report generation",
      "KPI tracking and alerts",
      "Executive summary creation",
    ],
  },
]

export default function AIEnhancedWorkflow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentStep < workflowSteps.length) {
      const step = workflowSteps[currentStep]
      const increment = 100 / (step.duration / 100)

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCompletedSteps((completed) => [...completed, currentStep])
            setCurrentStep((step) => step + 1)
            return 0
          }
          return prev + increment
        })
      }, 100)
    } else if (currentStep >= workflowSteps.length) {
      setIsPlaying(false)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const handlePlay = () => {
    if (currentStep >= workflowSteps.length) {
      handleReset()
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
    setCompletedSteps([])
  }

  const handleStepClick = (stepIndex: number) => {
    setIsPlaying(false)
    setCurrentStep(stepIndex)
    setProgress(0)
    setCompletedSteps(Array.from({ length: stepIndex }, (_, i) => i))
  }

  const currentStepData = workflowSteps[currentStep] || workflowSteps[workflowSteps.length - 1]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-Enhanced SAP Workflow
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience our intelligent automation process that transforms traditional SAP operations into AI-powered,
          efficient workflows.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button onClick={isPlaying ? handlePause : handlePlay} className="bg-blue-600 hover:bg-blue-700">
          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {workflowSteps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = completedSteps.includes(index)
          const StepIcon = step.icon

          return (
            <Card
              key={step.id}
              className={`cursor-pointer transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-blue-500 shadow-lg scale-105"
                  : isCompleted
                    ? "bg-green-50 border-green-200"
                    : "hover:shadow-md"
              }`}
              onClick={() => handleStepClick(index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <StepIcon
                    className={`h-6 w-6 ${
                      isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <CardTitle className="text-sm">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">{step.description}</CardDescription>
                {isActive && (
                  <div className="mt-3">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Current Step Details */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <currentStepData.icon className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="font-semibold">{currentStepData.metrics.efficiency}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="font-semibold">{currentStepData.metrics.accuracy}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Time Reduction</p>
                <p className="font-semibold">{currentStepData.metrics.timeReduction}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h4 className="font-semibold mb-3">Key Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentStepData.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Overall Progress</h3>
            <Badge variant="outline">
              {completedSteps.length} of {workflowSteps.length} completed
            </Badge>
          </div>
          <Progress value={(completedSteps.length / workflowSteps.length) * 100} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Workflow Status</span>
            <span>
              {completedSteps.length === workflowSteps.length
                ? "Complete"
                : `Step ${currentStep + 1} of ${workflowSteps.length}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
