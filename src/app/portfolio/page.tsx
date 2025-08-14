import Link from "next/link";
import Image from "next/image";
import { Camera, MapPin, Settings, Aperture, Timer } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { Photo } from "@/lib/sanity";

async function getPhotos(): Promise<Photo[]> {
  const query = `
    *[_type == "photo"] | order(_createdAt desc) {
      _id,
      title,
      image,
      description,
      location,
      camera,
      settings,
      tags
    }
  `;
  
  try {
    const photos = await client.fetch(query);
    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}

// Sample photos for demonstration
const samplePhotos = [
  {
    _id: "1",
    title: "Sunset Over Mountains",
    image: null,
    description: "A breathtaking sunset captured during my trek in the Himalayas",
    location: "Himalayas, Nepal",
    camera: "Sony A7R IV",
    settings: {
      aperture: "f/8",
      shutter: "1/125s",
      iso: "100",
      focal: "85mm"
    },
    tags: ["landscape", "mountains", "sunset"]
  },
  {
    _id: "2",
    title: "Underwater Coral Garden",
    image: null,
    description: "Vibrant coral formations in the crystal clear waters of the Maldives",
    location: "Maldives",
    camera: "Canon EOS R5",
    settings: {
      aperture: "f/11",
      shutter: "1/60s",
      iso: "400",
      focal: "16mm"
    },
    tags: ["underwater", "coral", "diving"]
  },
  {
    _id: "3",
    title: "Desert Dunes at Dawn",
    image: null,
    description: "The rolling sand dunes of Sahara painted in golden morning light",
    location: "Sahara Desert, Morocco",
    camera: "Sony A7R IV",
    settings: {
      aperture: "f/16",
      shutter: "1/250s",
      iso: "64",
      focal: "24mm"
    },
    tags: ["desert", "landscape", "dawn"]
  },
  {
    _id: "4",
    title: "Tropical Fish Portrait",
    image: null,
    description: "A curious angelfish poses for the camera in the Red Sea",
    location: "Red Sea, Egypt",
    camera: "Canon EOS R5",
    settings: {
      aperture: "f/5.6",
      shutter: "1/125s",
      iso: "800",
      focal: "100mm"
    },
    tags: ["underwater", "fish", "portrait"]
  },
  {
    _id: "5",
    title: "City Lights from Above",
    image: null,
    description: "The sprawling cityscape captured from a drone at twilight",
    location: "Dubai, UAE",
    camera: "DJI Mavic 3",
    settings: {
      aperture: "f/2.8",
      shutter: "1/60s",
      iso: "200",
      focal: "24mm"
    },
    tags: ["aerial", "city", "night"]
  },
  {
    _id: "6",
    title: "Forest Waterfall",
    image: null,
    description: "A hidden waterfall deep in the rainforest of Costa Rica",
    location: "Costa Rica",
    camera: "Sony A7R IV",
    settings: {
      aperture: "f/22",
      shutter: "2s",
      iso: "100",
      focal: "35mm"
    },
    tags: ["waterfall", "forest", "nature"]
  }
];

export default async function PortfolioPage() {
  const photos = await getPhotos();
  const displayPhotos = photos.length > 0 ? photos : samplePhotos;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-[var(--lightning)]" />
              <Link href="/" className="text-2xl font-bold text-[var(--text-primary)]">Adventures</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--lightning)] transition-colors">Home</Link>
              <Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--lightning)] transition-colors">Blog</Link>
              <Link href="/portfolio" className="text-[var(--lightning)] font-semibold">Portfolio</Link>
              <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--lightning)] transition-colors">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Photography Portfolio
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            A collection of moments captured through my lens - from underwater adventures 
            to mountain peaks, desert landscapes to city skylines.
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="photo-grid">
            {displayPhotos.map((photo, index) => (
              <div key={photo._id} className="group cursor-pointer">
                <div className="bg-[var(--surface-elevated)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-[var(--border)]">
                  {/* Photo */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    {photo.image ? (
                      <Image
                        src={urlFor(photo.image).width(600).height(400).url()}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${
                        index % 6 === 0 ? 'from-[var(--ember)] to-[var(--thunder-blue)]' :
                        index % 6 === 1 ? 'from-[var(--thunder-blue)] to-[var(--lightning)]' :
                        index % 6 === 2 ? 'from-[var(--lightning)] to-[var(--ember)]' :
                        index % 6 === 3 ? 'from-[var(--storm-grey)] to-[var(--thunder-blue)]' :
                        index % 6 === 4 ? 'from-[var(--thunder-blue)] to-[var(--storm-grey)]' :
                        'from-[var(--lightning)] to-[var(--storm-grey)]'
                      } flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                        <Camera className="h-16 w-16 text-white/70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                      {photo.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-4 text-sm leading-relaxed">
                      {photo.description}
                    </p>
                    
                    {/* Location */}
                    {photo.location && (
                      <div className="flex items-center text-[var(--text-muted)] text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{photo.location}</span>
                      </div>
                    )}

                    {/* Camera Settings */}
                    {photo.settings && (
                      <div className="border-t border-[var(--border)] pt-4">
                        <div className="flex items-center text-[var(--text-muted)] text-xs mb-2">
                          <Settings className="h-3 w-3 mr-2" />
                          <span className="font-semibold">{photo.camera}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
                          <div className="flex items-center">
                            <Aperture className="h-3 w-3 mr-1" />
                            <span>{photo.settings.aperture}</span>
                          </div>
                          <div className="flex items-center">
                            <Timer className="h-3 w-3 mr-1" />
                            <span>{photo.settings.shutter}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs mr-1">ISO</span>
                            <span>{photo.settings.iso}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs mr-1">📏</span>
                            <span>{photo.settings.focal}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {photo.tags && photo.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {photo.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs bg-[var(--thunder-blue)] text-[var(--lightning)] px-2 py-1 rounded-full capitalize"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
            Interested in Working Together?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Whether you need photography services, want to collaborate on an adventure, 
            or just want to chat about cameras and diving gear, I&apos;d love to hear from you.
          </p>
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-[var(--lightning)] to-[var(--thunder-blue)] hover:from-[var(--thunder-blue)] hover:to-[var(--lightning)] text-[var(--midnight-slate)] px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 transform hover:scale-105 shadow-lg"
          >
            Get in Touch <Camera className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--charcoal)] py-12 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6 text-[var(--lightning)]" />
            <span className="text-xl font-bold text-[var(--text-primary)]">Adventures</span>
          </div>
          <p className="text-[var(--text-secondary)] mb-6">
            Capturing moments, exploring depths, and sharing stories from around the world.
          </p>
          <div className="border-t border-[var(--border)] pt-6">
            <p className="text-[var(--text-muted)] text-sm">
              © 2024 Adventures Blog. Built with Next.js and Sanity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}