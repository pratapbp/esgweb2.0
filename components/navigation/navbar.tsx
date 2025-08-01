"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Phone,
  Building2,
  Users,
  Target,
  BookOpen,
  Cog,
  Database,
  Truck,
  CreditCard,
  Zap,
  Brain,
  Cloud,
  Shield,
  UserCheck,
  Factory,
  ShoppingCart,
  Heart,
  Grid3X3,
  Briefcase,
  FileText,
  GitBranch,
  Network,
  Lightbulb,
  Sparkles,
  Layers,
  Workflow,
  Smartphone,
  Pill,
  GraduationCap,
  TrendingUp,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const aboutItems = [
  {
    title: "About Us",
    href: "/about-us",
    description: "Learn about our company and values",
    icon: Building2,
  },
  {
    title: "Who We Are",
    href: "/who-we-are",
    description: "Meet our team and leadership",
    icon: Users,
  },
  {
    title: "Our Mission",
    href: "/mission",
    description: "Our purpose and vision for the future",
    icon: Target,
  },
  {
    title: "Technologies",
    href: "/technologies",
    description: "Our technology stack and capabilities",
    icon: Cog,
  },
  {
    title: "Insights",
    href: "/insights",
    description: "AI-powered industry insights",
    icon: TrendingUp,
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Latest insights and industry news",
    icon: BookOpen,
  },
]

const serviceItems = [
  {
    title: "SAP Enterprise Solutions",
    href: "/services/sap-enterprise-solutions",
    description: "Complete SAP implementation and optimization",
    icon: Cog,
  },
  {
    title: "SAP Data & AI Analytics",
    href: "/services/sap-data-ai-analytics",
    description: "Advanced analytics and AI-powered insights",
    icon: Database,
  },
  {
    title: "SAP Supply Chain & Procurement",
    href: "/services/sap-supply-chain-procurement",
    description: "Streamline your supply chain operations",
    icon: Truck,
  },
  {
    title: "SAP BRIM",
    href: "/services/sap-brim",
    description: "Billing and revenue innovation management",
    icon: CreditCard,
  },
  {
    title: "SAP Technology & Innovation",
    href: "/services/sap-technology-innovation",
    description: "Cutting-edge SAP technology solutions",
    icon: Zap,
  },
  {
    title: "Digital & AI Solutions",
    href: "/services/digital-ai-solutions",
    description: "Transform your business with AI",
    icon: Brain,
  },
  {
    title: "Cloud Solutions",
    href: "/services/cloud-solutions",
    description: "Scalable cloud infrastructure and migration",
    icon: Cloud,
  },
  {
    title: "Cybersecurity Services",
    href: "/services/cybersecurity-services",
    description: "Protect your digital assets",
    icon: Shield,
  },
  {
    title: "Staffing Solutions",
    href: "/services/staffing-solutions",
    description: "Expert talent acquisition and placement",
    icon: UserCheck,
  },
]

const industryItems = [
  {
    title: "Manufacturing",
    href: "/industries/manufacturing",
    description: "Smart manufacturing with AI and IoT",
    icon: Factory,
  },
  {
    title: "Retail & E-commerce",
    href: "/industries/retail",
    description: "Transform retail with AI-powered solutions",
    icon: ShoppingCart,
  },
  {
    title: "Healthcare",
    href: "/industries/healthcare",
    description: "AI-native healthcare innovation",
    icon: Heart,
  },
  {
    title: "Banking & Financial Services",
    href: "/industries/bfsi",
    description: "Digital banking transformation",
    icon: Building2,
  },
  {
    title: "Public Sector",
    href: "/industries/public-sector",
    description: "Government digital services",
    icon: Building2,
  },
  {
    title: "Energy & Utilities",
    href: "/industries/energy-utilities",
    description: "Smart grid and energy solutions",
    icon: Zap,
  },
  {
    title: "Telecommunications",
    href: "/industries/telecom",
    description: "5G networks and telecom solutions",
    icon: Smartphone,
  },
  {
    title: "Logistics & Supply Chain",
    href: "/industries/logistics",
    description: "Intelligent logistics solutions",
    icon: Truck,
  },
  {
    title: "Pharmaceuticals",
    href: "/industries/pharma",
    description: "Pharma innovation solutions",
    icon: Pill,
  },
  {
    title: "Education",
    href: "/industries/education",
    description: "EdTech and learning management systems",
    icon: GraduationCap,
  },
  {
    title: "All Industries",
    href: "/industries",
    description: "Explore all industry solutions",
    icon: Grid3X3,
  },
]

