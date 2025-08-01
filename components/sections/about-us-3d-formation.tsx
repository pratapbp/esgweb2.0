"use client"

import { motion } from "framer-motion"

const AboutUs3DFormation = () => {
  return (
    <div className="about-us-container py-10">
      {/* The 3D effect container */}
      <motion.div
        className="building-container relative w-full max-w-4xl mx-auto perspective-1000"
        initial={{ opacity: 0, y: 100, rotateX: -45 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Base Block */}
        <motion.div
          className="building-block base relative z-10 p-8 rounded-xl backdrop-blur-md bg-blue-500/10 dark:bg-blue-500/5 border border-blue-200/20 dark:border-blue-500/20 shadow-lg mb-8 transform-gpu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            background: "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
          }}
        >
          <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
            Our Company Mission
          </h2>
          <p className="text-foreground/80">
            Building precision and excellence in every project, we strive to deliver innovative solutions that transform
            businesses and create lasting value for our clients and partners worldwide.
          </p>
        </motion.div>

        {/* Mid Block */}
        <motion.div
          className="building-block middle relative z-20 p-8 rounded-xl backdrop-blur-md bg-violet-500/10 dark:bg-violet-500/5 border border-violet-200/20 dark:border-violet-500/20 shadow-lg mb-8 transform-gpu ml-8 md:ml-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            background: "linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
          }}
        >
          <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
            Our History
          </h2>
          <p className="text-foreground/80">
            Founded in 2020, ESG has rapidly grown to become a global leader in digital transformation, AI solutions,
            and enterprise technology services, serving clients across multiple industries and regions.
          </p>
        </motion.div>

        {/* Top Block */}
        <motion.div
          className="building-block top relative z-30 p-8 rounded-xl backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-violet-500/10 dark:from-blue-500/5 dark:to-violet-500/5 border border-blue-200/20 dark:border-blue-500/20 shadow-lg transform-gpu ml-16 md:ml-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            background: "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
          }}
        >
          <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
            Our Vision
          </h2>
          <p className="text-foreground/80">
            Leading digital transformation with cutting-edge solutions, we aim to be the premier technology partner for
            businesses seeking innovation, efficiency, and sustainable growth in an increasingly connected world.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutUs3DFormation
