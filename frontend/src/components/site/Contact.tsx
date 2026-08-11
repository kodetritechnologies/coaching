"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { FaEnvelope, FaMapLocationDot, FaWhatsapp, FaPhone, FaArrowRight, FaBuilding } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { ActionButton, Reveal, SectionHeading } from "./primitives";
import BasicProvider from "@/utils/BasicProvider";

const courses = [
  "IIT-JEE (Main + Advanced)",
  "NEET UG Medical",
  "Olympiad Foundation (Class 6-10)",
  "CUET UG",
  "All-India Test Series (AIATS)",
  "VSAT Scholarship 2026",
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [address, setAddress] = useState<any>({});
  const { getMethod, postMethod } = BasicProvider();

  const [coursesList, setCoursesList] = useState<any[]>([]);

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const res = await getMethod(`public/configuration/footerSetting/address`);
        if (res.status === "success" && res.data?.value) {
          setAddress(res.data.value);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await getMethod(`public/configuration/categories/course`);
        if (res.status === "success" && res.data) {
          setCoursesList(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddressData();
    fetchCourses();
  }, []);

  const contactCards = [
    { icon: FaPhone, label: "Central Helpline", value: address.mobile, href: `tel:${address.mobile}` },
    { icon: FaEnvelope, label: "Admissions Desk", value: address.email, href: `mailto:${address.email}` },
    { icon: FaWhatsapp, label: "WhatsApp Support", value: address.mobile, href: `https://wa.me/${address.mobile?.replace(/[^0-9]/g, "")}` },
    { icon: FaMapLocationDot, label: "Headquarters Campus", value: address.address, href: "/contact" },
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newErrors: Record<string, string> = {};
    const name = data.name as string;
    const phone = data.phone as string;

    if (!name || name.trim().length < 3) {
      newErrors.name = "Student Name must be at least 3 characters.";
    }

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setSubmitting(true);

    try {
      const response = await postMethod("public/cms/contact/create", data);
      if (response.status === "success" || response.message) {
        toast.success(
          "Academic Enquiry Received!\nA senior academic counselor will connect with you within 2 hours."
        );
        form.reset();
      } else {
        toast.error("Failed to submit enquiry. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-surface py-20 border-t border-border">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Admissions &amp; Campuses"
          title="Book a Free 1-on-1 Mentorship &amp; Demo Session"
          subtitle="Visit the campus, meet the Kota faculty HODs, sit through a live lecture — then decide."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <div className="grid h-full gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {contactCards.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="card-lift flex items-center gap-3 rounded-[22px] border border-border bg-card p-5 shadow-soft hover:border-primary/40 transition-all"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="block truncate font-display text-sm font-bold text-foreground">
                        {c.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div
                id="map"
                className="overflow-hidden rounded-[26px] border border-border shadow-soft relative group"
              >
                <iframe
                  title="Vidyasetu Classes campus location on Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(address.address)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0 lg:h-full lg:min-h-[16rem]"
                />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center rounded-xl bg-card/95 backdrop-blur-md p-3 border border-border text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <FaBuilding className="h-4 w-4 text-primary" /> 6 Campuses in Central India
                  </span>
                  <Link href="/contact" className="font-bold text-primary hover:underline flex items-center gap-1">
                    View All Locations <FaArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <form
              onSubmit={onSubmit}
              className="rounded-[26px] border border-border bg-card p-7 shadow-lift sm:p-8"
            >
              <h3 className="font-display text-xl font-bold text-foreground">Academic Admission Enquiry</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Get a personalized study roadmap and batch availability details.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold text-foreground">
                  Student Name *
                  <input
                    name="name"
                    placeholder="e.g. Ananya Gupta"
                    className={`rounded-xl border ${errors.name ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-input focus:border-primary focus:ring-primary/20'} bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:ring-2`}
                  />
                  {errors.name && <span className="text-destructive text-[10.5px] font-medium">{errors.name}</span>}
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-foreground">
                  Parent / Student Phone *
                  <input
                    name="phone"
                    type="tel"
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="9876543210"
                    className={`rounded-xl border ${errors.phone ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-input focus:border-primary focus:ring-primary/20'} bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:ring-2`}
                  />
                  {errors.phone && <span className="text-destructive text-[10.5px] font-medium">{errors.phone}</span>}
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-foreground">
                  Current Class
                  <input
                    name="class"
                    placeholder="e.g. Class 11 Moving · 2028"
                    className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-foreground">
                  Target Programme
                  <select
                    name="course"
                    className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {coursesList.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-foreground sm:col-span-2">
                  Specific Query or Hostel Requirement
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us about previous academic background or hostel requests..."
                    className="resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <div className="mt-6">
                <ActionButton type="submit" variant="accent" size="lg" className="w-full">
                  {submitting ? "Submitting Inquiry…" : "Book Free Mentorship Session"} <FaArrowRight className="h-4 w-4" />
                </ActionButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
