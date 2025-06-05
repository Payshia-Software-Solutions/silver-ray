"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselContextProps = {
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical"
    opts?: any // Simplified for now, EmblaCarouselOptions
  }
>(
  (
    {
      orientation = "horizontal",
      opts,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = React.useState<any>(null) // Simplified EmblaCarouselType
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback(() => {
      if (!emblaApi) return
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    const scrollPrev = React.useCallback(() => {
      emblaApi?.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
      emblaApi?.scrollNext()
    }, [emblaApi])

    React.useEffect(() => {
      if (!emblaApi) return
      onSelect()
      emblaApi.on("select", onSelect)
      emblaApi.on("reInit", onSelect)
      return () => {
        emblaApi.off("select", onSelect)
        emblaApi.off("reInit", onSelect)
      }
    }, [emblaApi, onSelect])

    // This is a simplified setup. A real Embla setup would be more complex.
    // We're mocking the ref and API for basic functionality.
    React.useEffect(() => {
        // Mock emblaApi for basic functionality if not using real Embla
        if (typeof window !== "undefined" && !(window as any).EmblaCarousel) {
             const mockApi = {
                canScrollPrev: () => true,
                canScrollNext: () => true,
                scrollPrev: () => console.log("Mock scrollPrev"),
                scrollNext: () => console.log("Mock scrollNext"),
                on: () => {},
                off: () => {},
                reInit: () => {},
             };
            setEmblaRef(() => (node: any) => { /* Mock ref assignment */});
            (emblaApi as any) = mockApi; // Assign to emblaApi directly
            setCanScrollPrev(mockApi.canScrollPrev());
            setCanScrollNext(mockApi.canScrollNext());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
      <CarouselContext.Provider
        value={{
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "relative",
            orientation === "horizontal" ? " " : " ",
            className
          )}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
            <div ref={emblaRef as React.Ref<HTMLDivElement>} className="overflow-hidden">
                 {children}
            </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "" : "flex-col ",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4", // Adjust spacing as needed
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
