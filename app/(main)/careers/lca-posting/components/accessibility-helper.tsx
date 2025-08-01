"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accessibility, Volume2, Eye, Keyboard, HelpCircle, X } from "lucide-react"

interface AccessibilityHelperProps {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
  currentStep: number
  totalSteps: number
}

export function AccessibilityHelper({ isEnabled, onToggle, currentStep, totalSteps }: AccessibilityHelperProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    if (!highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const toggleLargeText = () => {
    setLargeText(!largeText)
    if (!largeText) {
      document.documentElement.classList.add("large-text")
    } else {
      document.documentElement.classList.remove("large-text")
    }
  }

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion)
    if (!reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  const announceProgress = () => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "assertive")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = `You are currently on step ${currentStep} of ${totalSteps}. Form completion progress is ${Math.round((currentStep / totalSteps) * 100)}%.`
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 3000)
  }

  const announceInstructions = () => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent =
      "Use Tab to navigate between form fields. Use Enter or Space to activate buttons. Use arrow keys to navigate between radio buttons and select options. Press Escape to close dialogs."
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 5000)
  }

  return (
    <>
      {/* Accessibility Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          aria-label="Open accessibility options"
          aria-expanded={isExpanded}
        >
          <Accessibility className="w-6 h-6" aria-hidden="true" />
        </Button>
      </div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80"
          >
            <Card className="bg-slate-800/95 border-slate-700/50 backdrop-blur-sm shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Accessibility className="w-5 h-5" aria-hidden="true" />
                    Accessibility Options
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="text-slate-400 hover:text-white"
                    aria-label="Close accessibility options"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Enhanced Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enhanced-mode" className="text-white font-medium">
                      Enhanced Mode
                    </Label>
                    <p className="text-slate-400 text-sm">Enable additional accessibility features</p>
                  </div>
                  <Switch
                    id="enhanced-mode"
                    checked={isEnabled}
                    onCheckedChange={onToggle}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                {/* Visual Adjustments */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    Visual Adjustments
                  </h4>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast" className="text-slate-300">
                      High Contrast
                    </Label>
                    <Switch
                      id="high-contrast"
                      checked={highContrast}
                      onCheckedChange={toggleHighContrast}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="large-text" className="text-slate-300">
                      Large Text
                    </Label>
                    <Switch
                      id="large-text"
                      checked={largeText}
                      onCheckedChange={toggleLargeText}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduced-motion" className="text-slate-300">
                      Reduced Motion
                    </Label>
                    <Switch
                      id="reduced-motion"
                      checked={reducedMotion}
                      onCheckedChange={toggleReducedMotion}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>

                {/* Navigation Assistance */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Keyboard className="w-4 h-4" aria-hidden="true" />
                    Navigation Assistance
                  </h4>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={announceProgress}
                      className="w-full border-slate-600/50 text-slate-300 hover:bg-slate-700/50 bg-transparent"
                    >
                      <Volume2 className="w-4 h-4 mr-2" aria-hidden="true" />
                      Announce Progress
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={announceInstructions}
                      className="w-full border-slate-600/50 text-slate-300 hover:bg-slate-700/50 bg-transparent"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                      Keyboard Instructions
                    </Button>
                  </div>
                </div>

                {/* Current Status */}
                <div className="pt-3 border-t border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Current Step:</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {currentStep} of {totalSteps}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Progress:</span>
                    <span className="text-white text-sm font-medium">
                      {Math.round((currentStep / totalSteps) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Keyboard Shortcuts */}
                {isEnabled && (
                  <div className="pt-3 border-t border-slate-700/50">
                    <h4 className="text-white font-medium mb-2">Keyboard Shortcuts</h4>
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Next field:</span>
                        <kbd className="bg-slate-700/50 px-1 rounded">Tab</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Previous field:</span>
                        <kbd className="bg-slate-700/50 px-1 rounded">Shift+Tab</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Activate button:</span>
                        <kbd className="bg-slate-700/50 px-1 rounded">Enter/Space</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Close dialog:</span>
                        <kbd className="bg-slate-700/50 px-1 rounded">Escape</kbd>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Reader Only Progress Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true" id="progress-announcer" />
      <div className="sr-only" aria-live="assertive" aria-atomic="true" id="error-announcer" />
    </>
  )
}
