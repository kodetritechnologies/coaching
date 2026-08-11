"use client";

import { useState, useEffect } from "react";
import BasicProvider from "@/utils/BasicProvider";
import {
  MapPin,
  Phone,
  Mail,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { FaYoutube, FaInstagram, FaFacebook, FaTelegram, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export function Footer() {
  const [address, setAddress] = useState<any>({});
  const [socialLinks, setSocialLinks] = useState<any>({});
  const [quickLinks, setQuickLinks] = useState<any>({});
  const [quickNavigation, setQuickNavigation] = useState<any>({});
  const [campusCenters, setCampusCenters] = useState<any>({});
  const [aboutInstitute, setAboutInstitute] = useState<any>({});

  useEffect(() => {
    const fetchFooterData = async () => {
      const { getMethod } = BasicProvider();
      
      const fetchType = async (type: string, setter: any) => {
        try {
          const res = await getMethod(`public/configuration/footerSetting/${type}`);
          if (res.status === "success" && res.data?.value) {
            setter(res.data.value);
          }
        } catch (error) {
          console.error(`Failed to fetch ${type}`, error);
        }
      };

      await Promise.all([
        fetchType("address", setAddress),
        fetchType("social_links", setSocialLinks),
        fetchType("quick_links", setQuickLinks),
        fetchType("quick_navigation", setQuickNavigation),
        fetchType("campus_centers", setCampusCenters),
        fetchType("about_institute", setAboutInstitute)
      ]);
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="bg-primary-deep text-primary-foreground border-t border-white/10">
      <div className="section-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {aboutInstitute?.content && (
            <div dangerouslySetInnerHTML={{ __html: aboutInstitute.content }} />
          )}
          
          <div className="mt-6 flex gap-2">
            {[
              { icon: FaYoutube, label: "YouTube Masterclasses", href: socialLinks?.youtube },
              { icon: FaInstagram, label: "Instagram Campus Life", href: socialLinks?.instagram },
              { icon: FaFacebook, label: "Facebook Page", href: socialLinks?.facebook },
              { icon: FaTelegram, label: "Telegram Study Group", href: socialLinks?.telegram },
              { icon: FaXTwitter, label: "X (Twitter)", href: socialLinks?.twitter },
              { icon: FaLinkedin, label: "LinkedIn", href: socialLinks?.linkedin },
            ].filter(s => s.href).map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent">
            Academic Courses
          </h4>
          {quickLinks?.content && (
            <div 
              className="mt-4 space-y-2 text-sm text-primary-foreground/85 footer-links-container"
              dangerouslySetInnerHTML={{ __html: quickLinks.content }}
            />
          )}
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent">
            Quick Navigation
          </h4>
          {quickNavigation?.content && (
            <div 
              className="mt-4 space-y-2 text-sm text-primary-foreground/85 footer-links-container"
              dangerouslySetInnerHTML={{ __html: quickNavigation.content }}
            />
          )}
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent">
            Campus Centers
          </h4>
          {campusCenters?.content && (
            <div 
              className="mt-4 footer-links-container"
              dangerouslySetInnerHTML={{ __html: campusCenters.content }}
            />
          )}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/30">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/70 sm:flex-row">
          <div className="flex flex-col gap-1 sm:items-start items-center">
            <p>© 2026 Vidyasetu Classes Educational Society. All rights reserved.</p>
            <p>
              Designed and Developed by{" "}
              <a href="https://kodetri.com" target="_blank" rel="noreferrer" className="text-accent hover:underline font-semibold">
                Kodetri.com
              </a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Terms of Admission</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Fee Refund Rules</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Anti-Ragging Undertaking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
