"use client"

import { motion } from "framer-motion"

interface SecurityEngineIconProps {
  isActive?: boolean
  size?: number
}

export default function SecurityEngineIcon({ isActive = false, size = 24 }: SecurityEngineIconProps) {
  const activeColor = "#fbbf24"
  const inactiveColor = "#94a3b8"
  const color = isActive ? activeColor : inactiveColor

  const shieldVariants = {
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

  const scanVariants = {
    initial: { opacity: 0, pathLength: 0 },
    animate: {
      opacity: [0, 1, 0],
      pathLength: [0, 1, 0],
      transition: {
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        duration: 3,
        ease: "easeInOut",
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
        {/* Shield */}
        <motion.path
          d="M12 3L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 3Z"
          stroke={color}
          strokeWidth="1.5"
          variants={shieldVariants}
        />

        {/* Lock */}
        <motion.rect
          x="9"
          y="11"
          width="6"
          height="5"
          rx="1"
          stroke={color}
          strokeWidth="1.5"
          variants={pulseVariants}
        />

        <motion.path
          d="M10 11V9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9V11"
          stroke={color}
          strokeWidth="1.5"
          variants={pulseVariants}
        />

        {/* Scanning Effect */}
        <motion.path d="M7 12H17" stroke={color} strokeWidth="1" variants={scanVariants} />

        <motion.path d="M7 9H17" stroke={color} strokeWidth="1" variants={scanVariants} transition={{ delay: 1 }} />

        <motion.path d="M7 15H17" stroke={color} strokeWidth="1" variants={scanVariants} transition={{ delay: 2 }} />

        {/* Central Point */}
        <motion.circle
          cx="12"
          cy="13.5"
          r="1"
          fill={color}
          variants={{
            initial: { scale: 1 },
            animate: {
              scale: [1, 1.5, 1],
              transition: {
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "loop" as const,
                duration: 1.5,
                ease: "easeInOut",
              },
            },
          }}
        />
      </motion.svg>
    </div>
  )
}
