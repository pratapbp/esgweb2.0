"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EmailSubscribe() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true)
      setLoading(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-500/20 p-2 rounded-full">
          <Mail className="h-5 w-5 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Subscribe to Updates</h3>
      </div>

      {subscribed ? (
        <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 text-center">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-300 text-sm">
            Thank you for subscribing! You'll receive our latest AI-generated insights directly to your inbox.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-300 text-sm mb-4">
            Get AI-curated content on SAP, industry trends, and emerging technologies delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            <p className="text-xs text-gray-400">We respect your privacy. Unsubscribe at any time.</p>
          </form>
        </>
      )}
    </motion.div>
  )
}
