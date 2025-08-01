"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function BlogFilter() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleReset = () => {
    setSelectedService(null)
    setSelectedIndustry(null)
    setSelectedTechnology(null)
  }

  return (
    <div className="mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-medium text-white">Filter Content</h2>
        </div>

        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
          {isOpen ? "Hide Filters" : "Show Filters"}
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Services</h3>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Button
                  key={service}
                  variant="outline"
                  size="sm"
                  className={`text-xs ${
                    selectedService === service
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700"
                  }`}
                  onClick={() => setSelectedService(selectedService === service ? null : service)}
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Industries</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant="outline"
                  size="sm"
                  className={`text-xs ${
                    selectedIndustry === industry
                      ? "bg-purple-600 text-white border-purple-500"
                      : "bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700"
                  }`}
                  onClick={() => setSelectedIndustry(selectedIndustry === industry ? null : industry)}
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <Button
                  key={technology}
                  variant="outline"
                  size="sm"
                  className={`text-xs ${
                    selectedTechnology === technology
                      ? "bg-green-600 text-white border-green-500"
                      : "bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700"
                  }`}
                  onClick={() => setSelectedTechnology(selectedTechnology === technology ? null : technology)}
                >
                  {technology}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-400 hover:text-white">
              Reset Filters
            </Button>
          </div>
        </motion.div>
      )}

      {/* Active filters display */}
      {(selectedService || selectedIndustry || selectedTechnology) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400">Active filters:</span>
          {selectedService && (
            <span className="px-2 py-1 rounded-full text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {selectedService}
            </span>
          )}
          {selectedIndustry && (
            <span className="px-2 py-1 rounded-full text-xs bg-purple-600/20 text-purple-400 border border-purple-500/30">
              {selectedIndustry}
            </span>
          )}
          {selectedTechnology && (
            <span className="px-2 py-1 rounded-full text-xs bg-green-600/20 text-green-400 border border-green-500/30">
              {selectedTechnology}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
