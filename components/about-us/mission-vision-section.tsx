"use client"

import { motion } from "framer-motion"
import { Target, Eye, Lightbulb } from "lucide-react"

export default function MissionVisionSection() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Purpose</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Guided by our mission and vision, we're committed to transforming businesses through innovative technology
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100"></div>

            <div className="relative h-full p-8 rounded-2xl backdrop-blur-md bg-background/30 border border-background/20 shadow-lg overflow-hidden">
              {/* Reflective highlight */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm border border-white/10">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                  }}
                  className="text-blue-500"
                >
                  <Target className="h-8 w-8" />
                </motion.div>
              </div>

              <h3 className="relative z-10 text-2xl font-bold mb-4">Our Mission</h3>
              <p className="relative z-10 text-foreground/80 mb-4">
                To empower businesses with innovative AI and SAP solutions that drive growth and efficiency, delivering
                exceptional value through our expertise in enterprise technology.
              </p>
              <p className="relative z-10 text-foreground/80">
                We're committed to helping our clients navigate complex digital transformations and achieve sustainable
                success in an increasingly competitive landscape.
              </p>

              {/* Water drop effect */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }}
              />
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-violet-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100"></div>

            <div className="relative h-full p-8 rounded-2xl backdrop-blur-md bg-background/30 border border-background/20 shadow-lg overflow-hidden">
              {/* Reflective highlight */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-violet-700/20 backdrop-blur-sm border border-white/10">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    delay: 0.5,
                  }}
                  className="text-violet-500"
                >
                  <Eye className="h-8 w-8" />
                </motion.div>
              </div>

              <h3 className="relative z-10 text-2xl font-bold mb-4">Our Vision</h3>
              <p className="relative z-10 text-foreground/80 mb-4">
                To be the premier provider of AI-enhanced enterprise solutions, recognized globally for our innovation,
                expertise, and commitment to client success.
              </p>
              <p className="relative z-10 text-foreground/80">
                We envision a future where businesses leverage the full potential of AI and enterprise technology to
                create sustainable value and positive impact.
              </p>

              {/* Water drop effect */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100"></div>

            <div className="relative h-full p-8 rounded-2xl backdrop-blur-md bg-background/30 border border-background/20 shadow-lg overflow-hidden">
              {/* Reflective highlight */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    delay: 1,
                  }}
                  className="text-blue-400"
                >
                  <Lightbulb className="h-8 w-8" />
                </motion.div>
              </div>

              <h3 className="relative z-10 text-2xl font-bold mb-4">Our Approach</h3>
              <p className="relative z-10 text-foreground/80 mb-4">
                We combine deep industry knowledge with technical expertise to deliver solutions that address the unique
                challenges of our clients.
              </p>
              <p className="relative z-10 text-foreground/80">
                Our collaborative approach ensures that we work closely with our clients at every stage, from strategy
                development to implementation and beyond.
              </p>

              {/* Water drop effect */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  delay: 2,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
