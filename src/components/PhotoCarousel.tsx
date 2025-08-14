'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { 
    src: '/images/DJI_0006.jpg', 
    title: 'Aerial Majesty', 
    subtitle: 'Capturing the world from above' 
  },
  { 
    src: '/images/DJI_0008.jpg', 
    title: 'Endless Horizons', 
    subtitle: 'Where sky meets earth in perfect harmony' 
  },
  { 
    src: '/images/DJI_0013.jpg', 
    title: 'Patterns in Nature', 
    subtitle: 'Hidden geometries revealed from the sky' 
  },
  { 
    src: '/images/DJI_0050.jpg', 
    title: 'Coastal Dreams', 
    subtitle: 'Where waves dance with golden shores' 
  },
  { 
    src: '/images/DJI_0065.jpg', 
    title: 'Mountain Grandeur', 
    subtitle: 'Peaks that touch the soul' 
  },
  { 
    src: '/images/DJI_0067.jpg', 
    title: 'Natural Architecture', 
    subtitle: 'Earth\'s masterpiece from above' 
  },
  { 
    src: '/images/DJI_0076.jpg', 
    title: 'Scenic Wonder', 
    subtitle: 'Beauty that takes your breath away' 
  },
  { 
    src: '/images/DJI_0094.jpg', 
    title: 'Aerial Symphony', 
    subtitle: 'When composition meets nature' 
  },
  { 
    src: '/images/DSC00539.jpg', 
    title: 'Adventure Awaits', 
    subtitle: 'Every moment tells a story' 
  },
  { 
    src: '/images/DSC00543.jpg', 
    title: 'Journey Captured', 
    subtitle: 'Memories frozen in time' 
  },
  { 
    src: '/images/DSC00587.jpg', 
    title: 'Nature\'s Canvas', 
    subtitle: 'Raw beauty in its purest form' 
  },
  { 
    src: '/images/DSC00599.jpg', 
    title: 'Epic Moments', 
    subtitle: 'When adventure becomes art' 
  },
]

export default function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      // Track carousel interaction
      if (typeof window !== 'undefined' && window.trackCarouselInteraction) {
        window.trackCarouselInteraction('prev', selectedIndex)
      }
    }
  }, [emblaApi, selectedIndex])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      // Track carousel interaction
      if (typeof window !== 'undefined' && window.trackCarouselInteraction) {
        window.trackCarouselInteraction('next', selectedIndex)
      }
    }
  }, [emblaApi, selectedIndex])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  // Auto-scroll effect
  useEffect(() => {
    if (!emblaApi) return
    
    const autoScroll = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)

    return () => clearInterval(autoScroll)
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {photos.map((photo, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 embla__slide">
              <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh]">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover w-full h-full"
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                  onLoad={() => {
                    // Track image view when loaded
                    if (typeof window !== 'undefined' && window.trackImageView) {
                      window.trackImageView(photo.title, 'carousel')
                    }
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%232a3441" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-family="system-ui" font-size="20" fill="%238892a6" text-anchor="middle" dominant-baseline="middle"%3EImage Loading...%3C/text%3E%3C/svg%3E'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
                
                {/* Photo Title Overlay */}
                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 drop-shadow-2xl">
                    {photo.title}
                  </h3>
                  <p className="text-xl md:text-2xl lg:text-3xl opacity-90 drop-shadow-lg font-light">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        aria-label="Previous image"
        className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all duration-200 hover:scale-110 z-20"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>
      
      <button
        type="button"
        aria-label="Next image"
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all duration-200 hover:scale-110 z-20"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {photos.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to image ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === selectedIndex 
                ? 'bg-white w-8 shadow-lg' 
                : 'bg-white/50 w-3 hover:bg-white/70'
            }`}
            onClick={() => {
              emblaApi?.scrollTo(index)
              // Track dot navigation
              if (typeof window !== 'undefined' && window.trackCarouselInteraction) {
                window.trackCarouselInteraction('dot_navigation', index)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}