"use client"

<<<<<<< Updated upstream
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
=======
import React from 'react';
>>>>>>> Stashed changes

const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...props}>{children}</label>;
};

<<<<<<< Updated upstream
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
=======
export default Label;
>>>>>>> Stashed changes
