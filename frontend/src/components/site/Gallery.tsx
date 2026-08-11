"use client";

import { ArrowRight } from "lucide-react";
import { ActionButton, Reveal, SectionHeading } from "./primitives";
import { useEffect, useState } from "react";
import BasicProvider from "@/utils/BasicProvider";

export function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const { getMethod } = BasicProvider();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await getMethod("public/cms/gallery/home");
        if (res.status === "success") {
          const galleryDoc = res.data;
          if (galleryDoc && galleryDoc.gallery) {
            setPhotos(galleryDoc.gallery);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, []);
  return (
    <section id="gallery" className="bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Photo Gallery"
          title="Inside the Campus, Every Single Day"
          subtitle="Smart lecture halls, laboratories, silent 24x7 study zones, and grand annual felicitation ceremonies."
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:grid lg:grid-cols-3 [&>*]:mb-4">
          {photos.map((p, i) => (
            <Reveal key={p._id?._id || i} delay={(i % 3) * 70}>
              <figure className="zoom-media card-lift group relative overflow-hidden rounded-[24px] border border-border bg-card shadow-soft hover:border-primary/40 hover:shadow-lift transition-all">
                <img
                  src={p._id?.url || p.link || "/placeholder.jpg"}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full aspect-[4/3] object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/60 to-transparent p-4 font-display text-sm font-semibold text-primary-foreground">
                  {p.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ActionButton to="/gallery" variant="primary" size="lg">
            Explore Full Campus Life Gallery (60+ Photos) <ArrowRight className="h-4 w-4" />
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
