"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Heart,
  Users,
  Eye,
  MessageCircle,
  Lightbulb,
  Target,
  Shield,
  Cpu,
  Database,
  BookOpen,
  Puzzle,
  Smile,
  UserCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TheoryOfMindPage() {
  const [activeApplication, setActiveApplication] = useState(0)

  const tomLevels = [
    {
      level: "First-Order ToM",
      description: "Understanding that others have beliefs different from one's own",
      example: "Knowing that someone might believe something false",
      aiImplementation: "Basic belief tracking and perspective-taking",
      color: "from-blue-500 to-cyan-500",
    },
    {
      level: "Second-Order ToM",
      description: "Understanding what someone thinks about someone else's thoughts",
      example: "Knowing that Alice thinks Bob believes something",
      aiImplementation: "Nested belief representation and reasoning",
      color: "from-green-500 to-emerald-500",
    },
    {
      level: "Emotional ToM",
      description: "Understanding and predicting others' emotional states",
      example: "Recognizing that someone will be sad if they lose something important",
      aiImplementation: "Emotion recognition and empathetic responses",
      color: "from-purple-500 to-pink-500",
    },
    {
      level: "Advanced ToM",
      description: "Understanding complex social dynamics and intentions",
      example: "Recognizing sarcasm, irony, and social nuances",
      aiImplementation: "Contextual understanding and social intelligence",
      color: "from-orange-500 to-red-500",
    },
  ]

  const cognitiveComponents = [
    {
      component: "Belief Attribution",
      description: "Ability to attribute beliefs to others and track belief changes",
      icon: Lightbulb,
      aiChallenges: ["Belief representation", "Belief updating", "False belief understanding", "Belief consistency"],
      applications: ["Personalized recommendations", "User modeling", "Adaptive interfaces", "Context awareness"],
    },
    {
      component: "Intention Recognition",
      description: "Understanding the goals and intentions behind others' actions",
      icon: Target,
      aiChallenges: ["Goal inference", "Plan recognition", "Action prediction", "Multi-agent coordination"],
      applications: ["Predictive assistance", "Collaborative AI", "Behavior analysis", "Safety systems"],
    },
    {
      component: "Emotion Understanding",
      description: "Recognizing and responding appropriately to emotional states",
      icon: Heart,
      aiChallenges: ["Emotion detection", "Emotional reasoning", "Empathetic responses", "Emotional regulation"],
      applications: ["Mental health support", "Customer service", "Educational AI", "Therapeutic systems"],
    },
    {
      component: "Social Reasoning",
      description: "Understanding social norms, relationships, and group dynamics",
      icon: Users,
      aiChallenges: ["Social norm learning", "Relationship modeling", "Group behavior", "Cultural sensitivity"],
      applications: ["Social robots", "Team collaboration", "Community management", "Cultural adaptation"],
    },
  ]

  const aiApplications = [
    {
      application: "Human-Computer Interaction",
      description: "Creating more intuitive and empathetic user interfaces",
      icon: MessageCircle,
      benefits: ["Natural communication", "Reduced cognitive load", "Personalized experiences", "Emotional support"],
      examples: ["Conversational AI", "Adaptive UIs", "Emotion-aware systems", "Personalized assistants"],
      challenges: ["Context understanding", "Emotional accuracy", "Privacy concerns", "Cultural differences"],
      impact: "85% improvement in user satisfaction",
    },
    {
      application: "Personalized Education",
      description: "Adapting learning experiences based on student understanding and emotions",
      icon: BookOpen,
      benefits: ["Individualized learning", "Emotional support", "Engagement optimization", "Learning acceleration"],
      examples: ["Intelligent tutoring", "Adaptive curricula", "Emotional learning", "Peer interaction modeling"],
      challenges: [
        "Learning style detection",
        "Emotional state recognition",
        "Motivation modeling",
        "Ethical considerations",
      ],
      impact: "60% increase in learning outcomes",
    },
    {
      application: "Mental Health Support",
      description: "Providing empathetic and contextually appropriate mental health assistance",
      icon: Smile,
      benefits: ["24/7 availability", "Stigma reduction", "Personalized therapy", "Early intervention"],
      examples: ["Therapy chatbots", "Mood tracking", "Crisis intervention", "Behavioral analysis"],
      challenges: ["Emotional accuracy", "Safety protocols", "Professional oversight", "Ethical boundaries"],
      impact: "70% improvement in accessibility",
    },
    {
      application: "Social Robotics",
      description: "Developing robots that can understand and interact naturally with humans",
      icon: UserCheck,
      benefits: ["Natural interaction", "Social acceptance", "Collaborative work", "Emotional connection"],
      examples: ["Companion robots", "Healthcare assistants", "Educational robots", "Service robots"],
      challenges: ["Nonverbal communication", "Social norms", "Cultural adaptation", "Trust building"],
      impact: "90% increase in human acceptance",
    },
  ]

  const developmentChallenges = [
    {
      challenge: "Complexity of Human Cognition",
      description: "Human thinking involves complex, often unconscious processes",
      icon: Brain,
      difficulties: ["Unconscious biases", "Emotional influences", "Cultural variations", "Individual differences"],
      approaches: ["Cognitive modeling", "Behavioral studies", "Neuroscience insights", "Cross-cultural research"],
    },
    {
      challenge: "Data Requirements",
      description: "ToM requires vast amounts of diverse, high-quality training data",
      icon: Database,
      difficulties: ["Data scarcity", "Annotation complexity", "Privacy concerns", "Bias in datasets"],
      approaches: ["Synthetic data generation", "Crowdsourcing", "Multi-modal data", "Privacy-preserving techniques"],
    },
    {
      challenge: "Computational Complexity",
      description: "Modeling nested beliefs and social reasoning is computationally intensive",
      icon: Cpu,
      difficulties: ["Scalability issues", "Real-time processing", "Memory requirements", "Inference complexity"],
      approaches: ["Efficient algorithms", "Hierarchical models", "Approximation methods", "Distributed computing"],
    },
    {
      challenge: "Evaluation and Validation",
      description: "Measuring ToM capabilities in AI systems is inherently difficult",
      icon: Eye,
      difficulties: ["Subjective measures", "Context dependency", "Dynamic environments", "Ground truth establishment"],
      approaches: ["Standardized tests", "Human evaluation", "Behavioral metrics", "Longitudinal studies"],
    },
  ]

  const researchDirections = [
    {
      direction: "Multimodal ToM",
      description: "Integrating visual, auditory, and textual cues for comprehensive understanding",
      focus: ["Facial expressions", "Voice tone", "Body language", "Contextual cues"],
      potential: "More accurate emotion and intention recognition",
    },
    {
      direction: "Developmental ToM",
      description: "AI systems that develop ToM capabilities progressively like children",
      focus: ["Incremental learning", "Developmental stages", "Experience-based growth", "Adaptive complexity"],
      potential: "More robust and generalizable ToM abilities",
    },
    {
      direction: "Cultural ToM",
      description: "Understanding how ToM varies across different cultures and contexts",
      focus: ["Cultural norms", "Communication styles", "Social hierarchies", "Value systems"],
      potential: "Globally applicable and culturally sensitive AI",
    },
    {
      direction: "Collaborative ToM",
      description: "Multiple AI agents with ToM working together and with humans",
      focus: ["Multi-agent coordination", "Shared mental models", "Team dynamics", "Collective intelligence"],
      potential: "Enhanced human-AI collaboration and teamwork",
    },
  ]

  const ethicalConsiderations = [
    {
      aspect: "Privacy and Consent",
      description: "ToM systems may infer private thoughts and emotions",
      concerns: ["Mental privacy", "Informed consent", "Data protection", "Surveillance risks"],
      guidelines: ["Transparent data use", "User control", "Minimal data collection", "Secure storage"],
    },
    {
      aspect: "Manipulation Risks",
      description: "ToM capabilities could be used to manipulate human behavior",
      concerns: ["Emotional manipulation", "Persuasion tactics", "Vulnerability exploitation", "Autonomy reduction"],
      guidelines: ["Ethical use policies", "Transparency requirements", "User empowerment", "Regulatory oversight"],
    },
    {
      aspect: "Bias and Fairness",
      description: "ToM systems may perpetuate or amplify human biases",
      concerns: ["Stereotyping", "Discrimination", "Cultural bias", "Representation gaps"],
      guidelines: ["Diverse training data", "Bias testing", "Inclusive design", "Continuous monitoring"],
    },
    {
      aspect: "Human Agency",
      description: "Ensuring humans remain in control of important decisions",
      concerns: ["Over-reliance", "Decision delegation", "Skill atrophy", "Autonomy loss"],
      guidelines: ["Human-in-the-loop", "Explainable AI", "User education", "Gradual integration"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10" />
          {/* Mind Network Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000">
              {[...Array(30)].map((_, i) => (
                <g key={i}>
                  <circle
                    cx={200 + (i % 6) * 120}
                    cy={200 + Math.floor(i / 6) * 120}
                    r="3"
                    fill="currentColor"
                    className="text-indigo-400"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;1;0.2"
                      dur={`${2 + Math.random() * 3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {i < 25 && (
                    <line
                      x1={200 + (i % 6) * 120}
                      y1={200 + Math.floor(i / 6) * 120}
                      x2={200 + ((i + 1) % 6) * 120}
                      y2={200 + Math.floor((i + 1) / 6) * 120}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-indigo-400"
                      opacity="0.3"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-indigo-600/20 text-indigo-300 border-indigo-500/30 px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              Theory of Mind Research
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Empathetic
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Advancing AI systems with Theory of Mind capabilities to understand human thoughts, emotions, and
              intentions, creating more empathetic and effective human-AI interactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
              >
                <Heart className="mr-2 h-5 w-5" />
                Explore Research
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Applications
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theory of Mind Levels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ToM{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Levels
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the progressive levels of Theory of Mind and their implementation in artificial intelligence
              systems.
            </p>
          </motion.div>

          <div className="space-y-8">
            {tomLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${level.color} flex-shrink-0`}>
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{level.level}</h3>
                        <p className="text-gray-300 mb-4">{level.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-white mb-2 text-sm">Human Example:</h4>
                            <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg">{level.example}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-2 text-sm">AI Implementation:</h4>
                            <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg">{level.aiImplementation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cognitive Components */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cognitive{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Components
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Key cognitive components that enable Theory of Mind capabilities in artificial intelligence systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cognitiveComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <component.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{component.component}</CardTitle>
                        <p className="text-gray-300 text-sm">{component.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">AI Challenges:</h4>
                      <div className="space-y-1">
                        {component.aiChallenges.map((challenge, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-300">
                            <Puzzle className="h-3 w-3 text-orange-400 mr-2 flex-shrink-0" />
                            {challenge}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Applications:</h4>
                      <div className="flex flex-wrap gap-1">
                        {component.applications.map((app, idx) => (
                          <Badge key={idx} className="bg-white/10 text-gray-300 border-white/20 text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Applications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Applications
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world applications where Theory of Mind enhances AI systems and improves human-computer interaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiApplications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveApplication(index)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    activeApplication === index
                      ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <app.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{app.application}</CardTitle>
                        <div className="text-blue-400 font-semibold text-sm">{app.impact}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{app.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Benefits:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {app.benefits.map((benefit, idx) => (
                          <Badge
                            key={idx}
                            className="bg-green-600/20 text-green-300 border-green-500/30 text-xs justify-center py-1"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Examples:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {app.examples.map((example, idx) => (
                          <Badge
                            key={idx}
                            className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs justify-center py-1"
                          >
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Challenges:</h4>
                      <div className="space-y-1">
                        {app.challenges.map((challenge, idx) => (
                          <div key={idx} className="flex items-center text-xs text-orange-400">
                            <div className="w-1 h-1 bg-orange-400 rounded-full mr-2 flex-shrink-0" />
                            {challenge}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Challenges */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Development{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Challenges
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Key challenges in developing AI systems with Theory of Mind capabilities and our approaches to address
              them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developmentChallenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                        <challenge.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{challenge.challenge}</CardTitle>
                        <p className="text-gray-300 text-sm">{challenge.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Difficulties:</h4>
                      <div className="space-y-1">
                        {challenge.difficulties.map((difficulty, idx) => (
                          <div key={idx} className="flex items-center text-xs text-red-400">
                            <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0" />
                            {difficulty}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Our Approaches:</h4>
                      <div className="space-y-1">
                        {challenge.approaches.map((approach, idx) => (
                          <div key={idx} className="flex items-center text-xs text-green-400">
                            <Lightbulb className="h-3 w-3 mr-2 flex-shrink-0" />
                            {approach}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Directions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Research{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Directions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge research directions that will shape the future of Theory of Mind in artificial intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchDirections.map((direction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white mb-2">{direction.direction}</CardTitle>
                    <p className="text-gray-300 text-sm">{direction.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Research Focus:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {direction.focus.map((focus, idx) => (
                          <Badge
                            key={idx}
                            className="bg-white/10 text-gray-300 border-white/20 text-xs justify-center py-1"
                          >
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Potential Impact:</h4>
                      <p className="text-cyan-400 text-sm font-medium">{direction.potential}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Considerations */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ethical{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Considerations
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Addressing the ethical implications and responsibilities in developing AI systems with Theory of Mind
              capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ethicalConsiderations.map((consideration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white mb-2">{consideration.aspect}</CardTitle>
                    <p className="text-gray-300 text-sm">{consideration.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Concerns:</h4>
                      <div className="space-y-1">
                        {consideration.concerns.map((concern, idx) => (
                          <div key={idx} className="flex items-center text-xs text-orange-400">
                            <Shield className="h-3 w-3 mr-2 flex-shrink-0" />
                            {concern}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Ethical Guidelines:</h4>
                      <div className="space-y-1">
                        {consideration.guidelines.map((guideline, idx) => (
                          <div key={idx} className="flex items-center text-xs text-green-400">
                            <UserCheck className="h-3 w-3 mr-2 flex-shrink-0" />
                            {guideline}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Build Empathetic AI Systems</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join us in developing AI systems that truly understand human thoughts, emotions, and intentions for
                  more meaningful interactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Start Research Project
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
