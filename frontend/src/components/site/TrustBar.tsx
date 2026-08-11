"use client";

import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import BasicProvider from "@/utils/BasicProvider";

export function TrustBar() {
  const [items, setItems] = useState<string[]>([]);
  const { getMethod } = BasicProvider();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await getMethod(`public/configuration/categories/byType/achievement`);
        if (res.status === "success" && res.data) {
          setItems(res.data.map((cat: any) => cat.name));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAchievements();
  }, []);

  const loop = items.length > 0 ? [...items, ...items, ...items] : [];

  if (loop.length === 0) return null;

  return (
    <section aria-label="Achievements" className="border-y border-border bg-surface py-5">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="marquee-track gap-3 pr-3">
          {loop.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 shadow-soft"
            >
              <BadgeCheck className="h-4 w-4 shrink-0 text-success" />
              <span className="whitespace-nowrap font-display text-sm font-semibold text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
