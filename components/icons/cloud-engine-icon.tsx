"use client"

import { motion } from "framer-motion"

interface CloudEngineIconProps {
  isActive?: boolean
  size?: number
}

export default function CloudEngineIcon({ isActive = false, size = 24 }: CloudEngineIconProps) {
  const activeColor = "#34d399"
  const inactiveColor = "#94a3b8"
  const color = isActive ? activeColor : inactiveColor

  const cloudVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        duration: 3,
        ease: "easeInOut",
      },
    },
  }

  const dataFlowVariants = {
    initial: { strokeDashoffset: 100 },
    animate: {
      strokeDashoffset: 0,
      transition: {
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        duration: 2,
        ease: "linear",
      },
    },
  }

  const pulseVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.1, 1],
      transition: {
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        animate="animate"
      >
        {/* Cloud Shape */}
        <motion.path
          d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07974 10.0194C6.54781 7.17213 9.02024 5 12 5C14.9798 5 17.4522 7.17213 17.9203 10.0194C20.2085 10.2313 22 12.1564 22 14.5C22 16.9853 19.9853 19 17.5 19H6.5Z"
          stroke={color}
          strokeWidth="1.5"
          variants={cloudVariants}
        />

        {/* Data Flow Lines */}
        <motion.path
          d="M8 13L12 10L16 13"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="100"
          variants={dataFlowVariants}
        />

        <motion.path
          d="M12 10V16"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="100"
          variants={dataFlowVariants}
          transition={{ delay: 0.5 }}
        />

        {/* Processing Nodes */}
        <motion.circle cx="12" cy="10" r="1" fill={color} variants={pulseVariants} />

        <motion.circle cx="8" cy="13" r="1" fill={color} variants={pulseVariants} transition={{ delay: 0.3 }} />

        <motion.circle cx="16" cy="13" r="1" fill={color} variants={pulseVariants} transition={{ delay: 0.6 }} />

        <motion.circle cx="12" cy="16" r="1" fill={color} variants={pulseVariants} transition={{ delay: 0.9 }} />
      </motion.svg>
    </div>
  )
}
