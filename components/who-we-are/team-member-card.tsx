"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"

interface TeamMemberCardProps {
  name: string
  role: string
  bio: string
  image: string
  expertise: string[]
  delay?: number
}

const TeamMemberCard = ({ name, role, bio, image, expertise, delay = 0 }: TeamMemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg overflow-hidden transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-blue-500/10">
        <div className="relative h-48 w-full">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>

          {/* Social links that appear on hover */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-colors"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="p-6 relative">
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

          <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">{name}</h3>
          <p className="text-blue-500 dark:text-blue-400 text-sm mb-3">{role}</p>
          <p className="text-foreground/80 text-sm mb-4">{bio}</p>

          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <span
                key={index}
                className="inline-block text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TeamMemberCard
