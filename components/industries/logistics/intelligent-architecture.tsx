"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Layers,
  Database,
  Cloud,
  Cpu,
  Shield,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Network,
  BarChart3,
  Truck,
  Package,
} from "lucide-react"

const architectureLayers = [
  {
    id: "presentation",
    title: "Presentation Layer",
    icon: Layers,
    color: "blue",
    description: "User interfaces and dashboards for logistics operations",
    components: [
      "Real-time Logistics Dashboard",
      "Mobile Driver Apps",
      "Customer Portal",
      "Executive Analytics",
      "Alert Management System",
    ],
    technologies: ["React", "Next.js", "Mobile Apps", "PWA"],
    expanded: false,
  },
  {
    id: "intelligence",
    title: "AI Intelligence Layer",
    icon: Cpu,
    color: "purple",
    description: "AI and machine learning engines for logistics optimization",
    components: [
      "Route Optimization Engine",
      "Demand Forecasting AI",
      "Predictive Maintenance",
      "Risk Assessment AI",
      "Performance Analytics",
    ],
    technologies: ["TensorFlow", "PyTorch", "MLflow", "AutoML"],
    expanded: false,
  },
  {
    id: "integration",
    title: "Integration Layer",
    icon: Network,
    color: "green",
    description: "SAP and third-party system integrations",
    components: [
      "SAP TM Integration",
      "SAP EWM Connector",
      "ERP Synchronization",
      "IoT Device Management",
      "API Gateway",
    ],
    technologies: ["SAP PI/PO", "REST APIs", "GraphQL", "Message Queues"],
    expanded: false,
  },
  {
    id: "data",
    title: "Data Management Layer",
    icon: Database,
    color: "orange",
    description: "Data storage, processing, and analytics infrastructure",
    components: [
      "Real-time Data Streaming",
      "Data Lake Storage",
      "Analytics Warehouse",
      "Master Data Management",
      "Data Quality Engine",
    ],
    technologies: ["Apache Kafka", "Snowflake", "Apache Spark", "MongoDB"],
    expanded: false,
  },
  {
    id: "infrastructure",
    title: "Cloud Infrastructure",
    icon: Cloud,
    color: "gray",
    description: "Scalable cloud infrastructure and security",
    components: [
      "Auto-scaling Compute",
      "Load Balancing",
      "Container Orchestration",
      "Backup & Recovery",
      "Monitoring & Logging",
    ],
    technologies: ["AWS/Azure", "Kubernetes", "Docker", "Terraform"],
    expanded: false,
  },
]

const integrationPoints = [
  {
    system: "SAP Transportation Management (TM)",
    description: "Complete transportation planning and execution",
    features: ["Route planning", "Carrier selection", "Freight costing", "Track & trace"],
  },
  {
    system: "SAP Extended Warehouse Management (EWM)",
    description: "Advanced warehouse operations and automation",
    features: ["Inventory management", "Pick optimization", "Labor management", "Quality control"],
  },
  {
    system: "SAP Integrated Business Planning (IBP)",
    description: "Demand planning and supply chain optimization",
    features: ["Demand sensing", "Supply planning", "S&OP", "Risk management"],
  },
  {
    system: "IoT & Sensor Networks",
    description: "Real-time monitoring and data collection",
    features: ["Vehicle tracking", "Temperature monitoring", "Asset tracking", "Condition monitoring"],
  },
]

export function IntelligentArchitecture() {
  const [expandedLayers, setExpandedLayers] = useState(new Set(["intelligence"]))
  const [activeTab, setActiveTab] = useState("architecture")

  const toggleLayer = (layerId) => {
    const newExpanded = new Set(expandedLayers)
    if (newExpanded.has(layerId)) {
      newExpanded.delete(layerId)
    } else {
      newExpanded.add(layerId)
    }
    setExpandedLayers(newExpanded)
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      green: "bg-green-100 text-green-800 border-green-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[color] || colors.gray
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800">
            <Network className="w-4 h-4 mr-2" />
            System Architecture
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Intelligent Logistics
            <span className="block text-indigo-600">Architecture</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the comprehensive AI-powered architecture that drives next-generation logistics operations and
            supply chain optimization.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-2 shadow-lg">
            <Button
              variant={activeTab === "architecture" ? "default" : "ghost"}
              onClick={() => setActiveTab("architecture")}
              className="px-6 py-3"
            >
              <Layers className="w-5 h-5 mr-2" />
              Architecture
            </Button>
            <Button
              variant={activeTab === "integrations" ? "default" : "ghost"}
              onClick={() => setActiveTab("integrations")}
              className="px-6 py-3"
            >
              <Network className="w-5 h-5 mr-2" />
              Integrations
            </Button>
          </div>
        </div>

        {activeTab === "architecture" && (
          <div className="space-y-6">
            {architectureLayers.map((layer, index) => (
              <Card key={layer.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader
                  className={`cursor-pointer ${getColorClasses(layer.color)} border-b`}
                  onClick={() => toggleLayer(layer.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg bg-white/50`}>
                        <layer.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{layer.title}</CardTitle>
                        <p className="text-sm opacity-80 mt-1">{layer.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white/50">
                        Layer {index + 1}
                      </Badge>
                      {expandedLayers.has(layer.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {expandedLayers.has(layer.id) && (
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Components */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-indigo-600" />
                          Key Components
                        </h4>
                        <div className="space-y-3">
                          {layer.components.map((component, idx) => (
                            <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{component}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-indigo-600" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {layer.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="bg-white">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-6">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            View Technical Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {integrationPoints.map((integration, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-indigo-100 rounded-lg flex-shrink-0">
                    <Network className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{integration.system}</h3>
                    <p className="text-gray-600 mb-4">{integration.description}</p>
                    <div className="space-y-2">
                      {integration.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your Intelligent Logistics Platform?</h3>
            <p className="text-indigo-100 mb-6">
              Our architects will design a custom solution tailored to your specific logistics requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Shield className="w-5 h-5 mr-2" />
                Architecture Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Truck className="w-5 h-5 mr-2" />
                Technical Deep Dive
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
