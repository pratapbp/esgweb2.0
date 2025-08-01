"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EnhancedContactCTA() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl blur-xl"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-2xl backdrop-blur-md bg-background/30 border border-background/20 shadow-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-blue-500/30"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: 0,
                  }}
                  animate={
                    isHovered
                      ? {
                          x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                          y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                          scale: [0, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10 mb-6"
              >
                <MessageSquare className="h-10 w-10 text-blue-400" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Business with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                  AI-Powered Solutions
                </span>
                ?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                Contact our team today to discuss how our expertise in SAP and AI can help your organization achieve its
                goals and stay ahead of the competition.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-6 text-lg h-auto"
                >
                  Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-6 text-lg h-auto"
                >
                  Explore Our Services
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
