import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const banners = [
  {
    id: 1,
    title: "Direct Global Sourcing",
    subtitle: "Premium B2B solutions for electronics and industrial machinery.",
    image: "https://picsum.photos/seed/import/1200/400",
    cta: "Start Sourcing",
    color: "bg-primary"
  },
  {
    id: 2,
    title: "Curated Fashion Trends",
    subtitle: "Discover high-quality apparel from verified manufacturers.",
    image: "https://picsum.photos/seed/fashion/1200/400",
    cta: "Explore Trends",
    color: "bg-slate-900"
  },
  {
    id: 3,
    title: "Luxury Timepieces",
    subtitle: "Exquisite craftsmanship for the discerning importer.",
    image: "https://picsum.photos/seed/jewelry/1200/400",
    cta: "View Collection",
    color: "bg-secondary"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={banners[current].image}
            alt={banners[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 sm:px-16">
            <div className="max-w-lg text-white">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-5xl font-black mb-4 tracking-tighter uppercase leading-none"
              >
                {banners[current].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-lg text-gray-200 mb-8 font-medium"
              >
                {banners[current].subtitle}
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`${banners[current].color} text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg`}
              >
                {banners[current].cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              current === i ? "w-8 bg-primary" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
