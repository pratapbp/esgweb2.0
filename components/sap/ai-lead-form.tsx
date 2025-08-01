"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, UserCheck, Building, Mail, Phone, ArrowRight, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

type Industry = "manufacturing" | "healthcare" | "retail" | "finance" | "energy" | "other"
type SapSystem = "s4hana" | "erp" | "bw" | "successfactors" | "ariba" | "other" | "none"

export default function AILeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "" as Industry,
    sapSystems: [] as SapSystem[],
  })

  const [formStep, setFormStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Simulate AI-powered suggestions
    if (name === "company" && value.length > 3) {
      // In a real implementation, this would be an API call to an AI service
      setTimeout(() => {
        const industries = ["manufacturing", "healthcare", "retail", "finance", "energy"]
        const randomIndustry = industries[Math.floor(Math.random() * industries.length)]
        setAiSuggestion(
          `Based on your company profile, you might be in the ${randomIndustry} industry. We have specialized SAP solutions for this sector.`,
        )
      }, 1000)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const system = value as SapSystem

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        sapSystems: [...prev.sapSystems, system],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        sapSystems: prev.sapSystems.filter((s) => s !== system),
      }))
    }
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
    }, 1500)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Start Your <span className="gradient-text">AI-Enhanced SAP Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with our SAP and AI experts to discover how we can transform your enterprise. Our AI assistant will
            guide your submission for the most relevant response.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* Progress indicators */}
                <div className="flex items-center justify-center mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          formStep === step
                            ? "bg-blue-600 text-white"
                            : formStep > step
                              ? "bg-green-600 text-white"
                              : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {formStep > step ? <Check className="h-5 w-5" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-1 ${formStep > step ? "bg-green-600" : "bg-gray-800"}`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Form Step 1: Basic Information */}
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Let's get to know you</h3>

                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <UserCheck className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your.email@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your company name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your phone number (optional)"
                          />
                        </div>
                      </div>
                    </div>

                    {aiSuggestion && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700 flex items-start"
                      >
                        <Brain className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-blue-200 text-sm">{aiSuggestion}</p>
                      </motion.div>
                    )}

                    <div className="mt-8 flex justify-end">
                      <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Form Step 2: Industry Information */}
                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Tell us about your industry</h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Which industry do you operate in?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { value: "manufacturing", label: "Manufacturing" },
                            { value: "healthcare", label: "Healthcare" },
                            { value: "retail", label: "Retail" },
                            { value: "finance", label: "Financial Services" },
                            { value: "energy", label: "Energy & Utilities" },
                            { value: "other", label: "Other" },
                          ].map((option) => (
                            <div
                              key={option.value}
                              className={`cursor-pointer p-4 rounded-lg border transition-all ${
                                formData.industry === option.value
                                  ? "bg-blue-900/30 border-blue-500"
                                  : "bg-gray-800 border-gray-700 hover:bg-gray-750"
                              }`}
                              onClick={() => setFormData((prev) => ({ ...prev, industry: option.value as Industry }))}
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id={option.value}
                                  name="industry"
                                  value={option.value}
                                  checked={formData.industry === option.value}
                                  onChange={handleRadioChange}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 bg-gray-900"
                                />
                                <label htmlFor={option.value} className="ml-3 block text-gray-200 cursor-pointer">
                                  {option.label}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Which SAP systems are you currently using? (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { value: "s4hana", label: "SAP S/4HANA" },
                            { value: "erp", label: "SAP ERP (ECC)" },
                            { value: "bw", label: "SAP BW/4HANA" },
                            { value: "successfactors", label: "SuccessFactors" },
                            { value: "ariba", label: "SAP Ariba" },
                            { value: "other", label: "Other SAP Products" },
                            { value: "none", label: "None" },
                          ].map((option) => (
                            <div
                              key={option.value}
                              className={`cursor-pointer p-4 rounded-lg border transition-all ${
                                formData.sapSystems.includes(option.value as SapSystem)
                                  ? "bg-blue-900/30 border-blue-500"
                                  : "bg-gray-800 border-gray-700 hover:bg-gray-750"
                              }`}
                              onClick={() => {
                                const system = option.value as SapSystem
                                if (formData.sapSystems.includes(system)) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    sapSystems: prev.sapSystems.filter((s) => s !== system),
                                  }))
                                } else {
                                  if (system === "none") {
                                    setFormData((prev) => ({ ...prev, sapSystems: ["none"] }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      sapSystems: [...prev.sapSystems.filter((s) => s !== "none"), system],
                                    }))
                                  }
                                }
                              }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={option.value}
                                  name="sapSystems"
                                  value={option.value}
                                  checked={formData.sapSystems.includes(option.value as SapSystem)}
                                  onChange={handleCheckboxChange}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-700 bg-gray-900"
                                />
                                <label htmlFor={option.value} className="ml-3 block text-gray-200 cursor-pointer">
                                  {option.label}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        Back
                      </Button>
                      <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Form Step 3: Confirmation */}
                {formStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Confirm your information</h3>

                    <div className="space-y-6">
                      <div className="bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-medium mb-4">Contact Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Name</p>
                            <p className="text-white">{formData.name || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-white">{formData.email || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Company</p>
                            <p className="text-white">{formData.company || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="text-white">{formData.phone || "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-medium mb-4">Industry Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Industry</p>
                            <p className="text-white capitalize">{formData.industry || "Not selected"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">SAP Systems</p>
                            <p className="text-white">
                              {formData.sapSystems.length > 0
                                ? formData.sapSystems.map((system) => system.toUpperCase()).join(", ")
                                : "None selected"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
                        <div className="flex items-start">
                          <Brain className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-blue-200 text-sm mb-2">
                              Our AI has analyzed your profile and identified these potential solutions:
                            </p>
                            <ul className="list-disc list-inside text-blue-200 text-sm space-y-1">
                              <li>SAP S/4HANA implementation with AI analytics</li>
                              <li>Intelligent automation for your industry workflow</li>
                              <li>Custom AI solutions for business process optimization</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700">
                        {submitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank You for Your Submission!</h3>
                <p className="text-gray-300 mb-6">
                  Our team of SAP and AI experts will review your information and contact you within 24 hours with
                  personalized recommendations.
                </p>
                <div className="p-6 bg-gray-800/70 rounded-lg inline-block mx-auto">
                  <p className="text-blue-300 font-semibold mb-2">Your reference number:</p>
                  <p className="text-2xl font-mono font-bold text-white">SAP-{Math.floor(Math.random() * 10000)}-AI</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
