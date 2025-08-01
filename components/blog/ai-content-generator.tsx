"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const services = [
  "SAP S/4HANA",
  "SAP SuccessFactors",
  "SAP Analytics Cloud",
  "SAP Intelligent Supply Chain",
  "SAP Customer Experience",
]

const industries = ["Manufacturing", "Healthcare", "Financial Services", "Retail", "Energy", "Telecommunications"]

const technologies = [
  "Artificial Intelligence",
  "Machine Learning",
  "Cloud Computing",
  "IoT",
  "Blockchain",
  "Data Analytics",
  "Cybersecurity",
]

export default function AIContentGenerator() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedTechnology, setSelectedTechnology] = useState("")
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    if (!selectedService || !selectedIndustry || !selectedTechnology) return

    setGenerating(true)

    // Simulate API call to generate content
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)

      // In a real implementation, this would redirect to the newly generated blog post
      window.location.href = `/blog/generated-${Date.now()}`
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-500/20 p-2 rounded-full">
          <Sparkles className="h-5 w-5 text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">AI Content Generator</h3>
      </div>

      <p className="text-gray-300 text-sm mb-4">
        Create a custom blog post by selecting combinations of our services, industries, and technologies.
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Select Service</label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="bg-slate-800/70 border-slate-700 text-white">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Select Industry</label>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="bg-slate-800/70 border-slate-700 text-white">
              <SelectValue placeholder="Choose an industry" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Select Technology</label>
          <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
            <SelectTrigger className="bg-slate-800/70 border-slate-700 text-white">
              <SelectValue placeholder="Choose a technology" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              {technologies.map((technology) => (
                <SelectItem key={technology} value={technology}>
                  {technology}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!selectedService || !selectedIndustry || !selectedTechnology || generating}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mt-2"
        >
          {generating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Custom Article"
          )}
        </Button>
      </div>
    </motion.div>
  )
}
