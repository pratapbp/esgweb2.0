"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  Users,
  Shield,
  TrendingUp,
  TrendingDown,
  Droplets,
  Zap,
  Recycle,
  Heart,
  GraduationCap,
  Scale,
} from "lucide-react"

export default function ESGDashboard() {
  const esgScore = 78
  const environmentalScore = 82
  const socialScore = 75
  const governanceScore = 77

  const environmentalMetrics = [
    { label: "Carbon Emissions", value: "15,240", unit: "tCO2e", change: -12, icon: Leaf },
    { label: "Water Usage", value: "2.3M", unit: "gallons", change: -8, icon: Droplets },
    { label: "Energy Consumption", value: "45.2", unit: "GWh", change: -15, icon: Zap },
    { label: "Waste Recycled", value: "89", unit: "%", change: 5, icon: Recycle },
  ]

  const socialMetrics = [
    { label: "Employee Satisfaction", value: "4.2", unit: "/5", change: 3, icon: Heart },
    { label: "Diversity Ratio", value: "47", unit: "%", change: 8, icon: Users },
    { label: "Training Hours", value: "32", unit: "hrs/employee", change: 12, icon: GraduationCap },
    { label: "Safety Incidents", value: "0.8", unit: "per 1000", change: -25, icon: Shield },
  ]

  const governanceMetrics = [
    { label: "Board Independence", value: "75", unit: "%", change: 0, icon: Scale },
    { label: "Ethics Training", value: "98", unit: "%", change: 2, icon: GraduationCap },
    { label: "Audit Score", value: "A+", unit: "", change: 0, icon: Shield },
    { label: "Compliance Rate", value: "99.2", unit: "%", change: 1, icon: Scale },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">ESG Dashboard</h1>
          <p className="text-lg text-gray-600">Environmental, Social & Governance Performance</p>
        </div>

        {/* Overall ESG Score */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Overall ESG Score</CardTitle>
            <CardDescription>Comprehensive sustainability performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">{esgScore}</div>
              <Badge variant="secondary" className="text-lg px-4 py-1">
                Strong Performance
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <Leaf className="w-8 h-8 text-green-600 mx-auto" />
                <div className="font-semibold">Environmental</div>
                <div className="text-2xl font-bold text-green-600">{environmentalScore}</div>
                <Progress value={environmentalScore} className="w-full" />
              </div>
              <div className="text-center space-y-2">
                <Users className="w-8 h-8 text-blue-600 mx-auto" />
                <div className="font-semibold">Social</div>
                <div className="text-2xl font-bold text-blue-600">{socialScore}</div>
                <Progress value={socialScore} className="w-full" />
              </div>
              <div className="text-center space-y-2">
                <Shield className="w-8 h-8 text-purple-600 mx-auto" />
                <div className="font-semibold">Governance</div>
                <div className="text-2xl font-bold text-purple-600">{governanceScore}</div>
                <Progress value={governanceScore} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <Tabs defaultValue="environmental" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="environmental" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Environmental
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Governance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="environmental" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {environmentalMetrics.map((metric, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                    <metric.icon className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {metric.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span className={metric.change > 0 ? "text-green-600" : "text-red-600"}>
                        {Math.abs(metric.change)}% from last year
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialMetrics.map((metric, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                    <metric.icon className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {metric.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : metric.change < 0 ? (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      ) : null}
                      <span
                        className={
                          metric.change > 0 ? "text-green-600" : metric.change < 0 ? "text-red-600" : "text-gray-600"
                        }
                      >
                        {metric.change !== 0 ? `${Math.abs(metric.change)}% from last year` : "No change"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="governance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {governanceMetrics.map((metric, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                    <metric.icon className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {metric.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : metric.change < 0 ? (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      ) : null}
                      <span
                        className={
                          metric.change > 0 ? "text-green-600" : metric.change < 0 ? "text-red-600" : "text-gray-600"
                        }
                      >
                        {metric.change !== 0 ? `${Math.abs(metric.change)}% from last year` : "Maintained"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Key Initiatives */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Key ESG Initiatives</CardTitle>
            <CardDescription>Current sustainability projects and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Carbon Neutral by 2030</h3>
                </div>
                <Progress value={65} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  65% progress towards carbon neutrality through renewable energy adoption and efficiency improvements.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Diversity & Inclusion</h3>
                </div>
                <Progress value={47} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  47% diverse workforce with ongoing programs to reach 50% by 2025.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">Ethical Supply Chain</h3>
                </div>
                <Progress value={92} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  92% of suppliers certified for ethical practices and sustainability standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