const technologyItems = [
  {
    title: "Technology Overview",
    href: "/technologies",
    description: "Our complete technology portfolio",
    icon: Cog,
  },
  {
    title: "Generative AI",
    href: "/technologies/genai",
    description: "LLMs, AI copilots, and intelligent automation",
    icon: Brain,
    badge: "Featured",
  },
  {
    title: "Blockchain",
    href: "/technologies/blockchain",
    description: "Distributed ledger and smart contracts",
    icon: GitBranch,
  },
  {
    title: "RPA",
    href: "/technologies/rpa",
    description: "Robotic process automation",
    icon: Workflow,
  },
  {
    title: "Cybersecurity",
    href: "/technologies/cybersecurity",
    description: "AI-powered security and zero trust",
    icon: Shield,
    badge: "New",
  },
  {
    title: "IoT & Edge AI",
    href: "/technologies/iot",
    description: "Connected devices and edge computing",
    icon: Network,
    badge: "New",
  },
  {
    title: "Superintelligence",
    href: "/technologies/superintelligence",
    description: "Ethical AGI and advanced reasoning",
    icon: Sparkles,
    badge: "New",
  },
  {
    title: "Cloud Infrastructure",
    href: "/technologies/cloud",
    description: "Multi-cloud and hybrid solutions",
    icon: Cloud,
    badge: "New",
  },
  {
    title: "Theory of Mind AI",
    href: "/technologies/theory-of-mind",
    description: "Empathetic AI and context-aware systems",
    icon: Lightbulb,
    badge: "New",
  },
  {
    title: "Digital Twin",
    href: "/technologies/digital-twin",
    description: "Virtual modeling and predictive simulation",
    icon: Layers,
    badge: "New",
  },
]

const careerItems = [
  {
    title: "Open Positions",
    href: "/careers",
    description: "Join our growing team",
    icon: Briefcase,
  },
  {
    title: "LCA Postings",
    href: "/lca-postings",
    description: "Labor Condition Application postings",
    icon: FileText,
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname?.startsWith(href)) return true
    return false
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">ESGit</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive("/") && "bg-accent text-accent-foreground",
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {aboutItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.href) && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center space-x-2">
                              <item.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {serviceItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.href) && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center space-x-2">
                              <item.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Industries */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Industries</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {industryItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.href) && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center space-x-2">
                              <item.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Technologies */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Technologies</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {technologyItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.href) && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center space-x-2">
                              <item.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                              {item.badge && (
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Careers */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Careers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[400px]">
                    {careerItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.href) && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center space-x-2">
                              <item.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Contact */}
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive("/contact") && "bg-accent text-accent-foreground",
                    )}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive("/") && "text-primary",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">About</h4>
                  {aboutItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                        isActive(item.href) && "text-primary",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Services</h4>
                  {serviceItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                        isActive(item.href) && "text-primary",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Technologies</h4>
                  {technologyItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                        isActive(item.href) && "text-primary",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Industries</h4>
                  {industryItems.slice(0, 6).map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                        isActive(item.href) && "text-primary",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  <Link
                    href="/industries"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    View all industries →
                  </Link>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Careers</h4>
                  {careerItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                        isActive(item.href) && "text-primary",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive("/contact") && "text-primary",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                <div className="pt-4">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
