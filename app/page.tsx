'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Palette, Type } from 'lucide-react';
import Header from '@/components/Header';

const showcaseImages = [
  {
    src: '/showcase/showcase-01.webp',
    alt: 'Headphone showcase design 01',
  },
  {
    src: '/showcase/showcase-02.jpg',
    alt: 'Headphone showcase design 02',
  },
  {
    src: '/showcase/showcase-03.jpg',
    alt: 'Headphone showcase design 03',
  },
  {
    src: '/showcase/showcase-04.jpg',
    alt: 'Headphone showcase design 04',
  },
  {
    src: '/showcase/showcase-05.jpg',
    alt: 'Headphone showcase design 05',
  },
  {
    src: '/showcase/showcase-06.jpg',
    alt: 'Headphone showcase design 06',
  },
  {
    src: '/showcase/showcase-07.jpg',
    alt: 'Headphone showcase design 07',
  },
  {
    src: '/showcase/showcase-08.jpg',
    alt: 'Headphone showcase design 08',
  },
  {
    src: '/showcase/showcase-09.jpg',
    alt: 'Headphone showcase design 09',
  },
  {
    src: '/showcase/showcase-10.jpg',
    alt: 'Headphone showcase design 10',
  },
];

export default function Home() {
  const scrollingImages = [...showcaseImages, ...showcaseImages];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-gold/10 to-transparent" />

      <Header />

      <main className="relative pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-20"
          >
            {/* <p className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] border border-border rounded-full px-4 py-1.5 mb-6 bg-card/70">
              Premium Audio Studio
            </p> */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6 leading-[1.02]">
              Sound,{' '}
              <span className="text-gold italic">Personalized</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Design your perfect headphones with our luxury customization studio.
              Every detail, crafted by you.
            </p>
            <Link
              href="/customize"
              className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-3.5 rounded-full font-semibold text-base md:text-lg hover:bg-gold/90 transition-all hover:scale-105 group shadow-lg shadow-gold/20"
            >
              Start Creating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-10 md:mt-12">
              <p className="text-xs md:text-sm uppercase tracking-[0.16em] text-muted-foreground mb-4">
                Design Showcase
              </p>
              <div className="showcase-mask rounded-2xl border border-border/80 bg-card/70 p-3">
                <div className="showcase-track">
                  {scrollingImages.map((image, index) => (
                    <div key={`${image.src}-${index}`} className="showcase-item">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 mt-20 md:mt-24"
          >
            <FeatureCard
              icon={<Palette className="w-8 h-8" />}
              title="Color Your Way"
              description="Choose from premium color swatches or create your own custom palette for every component."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Add Personality"
              description="Select from curated stickers and emblems to make your headphones truly one-of-a-kind."
            />
            <FeatureCard
              icon={<Type className="w-8 h-8" />}
              title="Make It Personal"
              description="Add custom text with premium typography and upload your own images for a unique finish."
            />
          </motion.div>
        </div>
      </main>
      <style jsx>{`
        .showcase-mask {
          overflow: hidden;
        }
        .showcase-track {
          display: flex;
          width: max-content;
          gap: 0.75rem;
          animation: move-left-to-right 28s linear infinite;
          transform: translateX(-50%);
        }
        .showcase-item {
          width: 180px;
          height: 120px;
          border-radius: 0.9rem;
          overflow: hidden;
          border: 1px solid hsl(var(--border));
          flex: 0 0 auto;
        }
        @media (min-width: 768px) {
          .showcase-item {
            width: 220px;
            height: 140px;
          }
        }
        @keyframes move-left-to-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card/75 backdrop-blur-sm border border-border/80 rounded-3xl p-7 md:p-8 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10 transition-all group">
      <div className="text-gold mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-playfair font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
