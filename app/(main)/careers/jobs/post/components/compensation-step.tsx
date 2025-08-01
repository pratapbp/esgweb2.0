"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Plus, X, TrendingUp, Gift, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CompensationStepProps {
  data: {
    salary_min?: number
    salary_max?: number
    benefits: string[]
  }
  errors: Record<string, string>
  onChange: (updates: any) => void
}

const COMMON_BENEFITS = [
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "401(k) Matching",
  "Paid Time Off",
  "Flexible Work Schedule",
  "Remote Work Options",
  "Professional Development Budget",
  "Stock Options/Equity",
  "Life Insurance",
  "Disability Insurance",
  "Parental Leave",
  "Gym Membership",
  "Commuter Benefits",
  "Free Meals/Snacks",
  "Tuition Reimbursement",
  "Conference Attendance",
  "Mental Health Support",
  "Wellness Programs",
  "Employee Discounts",
]

export function CompensationStep({ data, errors, onChange }: CompensationStepProps) {
  const [showSalary, setShowSalary] = useState(Boolean(data.salary_min || data.salary_max))
  const [newBenefit, setNewBenefit] = useState("")
  const [salaryRange, setSalaryRange] = useState([data.salary_min || 60000, data.salary_max || 120000])

  const handleSalaryToggle = (enabled: boolean) => {
    setShowSalary(enabled)
    if (!enabled) {
      onChange({ salary_min: undefined, salary_max: undefined })
    } else {
      onChange({
        salary_min: salaryRange[0],
        salary_max: salaryRange[1],
      })
    }
  }

  const handleSalaryRangeChange = (values: number[]) => {
    setSalaryRange(values)
    if (showSalary) {
      onChange({
        salary_min: values[0],
        salary_max: values[1],
      })
    }
  }

  const addBenefit = (benefit: string) => {
    if (benefit.trim() && !data.benefits.includes(benefit.trim())) {
      const updatedBenefits = [...data.benefits.filter(Boolean), benefit.trim()]
      onChange({ benefits: updatedBenefits })
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    const updatedBenefits = data.benefits.filter((_, i) => i !== index)
    onChange({ benefits: updatedBenefits })
  }

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Salary Information */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Salary Information
          </CardTitle>
          <p className="text-gray-400">Transparent compensation attracts better candidates</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Salary Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <h3 className="text-white font-medium">Include Salary Range</h3>
              <p className="text-sm text-gray-400">Jobs with salary ranges get 30% more applications</p>
            </div>
            <Switch checked={showSalary} onCheckedChange={handleSalaryToggle} />
          </div>

          {/* Salary Range Slider */}
          {showSalary && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-white font-medium">Salary Range</Label>
                <div className="px-4">
                  <Slider
                    value={salaryRange}
                    onValueChange={handleSalaryRangeChange}
                    max={300000}
                    min={30000}
                    step={5000}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Min: {formatSalary(salaryRange[0])}</span>
                  <span className="text-gray-400">Max: {formatSalary(salaryRange[1])}</span>
                </div>
              </div>

              {/* Manual Input */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Minimum Salary</Label>
                  <Input
                    type="number"
                    value={salaryRange[0]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value) || 0
                      handleSalaryRangeChange([value, salaryRange[1]])
                    }}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="60000"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Maximum Salary</Label>
                  <Input
                    type="number"
                    value={salaryRange[1]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value) || 0
                      handleSalaryRangeChange([salaryRange[0], value])
                    }}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="120000"
                  />
                </div>
              </div>

              {/* Salary Insights */}
              <Alert className="border-blue-500/50 bg-blue-500/10">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-400">
                  <strong>Market Insight:</strong> The average salary for similar roles in your area is{" "}
                  {formatSalary(85000)} - {formatSalary(125000)}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {!showSalary && (
            <Alert className="border-yellow-500/50 bg-yellow-500/10">
              <Info className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-400">
                Consider including a salary range. Jobs with transparent compensation receive significantly more
                qualified applications.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Benefits & Perks */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            Benefits & Perks
          </CardTitle>
          <p className="text-gray-400">Highlight what makes your company a great place to work</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selected Benefits */}
          {data.benefits.filter(Boolean).length > 0 && (
            <div className="space-y-3">
              <Label className="text-white font-medium">Selected Benefits:</Label>
              <div className="flex flex-wrap gap-2">
                {data.benefits.filter(Boolean).map((benefit, index) => (
                  <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/50 pr-1">
                    {benefit}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBenefit(index)}
                      className="ml-1 h-4 w-4 p-0 text-purple-400 hover:text-purple-300"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Add Custom Benefit */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Add Custom Benefit:</Label>
            <div className="flex gap-3">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Enter a custom benefit..."
                className="bg-gray-800 border-gray-700 text-white flex-1"
                onKeyPress={(e) => e.key === "Enter" && addBenefit(newBenefit)}
              />
              <Button
                onClick={() => addBenefit(newBenefit)}
                disabled={!newBenefit.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Common Benefits */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Or select from common benefits:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {COMMON_BENEFITS.map((benefit) => (
                <Badge
                  key={benefit}
                  variant="outline"
                  className={`cursor-pointer transition-all text-center justify-center py-2 ${
                    data.benefits.includes(benefit)
                      ? "border-purple-500 bg-purple-500/20 text-purple-400"
                      : "border-gray-600 text-gray-400 hover:border-purple-500/50 hover:text-purple-400"
                  }`}
                  onClick={() => addBenefit(benefit)}
                >
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Compensation Summary:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Salary Range:</span>
                <span className="text-white">
                  {showSalary ? `${formatSalary(salaryRange[0])} - ${formatSalary(salaryRange[1])}` : "Not specified"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Benefits Count:</span>
                <span className="text-white">{data.benefits.filter(Boolean).length} benefits</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
