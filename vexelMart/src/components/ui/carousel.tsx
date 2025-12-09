import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay" // <-- We use this package
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "../lib/utils" // Kept relative path for safety
import { Button } from "../ui/button" // Kept relative path for safety

const CarouselContext = React.createContext(null)
export const useCarousel = () => React.useContext(CarouselContext)

export function Carousel({
  children,
  opts,
  orientation = "horizontal",
  className,
  auto = true, // Default to true for auto-slide
  autoInterval = 3000, // Default to 3 seconds
  ...props
}) {
  // 🚨 FIX 1: Wrap Autoplay setup in useRef 🚨
  // This keeps the plugin instance constant across renders.
  const autoplay = React.useRef(
    Autoplay({ delay: autoInterval, stopOnMouseEnter: false, jump: false })
  )

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      dragFree: false,
      loop: true,
    },
    // 🚨 FIX 2: Conditionally apply Autoplay 🚨
    auto ? [autoplay.current] : []
  )

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])
  
  // 🚨 FIX 3: Autoplay Stop/Start Logic 🚨
  // This uses a React Effect to stop the autoplay when props change (like auto = false)
  React.useEffect(() => {
    if (!api || !auto) return
    
    api.plugins().autoplay.stop() // Always stop before re-initializing
    api.plugins().autoplay.play() // Play automatically
    
    // Clean up function: stop when the component is unmounted
    return () => {
        if (api?.plugins().autoplay) {
            api.plugins().autoplay.stop()
        }
    };
  }, [api, auto]); // Re-run effect if API or auto prop changes

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("select", onSelect)
    api.on("reInit", onSelect)
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{ api, carouselRef, canScrollNext, canScrollPrev }}
    >
      <div
        className={cn(
          // Removed hardcoded black background and shadow
          "relative w-full",
          "px-2 py-4 md:px-4 md:py-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel()
    return (
      <div ref={carouselRef} className="overflow-hidden rounded-xl">
        <div
          ref={ref}
          className={cn("flex touch-pan-y gap-4", className)}
          {...props}
        />
      </div>
    )
  }
)
CarouselContent.displayName = "CarouselContent"

export const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full select-none",
          // Removed white/5 background and border from individual slides
          "rounded-lg p-0", 
          className
        )}
        {...props}
      />
    )
  }
)
CarouselItem.displayName = "CarouselItem"

// --- PREMIUM VEXEL MART BUTTONS ---

export const CarouselPrevious = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { api, canScrollPrev } = useCarousel()
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        disabled={!canScrollPrev}
        onClick={() => api.scrollPrev()}
        className={cn(
          "absolute left-6 top-1/2 -translate-y-1/2", 
          // Premium Styling - Translucent Card BG, Indigo Arrow, Accent Hover Border
          "h-10 w-10 rounded-full bg-card/70 backdrop-blur-sm", 
          "border border-border/50 hover:bg-card/90 shadow-lg", 
          className
        )}
        {...props}
      >
        <ArrowLeft className="h-5 w-5 text-primary" /> 
      </Button>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"

export const CarouselNext = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { api, canScrollNext } = useCarousel()
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        disabled={!canScrollNext}
        onClick={() => api.scrollNext()}
        className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2", 
          // Premium Styling - Translucent Card BG, Indigo Arrow, Accent Hover Border
          "h-10 w-10 rounded-full bg-card/70 backdrop-blur-sm",
          "border border-border/50 hover:bg-card/90 shadow-lg",
          className
        )}
        {...props}
      >
        <ArrowRight className="h-5 w-5 text-primary" /> 
      </Button>
    )
  }
)
CarouselNext.displayName = "CarouselNext"