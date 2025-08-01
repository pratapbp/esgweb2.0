import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variantClasses = {
      default: "border-white/20 hover:bg-white/10 text-white",
      primary: "border-primary/30 hover:bg-primary/10 text-primary",
      secondary: "border-secondary/30 hover:bg-secondary/10 text-secondary",
    }

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center border rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

GhostButton.displayName = "GhostButton"
