"use client"

import { motion } from "framer-motion"

interface IntegrationEngineIconProps {
  isActive?: boolean
  size?: number
}

export default function IntegrationEngineIcon({ isActive = false, size = 24 }: IntegrationEngineIconProps) {
  const activeColor = "#a78bfa"
  const inactiveColor = "#94a3b8"
  const color = isActive ? activeColor : inactiveColor

  const nodeVariants = {
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

  const connectionVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        duration: 2,
        ease: "linear",
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
        {/* Central Node */}
        <motion.circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" variants={nodeVariants} />

        {/* Outer Nodes */}
        <motion.circle
          cx="5"
          cy="7"
          r="2"
          stroke={color}
          strokeWidth="1.5"
          variants={nodeVariants}
          transition={{ delay: 0.3 }}
        />

        <motion.circle
          cx="19"
          cy="7"
          r="2"
          stroke={color}
          strokeWidth="1.5"
          variants={nodeVariants}
          transition={{ delay: 0.6 }}
        />

        <motion.circle
          cx="5"
          cy="17"
          r="2"
          stroke={color}
          strokeWidth="1.5"
          variants={nodeVariants}
          transition={{ delay: 0.9 }}
        />

        <motion.circle
          cx="19"
          cy="17"
          r="2"
          stroke={color}
          strokeWidth="1.5"
          variants={nodeVariants}
          transition={{ delay: 1.2 }}
        />

        {/* Connections */}
        <motion.path d="M7 7L9 9" stroke={color} strokeWidth="1" strokeLinecap="round" variants={connectionVariants} />

        <motion.path
          d="M17 7L15 9"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          variants={connectionVariants}
          transition={{ delay: 0.5 }}
        />

        <motion.path
          d="M7 17L9 15"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          variants={connectionVariants}
          transition={{ delay: 1 }}
        />

        <motion.path
          d="M17 17L15 15"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          variants={connectionVariants}
          transition={{ delay: 1.5 }}
        />

        {/* Data Flow */}
        <motion.path
          d="M8 7C9 8 10 10 12 10C14 10 15 8 16 7"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="100"
          variants={dataFlowVariants}
        />

        <motion.path
          d="M8 17C9 16 10 14 12 14C14 14 15 16 16 17"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="100"
          variants={dataFlowVariants}
          transition={{ delay: 1.5 }}
        />
      </motion.svg>
    </div>
  )
}
