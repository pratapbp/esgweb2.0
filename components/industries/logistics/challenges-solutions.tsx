"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle,
  Truck,
  Package,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react"

const challenges = [
  {
    id: "visibility",
    icon: AlertTriangle,
    title: "Limited Supply Chain Visibility",
    description: "Lack of real-time tracking and visibility across the entire supply chain network",
    impact: "High",
    color: "red",
  },
  {
    id: "routing",
    icon: Truck,
    title: "Inefficient Route Planning",
    description: "Manual route optimization leading to increased fuel costs and delivery delays",
    impact: "High",
    color: "orange",
  },
  {
    id: "inventory",
    icon: Package,
    title: "Inventory Management Issues",
    description: "Overstocking, stockouts, and poor demand forecasting accuracy",
    impact: "Medium",
    color: "yellow",
  },
  {
    id: "costs",
    icon: DollarSign,
    title: "Rising Operational Costs",
    description: "Increasing transportation, warehousing, and labor costs impacting margins",
    impact: "High",
    color: "red",
  },
]

const solutions = [
  {
    id: "visibility",
    icon: BarChart3,
    title: "AI-Powered Supply Chain Visibility",
    description: "Real-time tracking and predictive analytics across all supply chain touchpoints",
    benefits: ["99% visibility", "Predictive alerts", "Real-time dashboards"],
    technology: "SAP TM + AI Analytics",
  },
  {
    id: "routing",
    icon: Zap,
    title: "Intelligent Route Optimization",
    description: "AI-driven route planning considering traffic, weather, and delivery constraints",
    benefits: ["30% fuel savings", "25% faster delivery", "Dynamic re-routing"],
    technology: "Machine Learning + SAP EWM",
  },
  {
    id: "inventory",
    icon: Package,
    title: "Predictive Inventory Management",
    description: "AI-powered demand forecasting and automated inventory optimization",
    benefits: ["40% inventory reduction", "95% forecast accuracy", "Automated replenishment"],
    technology: "Predictive AI + SAP IBP",
  },
  {
    id: "costs",
    icon: Shield,
    title: "Cost Optimization Engine",
    description: "Comprehensive cost analysis and optimization across all logistics operations",
    benefits: ["25% cost reduction", "Automated optimization", "ROI tracking"],
    technology: "AI Analytics + SAP Controlling",
  },
]

export function ChallengesSolutions() {
  const [activeTab, setActiveTab] = useState("challenges")
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Challenges & Solutions</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transforming Logistics
            <span className="block text-blue-600">Challenges into Opportunities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how ESGit's AI-powered solutions address the most critical logistics challenges facing modern
            supply chains.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-2 shadow-lg">
            <Button
              variant={activeTab === "challenges" ? "default" : "ghost"}
              onClick={() => setActiveTab("challenges")}
              className="px-6 py-3"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Challenges
            </Button>
            <Button
              variant={activeTab === "solutions" ? "default" : "ghost"}
              onClick={() => setActiveTab("solutions")}
              className="px-6 py-3"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Solutions
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeTab === "challenges" ? challenges : solutions).map((item, index) => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                selectedItem === item.id ? "ring-2 ring-blue-500 shadow-xl" : ""
              }`}
              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      activeTab === "challenges" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  {activeTab === "challenges" && (
                    <Badge variant={item.impact === "High" ? "destructive" : "secondary"} className="text-xs">
                      {item.impact} Impact
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">{item.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4">{item.description}</p>

                {activeTab === "solutions" && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <Badge variant="outline" className="text-xs">
                        {item.technology}
                      </Badge>
                    </div>
                  </div>
                )}

                {selectedItem === item.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button size="sm" className="w-full">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Supply Chain?</h3>
            <p className="text-blue-100 mb-6">
              Let our experts show you how AI can solve your specific logistics challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Download Case Study
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
