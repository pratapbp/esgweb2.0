"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, Download, Zap, TrendingUp, Users, CheckCircle } from "lucide-react"

const retailCategories = [
  "Fashion & Apparel",
  "Grocery & Food",
  "Electronics & Technology",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
  "Automotive",
  "Books & Media",
  "Jewelry & Accessories",
  "Other",
]

const transactionVolumes = [
  "Under $1M annually",
  "$1M - $10M annually",
  "$10M - $50M annually",
  "$50M - $100M annually",
  "$100M - $500M annually",
  "$500M+ annually",
]

const sapSystems = [
  "SAP S/4HANA",
  "SAP Commerce Cloud",
  "SAP Emarsys",
  "SAP Analytics Cloud",
  "SAP Ariba",
  "SAP SuccessFactors",
  "SAP Concur",
  "No SAP systems",
  "Not sure",
]

const personalizationGoals = [
  "Product recommendations",
  "Dynamic pricing",
  "Personalized marketing",
  "Customer segmentation",
  "Inventory optimization",
  "Fraud prevention",
  "Customer service automation",
  "Supply chain optimization",
]

export default function SolutionForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    retailCategory: "",
    transactionVolume: "",
    existingSapSystems: [] as string[],
    personalizationGoals: [] as string[],
    currentChallenges: "",
    timeframe: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/retail-blueprint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckboxChange = (
    field: "existingSapSystems" | "personalizationGoals",
    value: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }))
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="shadow-xl border-2 border-green-200/50 dark:border-green-700/50">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">Thank You!</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Your retail AI roadmap is being generated. Our experts will contact you within 24 hours with:
                </p>
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Personalized solution architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">SAP optimization checklist</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">ROI projections and timeline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Downloadable blueprint document</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Interim Guide
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
            >
              📝 Retail Solution Form
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get Your Custom Retail AI Blueprint
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Tell us about your retail business and receive a personalized AI transformation roadmap with SAP
              optimization recommendations
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-2 border-blue-200/50 dark:border-blue-700/50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Brain className="w-8 h-8" />
                GPT-Enhanced Retail Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Contact Name *
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Business Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Retail Category *</Label>
                    <Select
                      value={formData.retailCategory}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, retailCategory: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your retail category" />
                      </SelectTrigger>
                      <SelectContent>
                        {retailCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Transaction Volume *
                    </Label>
                    <Select
                      value={formData.transactionVolume}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, transactionVolume: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select transaction volume" />
                      </SelectTrigger>
                      <SelectContent>
                        {transactionVolumes.map((volume) => (
                          <SelectItem key={volume} value={volume}>
                            {volume}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Existing SAP Systems */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">
                    Existing SAP Systems (select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {sapSystems.map((system) => (
                      <div key={system} className="flex items-center space-x-2">
                        <Checkbox
                          id={system}
                          checked={formData.existingSapSystems.includes(system)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("existingSapSystems", system, checked as boolean)
                          }
                        />
                        <Label htmlFor={system} className="text-sm text-slate-700 dark:text-slate-300">
                          {system}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalization Goals */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">
                    Personalization Goals (select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {personalizationGoals.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.personalizationGoals.includes(goal)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("personalizationGoals", goal, checked as boolean)
                          }
                        />
                        <Label htmlFor={goal} className="text-sm text-slate-700 dark:text-slate-300">
                          {goal}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Challenges */}
                <div>
                  <Label htmlFor="currentChallenges" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Current Challenges & Pain Points
                  </Label>
                  <Textarea
                    id="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={(e) => setFormData((prev) => ({ ...prev, currentChallenges: e.target.value }))}
                    placeholder="Describe your main retail challenges, technology gaps, or areas for improvement..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                {/* Timeline and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Implementation Timeframe
                    </Label>
                    <Select
                      value={formData.timeframe}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, timeframe: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                        <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long">Long-term (12+ months)</SelectItem>
                        <SelectItem value="exploring">Just exploring options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Budget Range</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50k">Under $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                        <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="over-1m">Over $1M</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* What You'll Receive */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200/50 dark:border-blue-700/50">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    What You'll Receive:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Retail AI roadmap & architecture
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Users className="w-4 h-4 text-blue-600" />
                      SAP optimization checklist
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Brain className="w-4 h-4 text-purple-600" />
                      ROI projections & timeline
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Download className="w-4 h-4 text-indigo-600" />
                      Downloadable blueprint
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Generating Blueprint...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Generate My Retail AI Blueprint
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                    Our experts will contact you within 24 hours with your personalized recommendations
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
