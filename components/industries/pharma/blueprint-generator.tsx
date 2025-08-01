"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Target,
  Shield,
  TrendingUp,
  Building2,
  Download,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { toast } from "sonner"

interface FormData {
  companyName: string
  companyType: string
  trialPhase: string
  region: string
  manufacturingModel: string
  skuCount: string
  complianceBodies: string[]
  therapeuticArea: string
  timeline: string
  budget: string
  currentChallenges: string
  objectives: string
}

const companyTypes = [
  { value: "biotech", label: "Biotech" },
  { value: "generic", label: "Generic Pharmaceuticals" },
  { value: "vaccine", label: "Vaccine Manufacturer" },
  { value: "diagnostic", label: "Diagnostic Company" },
  { value: "api", label: "API Manufacturing" },
  { value: "cro", label: "Contract Research Organization" },
]

const trialPhases = [
  { value: "preclinical", label: "Preclinical" },
  { value: "phase1", label: "Phase I" },
  { value: "phase2", label: "Phase II" },
  { value: "phase3", label: "Phase III" },
  { value: "phase4", label: "Phase IV" },
  { value: "all", label: "All Phases" },
]

const regions = [
  { value: "us", label: "United States" },
  { value: "eu", label: "European Union" },
  { value: "asia", label: "Asia Pacific" },
  { value: "global", label: "Global" },
  { value: "emerging", label: "Emerging Markets" },
]

const manufacturingModels = [
  { value: "inhouse", label: "In-house Manufacturing" },
  { value: "cmo", label: "Contract Manufacturing (CMO)" },
  { value: "hybrid", label: "Hybrid Model" },
  { value: "virtual", label: "Virtual Manufacturing" },
]

const complianceBodies = [
  { id: "fda", label: "FDA (United States)" },
  { id: "ema", label: "EMA (European Union)" },
  { id: "cdsco", label: "CDSCO (India)" },
  { id: "pmda", label: "PMDA (Japan)" },
  { id: "nmpa", label: "NMPA (China)" },
  { id: "hc", label: "Health Canada" },
  { id: "tga", label: "TGA (Australia)" },
]

const therapeuticAreas = [
  { value: "oncology", label: "Oncology" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "immunology", label: "Immunology" },
  { value: "infectious", label: "Infectious Diseases" },
  { value: "rare", label: "Rare Diseases" },
  { value: "diabetes", label: "Diabetes & Endocrinology" },
]

const timelines = [
  { value: "3months", label: "3 Months" },
  { value: "6months", label: "6 Months" },
  { value: "1year", label: "1 Year" },
  { value: "2years", label: "2+ Years" },
]

const budgets = [
  { value: "100k", label: "$100K - $500K" },
  { value: "500k", label: "$500K - $1M" },
  { value: "1m", label: "$1M - $5M" },
  { value: "5m", label: "$5M+" },
]

