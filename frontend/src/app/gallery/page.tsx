"use client";

import { useState, useEffect } from "react";
import {
  Maximize2,
  X,
  ArrowRight
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/primitives";
import BasicProvider from "@/utils/BasicProvider";
 
export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([{ id: "all", label: "All Photos" }]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePhoto, setActivePhoto] = useState<any | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { getMethod } = BasicProvider();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await getMethod("public/cms/gallery/home");
        if (res.status === "success" && res.data?.gallery) {
          const items = res.data.gallery.map((g: any, index: number) => ({
            id: g._id?._id || index,
            title: g.name,
            description: g.desc,
            category: g.link,
            image: g._id?.url
          }));

          // Extract unique categories dynamically (ignore empty ones)
          const uniqueCats = Array.from(new Set(items.map((i: any) => i.category).filter(Boolean)));
          const dynamicCats = [
            { id: "all", label: "All Photos" },
            ...uniqueCats.map((cat: any) => ({ id: cat, label: cat }))
          ];

          setGalleryItems(items);
          setCategories(dynamicCats);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-background">
      <PageHero
        title="Campus Life &amp; Facilities Gallery"
        description="Explore the state-of-the-art facilities engineered to foster intense concentration, conceptual curiosity, and student camaraderie."
        breadcrumbs={[{ label: "Gallery & Campus" }]}
      />

      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Reveal key={item.id}>
              <div
                onClick={() => setActivePhoto(item)}
                className="group flex flex-col h-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  
                  {item.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold tracking-wide text-foreground shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  )}

                  <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-display text-lg font-bold leading-tight text-foreground line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center text-xs font-semibold text-primary transition-colors group-hover:text-primary/80">
                      View Photo <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="max-h-[70vh] w-full object-contain bg-black"
            />

            <div className="p-6 bg-card">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {activePhoto.category}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                {activePhoto.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
