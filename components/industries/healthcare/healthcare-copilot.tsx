"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Brain,
  Send,
  Mic,
  MicOff,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Database,
  Workflow,
  Target,
  CheckCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const sampleQueries = [
  "Suggest SAP BTP setup for a 300-bed hospital",
  "List AI KPIs for patient discharge optimization",
  "Build RPA workflow for insurance approvals in Epic + SAP",
  "Design HIPAA-compliant data architecture",
  "Optimize emergency department patient flow",
]

const responseTypes = [
  { id: "process", label: "Process Model", icon: Workflow, color: "blue" },
  { id: "security", label: "Security Checklist", icon: Shield, color: "red" },
  { id: "kpi", label: "KPI Targets", icon: Target, color: "green" },
  { id: "architecture", label: "System Architecture", icon: Database, color: "purple" },
]

const sampleResponses = {
  process: {
    title: "SAP BTP Setup for 300-bed Hospital",
    content: [
      "1. Infrastructure Assessment & Planning",
      "2. SAP Health Cloud Configuration",
      "3. Integration with existing EMR systems",
      "4. AI/ML model deployment on BTP",
      "5. Security & compliance validation",
      "6. Staff training & change management",
    ],
  },
  security: {
    title: "HIPAA Compliance Security Checklist",
    content: [
      "✓ End-to-end encryption for all data transmission",
      "✓ Role-based access control (RBAC) implementation",
      "✓ Audit logging for all system interactions",
      "✓ Regular security assessments and penetration testing",
      "✓ Business Associate Agreements (BAAs) in place",
      "✓ Incident response plan documented and tested",
    ],
  },
  kpi: {
    title: "Patient Discharge Optimization KPIs",
    content: [
      "• Average Length of Stay: Target 15% reduction",
      "• Discharge Processing Time: <2 hours",
      "• Readmission Rate: <10% within 30 days",
      "• Patient Satisfaction Score: >90%",
      "• Bed Turnover Rate: 85% efficiency",
      "• Discharge Planning Accuracy: >95%",
    ],
  },
  architecture: {
    title: "Epic + SAP Integration Architecture",
    content: [
      "Epic EMR → HL7 FHIR API → SAP Integration Suite",
      "SAP S/4HANA → Revenue Management → Claims Processing",
      "RPA Bots → Insurance Verification → Auto-approval Workflow",
      "AI Engine → Claim Validation → Exception Handling",
      "Audit Trail → Compliance Monitoring → Reporting Dashboard",
    ],
  },
}

export function HealthcareCopilot() {
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedResponse, setSelectedResponse] = useState("process")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const handleQuerySubmit = async () => {
    if (!query.trim()) return

    setIsProcessing(true)
    setShowResponse(false)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setShowResponse(true)
    }, 2000)
  }

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery)
    setShowResponse(false)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real implementation, this would start/stop speech recognition
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800">Healthcare Copilot Engine</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Your AI Healthcare Consultant</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant expert guidance on healthcare AI implementation, SAP optimization, and compliance requirements.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Query Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-6 w-6 text-purple-600" />
                    <span>Ask Healthcare Copilot</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Query Input */}
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ask about healthcare AI, SAP implementation, or compliance..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleQuerySubmit()}
                        className="flex-1"
                      />
                      <Button
                        onClick={toggleListening}
                        variant="outline"
                        className={isListening ? "bg-red-50 border-red-200" : ""}
                      >
                        {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Button onClick={handleQuerySubmit} disabled={!query.trim() || isProcessing}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    {isListening && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-red-500 text-sm"
                      >
                        🎤 Listening... Speak your healthcare question
                      </motion.div>
                    )}
                  </div>

                  {/* Sample Queries */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Sample Questions:</h4>
                    <div className="space-y-2">
                      {sampleQueries.map((sampleQuery, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full text-left justify-start h-auto p-3 text-sm"
                          onClick={() => handleSampleQuery(sampleQuery)}
                        >
                          <span className="text-blue-600 mr-2">Q:</span>
                          {sampleQuery}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Response Type Selector */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Response Format:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {responseTypes.map((type) => {
                        const IconComponent = type.icon
                        return (
                          <Button
                            key={type.id}
                            variant={selectedResponse === type.id ? "default" : "outline"}
                            onClick={() => setSelectedResponse(type.id)}
                            className="flex items-center space-x-2"
                          >
                            <IconComponent size={16} />
                            <span className="text-xs">{type.label}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                    <span>AI Response</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center h-64"
                      >
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
                          />
                          <p className="text-gray-600">Processing your healthcare query...</p>
                        </div>
                      </motion.div>
                    ) : showResponse ? (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 mb-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <h3 className="font-semibold text-gray-800">
                            {sampleResponses[selectedResponse as keyof typeof sampleResponses].title}
                          </h3>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {sampleResponses[selectedResponse as keyof typeof sampleResponses].content.map(
                              (item, index) => (
                                <li key={index} className="text-gray-700 text-sm">
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        <div className="flex space-x-2 pt-4">
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Export Report
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Customize
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center h-64 text-gray-400"
                      >
                        <div className="text-center">
                          <Brain size={48} className="mx-auto mb-4" />
                          <p>Ask a question to see AI-powered healthcare insights</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
