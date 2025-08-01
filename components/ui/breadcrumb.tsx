"use client"

import React from "react"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface BreadcrumbProps {
  homeLabel?: string
  className?: string
  separator?: React.ReactNode
  homeIcon?: boolean
  excludeHome?: boolean
}

export function Breadcrumb({
  homeLabel = "Home",
  className,
  separator = <ChevronRight className="h-4 w-4 text-foreground/50" />,
  homeIcon = true,
  excludeHome = false,
}: BreadcrumbProps) {
  const pathname = usePathname()

  // Skip rendering if we're on the homepage
  if (pathname === "/") return null

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean)

  // Create breadcrumb items with proper URLs and labels
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return { label, url }
  })

  // Add home item at the beginning if not excluded
  if (!excludeHome) {
    breadcrumbItems.unshift({ label: homeLabel, url: "/" })
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
      <ol className="flex flex-wrap items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.url}>
            {index > 0 && <li className="flex items-center">{separator}</li>}
            <li>
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-foreground/70 text-sm" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-foreground/50 hover:text-foreground text-sm flex items-center transition-colors"
                >
                  {index === 0 && homeIcon ? <Home className="h-4 w-4" /> : item.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export { BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis }
