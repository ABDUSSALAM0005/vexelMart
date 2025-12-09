import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import carousel from "../carousel";

const Hero = () => {
  return (
         <div className="bg-card mt-8 lg:mt-20 relative isolate rounded-xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="grid lg:grid-cols-2 py-10">
          <div className="mx-auto max-w-2xl lg:py-20 py-5 px-5">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              {/* <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                Discover the Latest Trends in Fashion Ecommerce.{" "}
                <a href="#" className="font-semibold text-indigo-400">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div> */}
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
                Discover the Latest Trends in Fashion Ecommerce
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                   Discover the latest trends and redifine your style with our online fashion outique.Embrace fashion's ever changing landscape and embark on a journey of self-expression through clothiing that empowers and inspires.
              </p>
              {/* <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                ></a>
                <a href="#" className="text-sm/6 font-semibold text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div> */}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Carousel variant="" className="w-full max-w-xl">
                       <CarouselContent>
    {/* FIX: Map directly over the default export array */}
    {carousel.map((image, index) => (
        <CarouselItem key={index}>
            {/* ... rest of item ... */}
            <img 
                className="w-full h-full object-cover object-center rounded-2xl" 
                src={image.src} // Correctly uses the 'src' field
            />
            {/* ... rest of item ... */}
        </CarouselItem>
    ))}
</CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
  )
}

export default Hero