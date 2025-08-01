"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlaskConical, Users, FileCheck, Factory, Truck, Brain, TrendingUp, Shield, Zap, Target } from "lucide-react"

const companyTypes = [
  { id: "biotech", label: "Biotech", icon: FlaskConical },
  { id: "generic", label: "Generic", icon: Factory },
  { id: "vaccine", label: "Vaccine", icon: Shield },
  { id: "diagnostic", label: "Diagnostic", icon: Target },
  { id: "api", label: "API Manufacturing", icon: Zap },
]

const useCases = {
  "r-d": {
    title: "R&D Innovation",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-500",
    cases: {
      biotech: {
        title: "LLM-Powered Molecule Property Prediction",
        description: "Accelerate drug discovery with AI-powered molecular analysis and property prediction",
        impact: "65% faster compound identification",
        features: ["AI molecular modeling", "Property prediction algorithms", "Drug-target interaction analysis"],
      },
      generic: {
        title: "Bioequivalence Study Optimization",
        description: "Streamline generic drug development with AI-powered bioequivalence analysis",
        impact: "40% reduction in study duration",
        features: ["Automated study design", "Statistical analysis automation", "Regulatory compliance checking"],
      },
      vaccine: {
        title: "Antigen Design & Optimization",
        description: "AI-driven antigen design for enhanced vaccine efficacy and safety",
        impact: "50% improvement in antigen effectiveness",
        features: ["Immunogenicity prediction", "Antigen optimization", "Safety profile analysis"],
      },
      diagnostic: {
        title: "Biomarker Discovery Platform",
        description: "Machine learning-powered biomarker identification for diagnostic development",
        impact: "3x faster biomarker validation",
        features: ["Pattern recognition algorithms", "Multi-omics data integration", "Validation automation"],
      },
      api: {
        title: "Process Chemistry Optimization",
        description: "AI-optimized synthesis pathways for efficient API manufacturing",
        impact: "30% yield improvement",
        features: ["Reaction pathway optimization", "Yield prediction models", "Process parameter tuning"],
      },
    },
  },
  "clinical-trials": {
    title: "Clinical Trials",
    icon: Users,
    color: "from-purple-500 to-blue-500",
    cases: {
      biotech: {
        title: "NLP Patient Eligibility & GenAI Trial Design",
        description: "Intelligent patient matching and automated trial protocol generation",
        impact: "45% faster patient enrollment",
        features: ["NLP patient screening", "Automated protocol generation", "Real-time enrollment tracking"],
      },
      generic: {
        title: "Bioequivalence Trial Automation",
        description: "Streamlined bioequivalence studies with automated data collection and analysis",
        impact: "60% reduction in trial management overhead",
        features: ["Automated data capture", "Statistical analysis workflows", "Regulatory reporting"],
      },
      vaccine: {
        title: "Immunogenicity Trial Management",
        description: "Specialized trial management for vaccine immunogenicity and safety studies",
        impact: "35% improvement in data quality",
        features: ["Immunological endpoint tracking", "Adverse event monitoring", "Efficacy analysis"],
      },
      diagnostic: {
        title: "Clinical Validation Studies",
        description: "Comprehensive clinical validation for diagnostic accuracy and reliability",
        impact: "50% faster validation completion",
        features: ["Sensitivity/specificity analysis", "Clinical utility assessment", "Regulatory submission prep"],
      },
      api: {
        title: "Pharmacokinetic Study Optimization",
        description: "Enhanced PK/PD studies for API characterization and optimization",
        impact: "40% more accurate dosing models",
        features: ["PK/PD modeling", "Dose optimization", "Bioavailability analysis"],
      },
    },
  },
  regulatory: {
    title: "Regulatory Affairs",
    icon: FileCheck,
    color: "from-green-500 to-emerald-500",
    cases: {
      biotech: {
        title: "AI Compliance Checker (FDA, EMA, CDSCO)",
        description: "Automated regulatory compliance verification across multiple jurisdictions",
        impact: "99.8% compliance accuracy",
        features: ["Multi-jurisdiction compliance", "Automated document review", "Regulatory intelligence"],
      },
      generic: {
        title: "ANDA Submission Automation",
        description: "Streamlined ANDA preparation and submission with AI-powered document generation",
        impact: "70% faster submission preparation",
        features: ["Automated ANDA compilation", "Bioequivalence documentation", "FDA correspondence tracking"],
      },
      vaccine: {
        title: "BLA/MAA Preparation Platform",
        description: "Comprehensive biologics license application preparation and management",
        impact: "80% reduction in preparation time",
        features: ["BLA document automation", "CMC section generation", "Clinical data compilation"],
      },
      diagnostic: {
        title: "510(k) Submission Management",
        description: "Automated 510(k) preparation for diagnostic device approvals",
        impact: "65% faster FDA clearance",
        features: ["Predicate device analysis", "Substantial equivalence documentation", "Clinical data integration"],
      },
      api: {
        title: "DMF Management System",
        description: "Comprehensive drug master file management and maintenance",
        impact: "90% reduction in DMF update time",
        features: ["Automated DMF updates", "Change control management", "Regulatory correspondence"],
      },
    },
  },
  manufacturing: {
    title: "Manufacturing",
    icon: Factory,
    color: "from-orange-500 to-red-500",
    cases: {
      biotech: {
        title: "SAP MII + AI Quality Control",
        description: "Intelligent manufacturing execution with AI-powered quality control systems",
        impact: "95% reduction in quality deviations",
        features: ["Real-time quality monitoring", "Predictive quality analytics", "Automated batch release"],
      },
      generic: {
        title: "Continuous Manufacturing Optimization",
        description: "AI-optimized continuous manufacturing processes for generic drug production",
        impact: "40% increase in manufacturing efficiency",
        features: [
          "Process optimization algorithms",
          "Real-time parameter adjustment",
          "Quality by design implementation",
        ],
      },
      vaccine: {
        title: "Bioreactor Process Control",
        description: "Advanced bioreactor control systems for vaccine production optimization",
        impact: "30% improvement in yield consistency",
        features: ["Bioreactor optimization", "Cell culture monitoring", "Harvest timing optimization"],
      },
      diagnostic: {
        title: "Assay Manufacturing Excellence",
        description: "Precision manufacturing systems for diagnostic assay production",
        impact: "99.9% assay consistency",
        features: ["Precision liquid handling", "Quality control automation", "Lot-to-lot consistency monitoring"],
      },
      api: {
        title: "Chemical Process Optimization",
        description: "AI-driven chemical process optimization for API manufacturing",
        impact: "25% cost reduction",
        features: ["Reaction optimization", "Yield maximization", "Waste minimization"],
      },
    },
  },
  distribution: {
    title: "Distribution",
    icon: Truck,
    color: "from-indigo-500 to-purple-500",
    cases: {
      biotech: {
        title: "Cold Chain Monitoring + Blockchain Validation",
        description: "End-to-end cold chain integrity with blockchain-based validation",
        impact: "99.9% cold chain compliance",
        features: ["Real-time temperature monitoring", "Blockchain audit trail", "Automated deviation alerts"],
      },
      generic: {
        title: "Global Distribution Network",
        description: "Optimized global distribution with AI-powered logistics management",
        impact: "50% reduction in distribution costs",
        features: ["Route optimization", "Inventory management", "Demand forecasting"],
      },
      vaccine: {
        title: "Ultra-Cold Chain Management",
        description: "Specialized ultra-cold chain management for mRNA and other sensitive vaccines",
        impact: "100% temperature integrity maintenance",
        features: [
          "Ultra-low temperature monitoring",
          "Specialized packaging solutions",
          "Emergency response protocols",
        ],
      },
      diagnostic: {
        title: "Point-of-Care Distribution",
        description: "Efficient distribution network for point-of-care diagnostic devices",
        impact: "60% faster delivery to clinics",
        features: ["Last-mile optimization", "Inventory tracking", "Expiry management"],
      },
      api: {
        title: "Bulk Chemical Logistics",
        description: "Specialized logistics for bulk API transportation and storage",
        impact: "35% improvement in logistics efficiency",
        features: ["Bulk handling optimization", "Contamination prevention", "Regulatory compliance tracking"],
      },
    },
  },
}

