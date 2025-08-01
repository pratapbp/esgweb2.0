"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Send, CheckCircle, Loader2, Smartphone, Users, Database, Zap, Shield, Network } from "lucide-react"
import { toast } from "sonner"

const subscriberOptions = [
  { value: "retail", label: "Retail Subscribers", icon: Smartphone },
  { value: "enterprise", label: "Enterprise Customers", icon: Users },
  { value: "mixed", label: "Mixed Portfolio", icon: Network },
]

const stackOptions = [
  { value: "sap-c4c", label: "SAP C4C", description: "Customer Experience" },
  { value: "sap-tm", label: "SAP TM", description: "Telecommunications Management" },
  { value: "legacy-oss", label: "Legacy OSS/BSS", description: "Operations Support Systems" },
  { value: "custom", label: "Custom Systems", description: "Proprietary Solutions" },
]

const useCaseOptions = [
  { value: "churn", label: "Churn Reduction", icon: Users },
  { value: "billing", label: "Billing Optimization", icon: Database },
  { value: "provisioning", label: "Service Provisioning", icon: Zap },
  { value: "network", label: "Network Optimization", icon: Network },
  { value: "security", label: "Security Enhancement", icon: Shield },
]

export default function TelecomBlueprintForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    subscriberBase: "",
    subscriberCount: "",
    networkFootprint: "",
    existingStack: [] as string[],
    priorityUseCases: [] as string[],
    timeline: "",
    budget: "",
    additionalRequirements: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In a real implementation, this would call the API
      const response = await fetch("/api/telecom-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        toast.success("Blueprint generated successfully! Check your email for the detailed transformation plan.")

        // Download blueprint
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `telecom-transformation-blueprint-${Date.now()}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        throw new Error("Failed to generate blueprint")
      }
    } catch (error) {
      toast.error("Failed to generate blueprint. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Blueprint Generated Successfully!</h3>
                <p className="text-gray-300 mb-6">
                  Your personalized telecom transformation blueprint has been generated and sent to your email. The
                  download should start automatically.
                </p>
                <div className="space-y-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                    <Brain className="w-4 h-4 mr-2" />
                    AI-Generated Transformation Plan
                  </Badge>
                  <div className="text-sm text-gray-400">
                    Our team will contact you within 24 hours to discuss implementation details.
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 mb-4">
            Telco Transformation Blueprint
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get Your AI-Powered Blueprint
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Generate a personalized transformation roadmap with SAP GenAI integration, Telecom Copilot configuration,
            and SLA audit integration layer powered by blockchain.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <Brain className="w-6 h-6 text-blue-400" />
                <span>Telecom Transformation Blueprint Generator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-white">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter your company name"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-white">
                      Contact Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="Enter your email address"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Subscriber Base */}
                <div className="space-y-4">
                  <Label className="text-white">Subscriber Base Type *</Label>
                  <RadioGroup
                    value={formData.subscriberBase}
                    onValueChange={(value) => handleInputChange("subscriberBase", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {subscriberOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label
                          htmlFor={option.value}
                          className="flex items-center space-x-2 text-gray-300 cursor-pointer"
                        >
                          <option.icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Subscriber Count and Network Footprint */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subscriberCount" className="text-white">
                      Subscriber Count
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("subscriberCount", value)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                        <SelectValue placeholder="Select subscriber count range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1m">Under 1 Million</SelectItem>
                        <SelectItem value="1m-5m">1-5 Million</SelectItem>
                        <SelectItem value="5m-10m">5-10 Million</SelectItem>
                        <SelectItem value="10m-50m">10-50 Million</SelectItem>
                        <SelectItem value="over-50m">Over 50 Million</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="networkFootprint" className="text-white">
                      Network Footprint
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("networkFootprint", value)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                        <SelectValue placeholder="Select network coverage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local/Regional</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Existing Stack */}
                <div className="space-y-4">
                  <Label className="text-white">Existing Technology Stack (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stackOptions.map((option) => (
                      <div key={option.value} className="flex items-start space-x-3">
                        <Checkbox
                          id={option.value}
                          checked={formData.existingStack.includes(option.value)}
                          onCheckedChange={(checked) =>
                            handleArrayChange("existingStack", option.value, checked as boolean)
                          }
                        />
                        <div className="space-y-1">
                          <Label htmlFor={option.value} className="text-gray-300 cursor-pointer">
                            {option.label}
                          </Label>
                          <p className="text-xs text-gray-400">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Use Cases */}
                <div className="space-y-4">
                  <Label className="text-white">Priority Use Cases (Select up to 3)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {useCaseOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          formData.priorityUseCases.includes(option.value)
                            ? "bg-blue-500/20 border-blue-500/50"
                            : "bg-gray-800/50 border-gray-600/30 hover:border-gray-500/50"
                        }`}
                        onClick={() =>
                          handleArrayChange(
                            "priorityUseCases",
                            option.value,
                            !formData.priorityUseCases.includes(option.value),
                          )
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <option.icon className="w-5 h-5 text-blue-400" />
                          <span className="text-gray-300">{option.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-white">
                      Implementation Timeline
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-months">3 Months</SelectItem>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="12-months">12 Months</SelectItem>
                        <SelectItem value="18-months">18+ Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-white">
                      Budget Range
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1m">Under $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                        <SelectItem value="over-10m">Over $10M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="additionalRequirements" className="text-white">
                    Additional Requirements or Specific Challenges
                  </Label>
                  <Textarea
                    id="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                    placeholder="Describe any specific challenges, compliance requirements, or additional features you need..."
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.companyName || !formData.contactEmail}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Blueprint...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Generate AI Blueprint
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                    onClick={() => window.open("/contact", "_blank")}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>

                {/* Output Preview */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-3">Your Blueprint Will Include:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">SAP GenAI Transformation Map</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">Telecom Copilot Configuration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">SLA Audit Integration Layer</span>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
