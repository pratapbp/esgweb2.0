"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Factory, Cloud, Cpu, Zap, Users, Shield } from "lucide-react"

export default function ManufacturingUseCases() {
  const [workflowType, setWorkflowType] = useState("sap-native")

  const useCases = [
    {
      function: "Production Ops",
      useCase: "Digital twins with real-time KPI dashboards",
      icon: <Factory className="h-6 w-6 text-blue-400" />,
      sapNative: {
        workflow: [
          "SAP Digital Manufacturing Cloud → Production Data Integration",
          "SAP S/4HANA → Real-time Manufacturing Execution",
          "SAP Analytics Cloud → KPI Dashboard Creation",
          "SAP Fiori → Mobile Dashboard Access",
        ],
        benefits: ["Native SAP integration", "Single source of truth", "Real-time visibility"],
      },
      cloudNative: {
        workflow: [
          "Azure IoT Hub → Sensor Data Collection",
          "Azure Digital Twins → Virtual Factory Model",
          "Power BI → Advanced Analytics Dashboard",
          "Teams Integration → Collaborative Monitoring",
        ],
        benefits: ["Cloud scalability", "Advanced AI/ML", "Multi-platform integration"],
      },
      kpis: ["OEE improved by 23%", "Downtime reduced by 31%", "Quality score up 18%"],
    },
    {
      function: "Procurement",
      useCase: "Smart vendor scoring & negotiation bots",
      icon: <Cpu className="h-6 w-6 text-green-400" />,
      sapNative: {
        workflow: [
          "SAP Ariba → Vendor Management Platform",
          "SAP S/4HANA → Purchase Order Processing",
          "SAP Concur → Expense Management",
          "SAP Analytics → Vendor Performance Scoring",
        ],
        benefits: ["Integrated procurement", "Automated workflows", "Compliance built-in"],
      },
      cloudNative: {
        workflow: [
          "Azure Cognitive Services → Contract Analysis",
          "Power Automate → Negotiation Bot Workflows",
          "Azure ML → Vendor Risk Scoring",
          "Dynamics 365 → CRM Integration",
        ],
        benefits: ["AI-powered negotiations", "Advanced analytics", "Flexible integrations"],
      },
      kpis: ["Cost savings of 15%", "Vendor onboarding 60% faster", "Contract compliance 95%"],
    },
    {
      function: "Maintenance",
      useCase: "ML-based failure prediction with SAP PM",
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      sapNative: {
        workflow: [
          "SAP Asset Intelligence Network → Asset Monitoring",
          "SAP Plant Maintenance → Work Order Management",
          "SAP S/4HANA → Inventory Integration",
          "SAP Mobile → Field Service Execution",
        ],
        benefits: ["Integrated asset management", "Automated work orders", "Mobile accessibility"],
      },
      cloudNative: {
        workflow: [
          "Azure IoT Central → Equipment Monitoring",
          "Azure Machine Learning → Predictive Models",
          "Power Apps → Mobile Maintenance App",
          "Azure Synapse → Data Analytics Platform",
        ],
        benefits: ["Advanced ML capabilities", "Custom mobile apps", "Big data processing"],
      },
      kpis: ["Maintenance costs down 28%", "Equipment uptime 99.2%", "MTTR reduced by 45%"],
    },
    {
      function: "Quality Control",
      useCase: "AI-inspection from images & IoT sensors",
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      sapNative: {
        workflow: [
          "SAP Quality Management → Quality Planning",
          "SAP S/4HANA → Production Integration",
          "SAP Analytics Cloud → Quality Dashboards",
          "SAP Mobile → Quality Inspections",
        ],
        benefits: ["Integrated quality processes", "Real-time quality data", "Mobile inspections"],
      },
      cloudNative: {
        workflow: [
          "Azure Computer Vision → Image Analysis",
          "Azure IoT → Sensor Data Processing",
          "Azure ML → Defect Detection Models",
          "Power BI → Quality Analytics Dashboard",
        ],
        benefits: ["Advanced computer vision", "Real-time AI analysis", "Custom ML models"],
      },
      kpis: ["Defect detection 99.5%", "Quality costs down 22%", "Customer complaints -67%"],
    },
    {
      function: "Workforce Mgmt",
      useCase: "Copilot for shift planning & skill mapping",
      icon: <Users className="h-6 w-6 text-cyan-400" />,
      sapNative: {
        workflow: [
          "SAP SuccessFactors → Workforce Planning",
          "SAP S/4HANA → Time Management",
          "SAP Analytics Cloud → Workforce Analytics",
          "SAP Fiori → Employee Self-Service",
        ],
        benefits: ["Integrated HR processes", "Automated scheduling", "Employee self-service"],
      },
      cloudNative: {
        workflow: [
          "Microsoft Viva → Employee Experience",
          "Azure OpenAI → Intelligent Scheduling",
          "Power Apps → Shift Management App",
          "Teams → Collaboration Platform",
        ],
        benefits: ["AI-powered scheduling", "Modern employee experience", "Seamless collaboration"],
      },
      kpis: ["Scheduling efficiency +35%", "Employee satisfaction +28%", "Overtime costs -19%"],
    },
  ]

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart Manufacturing <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore how ESGit transforms manufacturing operations across key business functions with AI-powered
            solutions.
          </p>

          <Tabs defaultValue="sap-native" value={workflowType} onValueChange={setWorkflowType} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="sap-native" className="flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  SAP-Native
                </TabsTrigger>
                <TabsTrigger value="cloud-native" className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Cloud-Native
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-900 border-gray-800 h-full hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-gray-800">{useCase.icon}</div>
                        <Badge variant="outline" className="text-xs">
                          {useCase.function}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{useCase.useCase}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <TabsContent value="sap-native" className="mt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-blue-400 mb-2">SAP-Native Workflow</h4>
                            <div className="space-y-2">
                              {useCase.sapNative.workflow.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start text-sm">
                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-300">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-green-400 mb-2">Benefits</h4>
                            <div className="flex flex-wrap gap-1">
                              {useCase.sapNative.benefits.map((benefit, benefitIndex) => (
                                <Badge key={benefitIndex} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="cloud-native" className="mt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-purple-400 mb-2">Cloud-Native Workflow</h4>
                            <div className="space-y-2">
                              {useCase.cloudNative.workflow.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start text-sm">
                                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-300">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-green-400 mb-2">Benefits</h4>
                            <div className="flex flex-wrap gap-1">
                              {useCase.cloudNative.benefits.map((benefit, benefitIndex) => (
                                <Badge key={benefitIndex} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <h4 className="font-semibold text-yellow-400 mb-2">Key Performance Indicators</h4>
                        <div className="space-y-1">
                          {useCase.kpis.map((kpi, kpiIndex) => (
                            <div key={kpiIndex} className="text-sm text-gray-300">
                              • {kpi}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
