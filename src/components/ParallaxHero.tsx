'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <Image
          src="/images/bulk images/DJI_0073.jpg"
          alt="Hero background"
          fill
          className="object-cover scale-110"
          priority
          sizes="100vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%231a1f2e;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%232a3441;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="1920" height="1080"/%3E%3C/svg%3E'
          }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--midnight-slate)]/70 to-[var(--storm-grey)]/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          Capturing Life&apos;s
          <span className="block text-[var(--lightning)]">Adventures</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay text-[var(--granite)]">
          Join me on a journey through photography, scuba diving, and travel as I explore 
          the world both above and below the surface.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <Link 
            href="/portfolio" 
            className="bg-gradient-to-r from-[var(--lightning)] to-[var(--thunder-blue)] hover:from-[var(--thunder-blue)] hover:to-[var(--lightning)] text-[var(--midnight-slate)] px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 transform hover:scale-105 shadow-lg"
          >
            View Portfolio <ArrowRight className="h-5 w-5" />
          </Link>
          <Link 
            href="/blog" 
            className="bg-[var(--surface)]/20 backdrop-blur-md hover:bg-[var(--surface)]/40 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 border border-[var(--lightning)]/30 hover:border-[var(--lightning)]/60 transform hover:scale-105"
          >
            Read Stories
          </Link>
        </div>
      </div>
    </section>
  )
}