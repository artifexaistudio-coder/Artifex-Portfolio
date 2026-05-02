"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    title: "AI Agents",
    image: "/images/ai-agents.png"
  },
  {
    title: "AI Receptionist",
    image: "/images/ai-receptionist.png"
  },
  {
    title: "Custom Website Building",
    image: "/images/web-dev.png"
  },
  {
    title: "App Building",
    image: "/images/app-dev.png"
  }
];

export function HeroIllustration() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-3xl" />

      <div className="relative w-full h-full max-w-[500px] md:max-w-[600px] lg:max-w-none rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,240,255,0.15)] glass">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SERVICES[currentIndex].image}
              alt={SERVICES[currentIndex].title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Service</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  {SERVICES[currentIndex].title}
                </h3>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