export default function BlueprintGenerator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyType: "",
    trialPhase: "",
    region: "",
    manufacturingModel: "",
    skuCount: "",
    complianceBodies: [],
    therapeuticArea: "",
    timeline: "",
    budget: "",
    currentChallenges: "",
    objectives: "",
  })

  const steps = [
    { title: "Company Profile", icon: Building2 },
    { title: "Operations", icon: Target },
    { title: "Compliance", icon: Shield },
    { title: "Objectives", icon: TrendingUp },
  ]

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleComplianceChange = (bodyId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      complianceBodies: checked
        ? [...prev.complianceBodies, bodyId]
        : prev.complianceBodies.filter((id) => id !== bodyId),
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateBlueprint = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate blueprint generation with progress updates
    const progressSteps = [
      { progress: 20, message: "Analyzing company profile..." },
      { progress: 40, message: "Mapping regulatory requirements..." },
      { progress: 60, message: "Designing AI integration points..." },
      { progress: 80, message: "Creating implementation roadmap..." },
      { progress: 100, message: "Finalizing blueprint..." },
    ]

    for (const step of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGenerationProgress(step.progress)
      toast.info(step.message)
    }

    // Simulate API call
    try {
      const response = await fetch("/api/pharma-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsComplete(true)
        toast.success("Blueprint generated successfully!")
      } else {
        throw new Error("Failed to generate blueprint")
      }
    } catch (error) {
      toast.error("Error generating blueprint. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadBlueprint = () => {
    toast.success("Downloading your personalized pharma blueprint...")
    // Simulate download
  }

  const resetForm = () => {
    setCurrentStep(0)
    setIsGenerating(false)
    setGenerationProgress(0)
    setIsComplete(false)
    setFormData({
      companyName: "",
      companyType: "",
      trialPhase: "",
      region: "",
      manufacturingModel: "",
      skuCount: "",
      complianceBodies: [],
      therapeuticArea: "",
      timeline: "",
      budget: "",
      currentChallenges: "",
      objectives: "",
    })
  }

  if (isComplete) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-4">Blueprint Generated Successfully!</h2>
                <p className="text-green-100 text-lg">
                  Your personalized pharma transformation blueprint is ready for download.
                </p>
              </div>

              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Blueprint Includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Regulatory compliance roadmap</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>AI integration strategy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Implementation timeline</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Cost-benefit analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Risk mitigation plan</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Next Steps:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          1
                        </div>
                        <span>Download your blueprint</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          2
                        </div>
                        <span>Schedule consultation call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          3
                        </div>
                        <span>Begin implementation</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={downloadBlueprint} className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Blueprint
                  </Button>
                  <Button onClick={resetForm} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Generate Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  if (isGenerating) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"
                />
                <h2 className="text-2xl font-bold mb-4">Generating Your Blueprint</h2>
                <p className="text-gray-600 mb-6">
                  Our AI is analyzing your requirements and creating a personalized transformation roadmap...
                </p>
                <Progress value={generationProgress} className="mb-4" />
                <p className="text-sm text-gray-500">{generationProgress}% Complete</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Generate Your Pharma Blueprint</h2>
            <p className="text-gray-600 text-lg">
              Get a personalized AI-powered transformation roadmap for your pharmaceutical operations
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      index <= currentStep ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${index < currentStep ? "bg-blue-600" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              {/* Step 0: Company Profile */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-6">Company Profile</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="companyType">Company Type</Label>
                      <Select
                        value={formData.companyType}
                        onValueChange={(value) => handleInputChange("companyType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                        <SelectContent>
                          {companyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="trialPhase">Primary Trial Phase</Label>
                      <Select
                        value={formData.trialPhase}
                        onValueChange={(value) => handleInputChange("trialPhase", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select trial phase" />
                        </SelectTrigger>
                        <SelectContent>
                          {trialPhases.map((phase) => (
                            <SelectItem key={phase.value} value={phase.value}>
                              {phase.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="region">Primary Region</Label>
                      <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Operations */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-6">Operations</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="manufacturingModel">Manufacturing Model</Label>
                      <Select
                        value={formData.manufacturingModel}
                        onValueChange={(value) => handleInputChange("manufacturingModel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select manufacturing model" />
                        </SelectTrigger>
                        <SelectContent>
                          {manufacturingModels.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="skuCount">Number of SKUs</Label>
                      <Input
                        id="skuCount"
                        value={formData.skuCount}
                        onChange={(e) => handleInputChange("skuCount", e.target.value)}
                        placeholder="e.g., 50-100"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="therapeuticArea">Primary Therapeutic Area</Label>
                      <Select
                        value={formData.therapeuticArea}
                        onValueChange={(value) => handleInputChange("therapeuticArea", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select therapeutic area" />
                        </SelectTrigger>
                        <SelectContent>
                          {therapeuticAreas.map((area) => (
                            <SelectItem key={area.value} value={area.value}>
                              {area.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Compliance */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-6">Compliance Requirements</h3>

                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      Regulatory Bodies (Select all that apply)
                    </Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {complianceBodies.map((body) => (
                        <div key={body.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={body.id}
                            checked={formData.complianceBodies.includes(body.id)}
                            onCheckedChange={(checked) => handleComplianceChange(body.id, checked as boolean)}
                          />
                          <Label htmlFor={body.id} className="text-sm font-normal">
                            {body.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Objectives */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-6">Project Objectives</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="timeline">Implementation Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline.value} value={timeline.value}>
                              {timeline.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((budget) => (
                            <SelectItem key={budget.value} value={budget.value}>
                              {budget.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="currentChallenges">Current Challenges</Label>
                      <Textarea
                        id="currentChallenges"
                        value={formData.currentChallenges}
                        onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                        placeholder="Describe your main operational challenges..."
                        rows={3}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="objectives">Key Objectives</Label>
                      <Textarea
                        id="objectives"
                        value={formData.objectives}
                        onChange={(e) => handleInputChange("objectives", e.target.value)}
                        placeholder="What are your main goals for this transformation?"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button onClick={prevStep} variant="outline" disabled={currentStep === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={generateBlueprint} className="bg-blue-600 hover:bg-blue-700">
                    Generate Blueprint
                    <Target className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export { BlueprintGenerator }
