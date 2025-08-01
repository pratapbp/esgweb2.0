"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Hospital,
  Video,
  FlaskConical,
  CreditCard,
  UserPlus,
  FileCheck,
  Eye,
  Users,
  Phone,
  Brain,
  Database,
  Cloud,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

const useCases = {
  hospital: [
    {
      function: "Patient Intake",
      useCase: "Kiosk + GenAI onboarding → SAP ID creation",
      icon: UserPlus,
      description:
        "Streamlined patient registration with AI-powered data collection and automatic SAP profile creation.",
      features: ["Multilingual support", "Insurance verification", "Medical history capture", "Appointment scheduling"],
      kpi: "60% faster intake process",
    },
    {
      function: "Claims & Billing",
      useCase: "RPA + LLM for clean claim validation & routing",
      icon: FileCheck,
      description: "Intelligent claim processing with AI validation and automated routing to appropriate payers.",
      features: ["Pre-submission validation", "Coding optimization", "Denial prevention", "Automated appeals"],
      kpi: "97% first-pass acceptance rate",
    },
    {
      function: "Diagnostics",
      useCase: "AI vision model (CT/MRI/X-Ray) connected to patient SAP profile",
      icon: Eye,
      description: "Advanced medical imaging analysis with AI-powered diagnostics integrated into patient records.",
      features: ["Real-time analysis", "Anomaly detection", "Comparative studies", "Report generation"],
      kpi: "40% faster diagnosis time",
    },
  ],
  telehealth: [
    {
      function: "Virtual Consultations",
      useCase: "AI-powered video platform with real-time health monitoring",
      icon: Video,
      description: "Comprehensive telehealth platform with integrated AI diagnostics and patient monitoring.",
      features: ["HD video quality", "Vital sign monitoring", "AI symptom analysis", "Prescription management"],
      kpi: "85% patient satisfaction",
    },
    {
      function: "Remote Monitoring",
      useCase: "IoT device integration with SAP Health for continuous care",
      icon: Phone,
      description: "Continuous patient monitoring through connected devices with automated alert systems.",
      features: ["Wearable integration", "Real-time alerts", "Trend analysis", "Care plan adjustments"],
      kpi: "30% reduction in readmissions",
    },
    {
      function: "Triage & Support",
      useCase: "Multilingual GenAI chatbot with SAP scheduling sync",
      icon: Users,
      description: "Intelligent patient triage and support with automated scheduling and care coordination.",
      features: ["24/7 availability", "Symptom assessment", "Appointment booking", "Care recommendations"],
      kpi: "70% queries resolved automatically",
    },
  ],
  research: [
    {
      function: "Clinical Trial Support",
      useCase: "Smart matching with ESG Copilot NLP",
      icon: FlaskConical,
      description: "AI-powered patient matching for clinical trials with intelligent eligibility screening.",
      features: ["Eligibility screening", "Patient matching", "Consent management", "Progress tracking"],
      kpi: "50% faster recruitment",
    },
    {
      function: "Data Analytics",
      useCase: "Real-world evidence generation from SAP Health data",
      icon: Brain,
      description: "Advanced analytics platform for generating insights from healthcare data.",
      features: ["Predictive modeling", "Outcome analysis", "Population health insights", "Research automation"],
      kpi: "3x faster insights generation",
    },
    {
      function: "Regulatory Compliance",
      useCase: "Automated FDA submission preparation with blockchain audit",
      icon: FileCheck,
      description: "Streamlined regulatory submission process with automated compliance checking.",
      features: ["Document automation", "Compliance validation", "Audit trails", "Submission tracking"],
      kpi: "90% faster submissions",
    },
  ],
  insurance: [
    {
      function: "Claims Processing",
      useCase: "AI-powered fraud detection and automated adjudication",
      icon: CreditCard,
      description: "Intelligent claims processing with fraud detection and automated decision making.",
      features: ["Fraud scoring", "Automated adjudication", "Exception handling", "Provider analytics"],
      kpi: "80% claims processed automatically",
    },
    {
      function: "Risk Assessment",
      useCase: "Predictive modeling for member health risks and costs",
      icon: Eye,
      description: "Advanced risk modeling to predict member health outcomes and associated costs.",
      features: ["Risk stratification", "Cost prediction", "Intervention recommendations", "Population analytics"],
      kpi: "25% reduction in medical costs",
    },
    {
      function: "Member Engagement",
      useCase: "Personalized health coaching with AI-driven recommendations",
      icon: Users,
      description: "Personalized member engagement platform with AI-powered health coaching.",
      features: ["Health coaching", "Personalized recommendations", "Wellness programs", "Incentive management"],
      kpi: "40% increase in engagement",
    },
  ],
}

const stackTypes = [
  { id: "sap", label: "SAP Stack", icon: Database, color: "blue" },
  { id: "cloud", label: "Cloud Native", icon: Cloud, color: "green" },
  { id: "copilot", label: "ESGit Copilot", icon: Brain, color: "purple" },
]

export function HealthcareUseCases() {
  const [selectedStack, setSelectedStack] = useState("sap")

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-100 text-green-800">Healthcare AI Use Cases</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Transform Every Aspect of Healthcare</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From patient intake to clinical research, our AI solutions enhance every healthcare workflow with
            intelligent automation.
          </p>
        </motion.div>

        {/* Stack Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            {stackTypes.map((stack) => {
              const IconComponent = stack.icon
              return (
                <Button
                  key={stack.id}
                  variant={selectedStack === stack.id ? "default" : "ghost"}
                  onClick={() => setSelectedStack(stack.id)}
                  className={`mx-1 ${
                    selectedStack === stack.id
                      ? `bg-${stack.color}-500 hover:bg-${stack.color}-600 text-white`
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="mr-2 h-4 w-4" />
                  {stack.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Use Cases Tabs */}
        <Tabs defaultValue="hospital" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="hospital" className="flex items-center space-x-2">
              <Hospital size={16} />
              <span>In-Hospital</span>
            </TabsTrigger>
            <TabsTrigger value="telehealth" className="flex items-center space-x-2">
              <Video size={16} />
              <span>Telehealth</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center space-x-2">
              <FlaskConical size={16} />
              <span>Research</span>
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center space-x-2">
              <CreditCard size={16} />
              <span>Insurance</span>
            </TabsTrigger>
          </TabsList>

          {Object.entries(useCases).map(([category, cases]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((useCase, index) => {
                  const IconComponent = useCase.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <IconComponent size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{useCase.function}</CardTitle>
                              <Badge variant="outline" className="mt-1">
                                {useCase.kpi}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-blue-600 mb-2">{useCase.useCase}</p>
                          <p className="text-gray-600 text-sm">{useCase.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800">Key Features:</h4>
                            <ul className="space-y-1">
                              {useCase.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button className="w-full mt-4 bg-transparent" variant="outline">
                              <Zap className="mr-2 h-4 w-4" />
                              Explore Implementation
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
