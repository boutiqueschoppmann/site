"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) setActive((i) => Math.min(i + 1, images.length - 1));
    else setActive((i) => Math.max(i - 1, 0));
    touchStartX.current = null;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Image principale */}
      <div
        className="relative aspect-square bg-charbon/5 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={images[active].src}
          src={images[active].src}
          alt={images[active].alt}
          fill
          className="object-contain p-8 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Indicateurs de pagination mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 md:hidden">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                  i === active ? "bg-charbon" : "bg-charbon/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                i === active ? "border-charbon" : "border-charbon/15 hover:border-charbon/35"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-2"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