export default function UseCases() {
  const [selectedArea, setSelectedArea] = useState("r-d")
  const [selectedType, setSelectedType] = useState("biotech")

  const currentUseCase = useCases[selectedArea as keyof typeof useCases]
  const currentCase = currentUseCase.cases[selectedType as keyof typeof currentUseCase.cases]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">Pharma AI Use Cases</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Solutions
            </span>{" "}
            Across the Value Chain
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how our AI and SAP solutions transform every aspect of pharmaceutical operations, from R&D to
            distribution.
          </p>
        </motion.div>

        {/* Company Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {companyTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 ${
                  selectedType === type.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "hover:bg-purple-50"
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span>{type.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Use Cases Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Tabs value={selectedArea} onValueChange={setSelectedArea} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/50 backdrop-blur-sm">
              {Object.entries(useCases).map(([key, area]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  <area.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{area.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(useCases).map(([key, area]) => (
              <TabsContent key={key} value={key}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${key}-${selectedType}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-xl">
                      <CardHeader className={`bg-gradient-to-r ${area.color} text-white p-8`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                              <area.icon className="w-8 h-8" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl font-bold mb-2">{currentCase.title}</CardTitle>
                              <p className="text-white/90">{area.title} Solution</p>
                            </div>
                          </div>
                          <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                            {currentCase.impact}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Description */}
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Solution Overview</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">{currentCase.description}</p>

                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Capabilities</h4>
                            <div className="space-y-3">
                              {currentCase.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${area.color}`} />
                                  <span className="text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Visual/Metrics */}
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6">Implementation Impact</h4>

                            {/* Impact Visualization */}
                            <div className="space-y-6">
                              <div className="text-center">
                                <div
                                  className={`text-4xl font-bold bg-gradient-to-r ${area.color} bg-clip-text text-transparent mb-2`}
                                >
                                  {currentCase.impact}
                                </div>
                                <div className="text-gray-600">Primary Impact Metric</div>
                              </div>

                              {/* Additional Metrics */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-white rounded-lg">
                                  <div className="text-2xl font-bold text-gray-900">99.8%</div>
                                  <div className="text-sm text-gray-600">Accuracy</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg">
                                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                                  <div className="text-sm text-gray-600">Monitoring</div>
                                </div>
                              </div>

                              {/* Technology Stack */}
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-3">Technology Stack</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline">SAP Integration</Badge>
                                  <Badge variant="outline">GenAI</Badge>
                                  <Badge variant="outline">Machine Learning</Badge>
                                  <Badge variant="outline">Blockchain</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                          <Button className={`bg-gradient-to-r ${area.color} hover:opacity-90 text-white flex-1`}>
                            <Brain className="w-4 h-4 mr-2" />
                            Explore Solution
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            View Case Study
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
