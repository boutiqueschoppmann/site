"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Image principale */}
      <div className="relative aspect-square bg-charbon/5 overflow-hidden">
        <Image
          key={images[active].src}
          src={images[active].src}
          alt={images[active].alt}
          fill
          className="object-contain p-8 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
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
