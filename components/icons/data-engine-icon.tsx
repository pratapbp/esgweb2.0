"use client"

import { motion } from "framer-motion"

interface DataEngineIconProps {
  isActive?: boolean
  size?: number
}

export default function DataEngineIcon({ isActive = false, size = 24 }: DataEngineIconProps) {
  const activeColor = "#60a5fa"
  const inactiveColor = "#94a3b8"
  const color = isActive ? activeColor : inactiveColor

  const circleVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants = {
    initial: { opacity: 0.3, scale: 1 },
    animate: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        duration: 1.5,
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
        duration: 3,
        ease: "linear",
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
        {/* Database */}
        <motion.ellipse cx="12" cy="6" rx="8" ry="3" stroke={color} strokeWidth="1.5" variants={circleVariants} />
        <motion.path
          d="M4 6V18C4 19.657 7.582 21 12 21C16.418 21 20 19.657 20 18V6"
          stroke={color}
          strokeWidth="1.5"
          variants={pulseVariants}
        />
        <motion.path
          d="M4 12C4 13.657 7.582 15 12 15C16.418 15 20 13.657 20 12"
          stroke={color}
          strokeWidth="1.5"
          variants={pulseVariants}
        />

        {/* Data Flow Lines */}
        <motion.path
          d="M7 9.5C7.5 10 9 11 12 11C15 11 16.5 10 17 9.5"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="100"
          variants={dataFlowVariants}
        />

        <motion.path
          d="M7 15.5C7.5 16 9 17 12 17C15 17 16.5 16 17 15.5"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="100"
          strokeDashoffset="100"
          variants={dataFlowVariants}
          transition={{ delay: 0.5 }}
        />

        {/* Central Processing Point */}
        <motion.circle
          cx="12"
          cy="12"
          r="1.5"
          fill={color}
          variants={{
            initial: { scale: 1 },
            animate: {
              scale: [1, 1.3, 1],
              transition: {
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "loop" as const,
                duration: 1,
                ease: "easeInOut",
              },
            },
          }}
        />
      </motion.svg>
    </div>
  )
}
