// 

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useState } from "react"

const callouts = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg",
    href: "#",
  },
]

export default function Collections() {
  return (
    <section className="bg-card rounded-xl py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl font-bold text-primary">Collections</h2>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {callouts.map((callout) => (
            <motion.div
              key={callout.name}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-card/40 backdrop-blur-xl border border-white/10"
            >
              {/* IMAGE */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={callout.imageSrc}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <a
                    href={callout.href}
                    className="px-5 py-2 text-white bg-primary rounded-xl font-medium shadow-lg hover:bg-primary/90"
                  >
                    Explore →
                  </a>
                </div>
              </div>

              {/* TEXT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{callout.name}</h3>
                <p className="text-gray-400">{callout.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
