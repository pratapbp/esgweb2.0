"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Truck, Package, BarChart3, TrendingUp, Globe, Zap, ArrowRight } from "lucide-react"

export default function SupplyChainOptimization() {
  const [activeView, setActiveView] = useState("overview")

  const supplyChainMetrics = [
    { label: "Inventory Reduction", value: "35%", icon: <Package className="h-5 w-5" />, color: "text-blue-400" },
    { label: "Delivery Performance", value: "98.5%", icon: <Truck className="h-5 w-5" />, color: "text-green-400" },
    { label: "Cost Savings", value: "$2.8M", icon: <TrendingUp className="h-5 w-5" />, color: "text-purple-400" },
    { label: "Forecast Accuracy", value: "94%", icon: <BarChart3 className="h-5 w-5" />, color: "text-yellow-400" },
  ]

  const optimizationSolutions = [
    {
      id: "demand-forecasting",
      title: "AI-Powered Demand Forecasting",
      description:
        "Machine learning algorithms that analyze historical data, market trends, and external factors to predict demand with unprecedented accuracy",
      features: [
        "Multi-variable analysis",
        "Seasonal pattern recognition",
        "Market trend integration",
        "Real-time adjustments",
      ],
      benefits: {
        accuracy: "+45%",
        inventory: "-30%",
        stockouts: "-60%",
      },
    },
    {
      id: "inventory-optimization",
      title: "Intelligent Inventory Management",
      description:
        "Dynamic inventory optimization that balances carrying costs with service levels using advanced algorithms",
      features: [
        "Dynamic safety stock calculation",
        "Multi-echelon optimization",
        "Supplier lead time analysis",
        "Automated reorder points",
      ],
      benefits: {
        carrying_cost: "-25%",
        service_level: "+15%",
        working_capital: "-20%",
      },
    },
    {
      id: "supplier-optimization",
      title: "Supplier Network Optimization",
      description:
        "AI-driven supplier selection and performance optimization to ensure reliable, cost-effective sourcing",
      features: ["Supplier risk assessment", "Performance scoring", "Cost optimization", "Diversification strategies"],
      benefits: {
        cost_reduction: "-18%",
        reliability: "+35%",
        risk_mitigation: "+50%",
      },
    },
  ]

  const supplyChainStages = [
    { name: "Suppliers", status: "optimal", efficiency: 92, issues: 0 },
    { name: "Manufacturing", status: "good", efficiency: 88, issues: 1 },
    { name: "Distribution", status: "optimal", efficiency: 95, issues: 0 },
    { name: "Retail", status: "warning", efficiency: 78, issues: 2 },
    { name: "Customers", status: "optimal", efficiency: 91, issues: 0 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-500"
      case "good":
        return "bg-blue-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-4">
            <Globe className="mr-2 h-4 w-4" />
            Supply Chain Optimization
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Optimize Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Supply Chain
            </span>{" "}
            Operations
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your supply chain with AI-powered optimization that reduces costs, improves efficiency, and
            enhances customer satisfaction through intelligent demand forecasting and inventory management.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {supplyChainMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-gray-800 text-center hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 mb-4 ${metric.color}`}
                  >
                    {metric.icon}
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${metric.color}`}>{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Supply Chain Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 text-blue-400 mr-2" />
                Supply Chain Health Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {supplyChainStages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(stage.status)}`}></div>
                    <div className="text-sm font-medium">{stage.name}</div>
                    <div className="text-xs text-gray-400">{stage.efficiency}%</div>
                    {stage.issues > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {stage.issues} issue{stage.issues > 1 ? "s" : ""}
                      </Badge>
                    )}
                    {index < supplyChainStages.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-600 absolute" style={{ left: `${(index + 1) * 20}%` }} />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-400">98.5%</div>
                  <div className="text-sm text-gray-400">On-Time Delivery</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">2.3 days</div>
                  <div className="text-sm text-gray-400">Average Lead Time</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-purple-400">$2.8M</div>
                  <div className="text-sm text-gray-400">Annual Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Optimization Solutions */}
        <Tabs defaultValue="demand-forecasting" value={activeView} onValueChange={setActiveView} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-3 w-full max-w-3xl">
              <TabsTrigger value="demand-forecasting" className="flex items-center gap-2 py-3">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Demand Forecasting</span>
              </TabsTrigger>
              <TabsTrigger value="inventory-optimization" className="flex items-center gap-2 py-3">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Inventory Management</span>
              </TabsTrigger>
              <TabsTrigger value="supplier-optimization" className="flex items-center gap-2 py-3">
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Supplier Network</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {optimizationSolutions.map((solution) => (
            <TabsContent key={solution.id} value={solution.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 text-lg">{solution.description}</p>

                    <div>
                      <h4 className="font-semibold text-blue-400 mb-3">Key Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {solution.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-400 mb-3">Performance Impact</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(solution.benefits).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-gray-800 rounded-lg">
                            <div className="text-lg font-bold text-green-400">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key.replace("_", " ")}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Learn More About {solution.title}</Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                        Implementation Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Implementation Time</span>
                          <Badge variant="secondary">6-12 weeks</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">ROI Timeline</span>
                          <Badge variant="secondary">3-6 months</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Complexity Level</span>
                          <Badge variant="secondary">Medium</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Integration Required</span>
                          <Badge variant="secondary">ERP, WMS</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle>Success Story</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">
                        "After implementing AI-powered demand forecasting, we reduced inventory costs by 35% while
                        improving service levels. The system pays for itself within 6 months."
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-sm font-bold">JD</span>
                        </div>
                        <div>
                          <div className="font-semibold">John Davis</div>
                          <div className="text-sm text-gray-400">Supply Chain Director, TechManufacturing Inc.</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
