"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, BarChart3, Clock, Users, Target, Zap, CheckCircle, ArrowRight } from "lucide-react"

const logisticsChallenges = [
  "Route optimization and fuel costs",
  "Warehouse efficiency and automation",
  "Supply chain visibility",
  "Inventory management",
  "Last-mile delivery optimization",
  "Predictive maintenance",
  "Demand forecasting",
  "Compliance and risk management",
]

const companyTypes = [
  "Transportation & Logistics",
  "E-commerce & Retail",
  "Manufacturing",
  "Distribution & Warehousing",
  "3PL/4PL Provider",
  "Freight Forwarder",
  "Other",
]

const companySizes = ["1-50 employees", "51-200 employees", "201-1000 employees", "1000+ employees"]

export function SmartPlannerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    companyType: "",
    companySize: "",
    location: "",
    challenges: [],
    currentSystems: "",
    timeline: "",
    budget: "",
    additionalInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleChallengeToggle = (challenge) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-12 shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h2>
            <p className="text-lg text-gray-600 mb-8">
              We've received your logistics transformation request. Our AI experts will analyze your requirements and
              contact you within 24 hours with a customized solution blueprint.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">24-Hour Response</div>
                <div className="text-sm text-gray-600">Expert consultation</div>
              </div>
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold">Custom Blueprint</div>
                <div className="text-sm text-gray-600">Tailored solution</div>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">ROI Analysis</div>
                <div className="text-sm text-gray-600">Business impact</div>
              </div>
            </div>
            <Button size="lg" onClick={() => setIsSubmitted(false)}>
              Submit Another Request
            </Button>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Zap className="w-4 h-4 mr-2" />
            Smart Logistics Planner
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Your Custom
            <span className="block text-blue-600">Logistics Blueprint</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your logistics challenges and we'll create a personalized AI-powered solution blueprint with
            ROI projections and implementation roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                What You'll Get
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Custom Solution Blueprint</div>
                    <div className="text-sm text-gray-600">Tailored to your specific challenges</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">ROI Analysis</div>
                    <div className="text-sm text-gray-600">Projected savings and benefits</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Implementation Roadmap</div>
                    <div className="text-sm text-gray-600">Step-by-step transformation plan</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Expert Consultation</div>
                    <div className="text-sm text-gray-600">1-on-1 session with our specialists</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Trusted by Industry Leaders
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  500+ logistics transformations
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  Average 30% cost reduction
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  98% customer satisfaction
                </div>
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center">
                  <Truck className="w-6 h-6 mr-3" />
                  Logistics Transformation Request
                </CardTitle>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Business Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyType">Company Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("companyType", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                        <SelectContent>
                          {companyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size *</Label>
                      <Select onValueChange={(value) => handleInputChange("companySize", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Primary Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, State/Country"
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* Challenges */}
                  <div>
                    <Label className="text-base font-semibold">Primary Logistics Challenges *</Label>
                    <p className="text-sm text-gray-600 mb-4">Select all that apply to your organization</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {logisticsChallenges.map((challenge) => (
                        <div key={challenge} className="flex items-center space-x-2">
                          <Checkbox
                            id={challenge}
                            checked={formData.challenges.includes(challenge)}
                            onCheckedChange={() => handleChallengeToggle(challenge)}
                          />
                          <Label htmlFor={challenge} className="text-sm font-normal">
                            {challenge}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Systems */}
                  <div>
                    <Label htmlFor="currentSystems">Current Systems & Technologies</Label>
                    <Textarea
                      id="currentSystems"
                      value={formData.currentSystems}
                      onChange={(e) => handleInputChange("currentSystems", e.target.value)}
                      placeholder="Describe your current logistics systems, ERP, WMS, TMS, etc."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="timeline">Implementation Timeline</Label>
                      <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                          <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                          <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                          <SelectItem value="long">Long-term (12+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Estimated Budget Range</Label>
                      <Select onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-100k">Under $100K</SelectItem>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                          <SelectItem value="over-5m">Over $5M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      placeholder="Any specific requirements, goals, or questions you'd like us to address..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing Request...
                      </>
                    ) : (
                      <>
                        <Package className="w-5 h-5 mr-2" />
                        Get My Custom Blueprint
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service. We'll only use your
                    information to provide the requested consultation.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
