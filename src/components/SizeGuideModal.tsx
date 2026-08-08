"use client";

import { useEffect } from "react";
import {
  CloseIcon,
  RulerIcon,
  ScissorsIcon,
  VideoCameraIcon,
} from "@/components/icons";

const sizeChart = [
  { size: "S", bust: '34" / 86 cm', waist: '28" / 71 cm', hip: '36" / 91 cm' },
  { size: "M", bust: '36" / 91 cm', waist: '30" / 76 cm', hip: '38" / 97 cm' },
  { size: "L", bust: '38" / 97 cm', waist: '32" / 81 cm', hip: '40" / 102 cm' },
  { size: "XL", bust: '40" / 102 cm', waist: '34" / 86 cm', hip: '42" / 107 cm' },
  { size: "XXL", bust: '42" / 107 cm', waist: '36" / 91 cm', hip: '44" / 112 cm' },
];

const services = [
  {
    icon: ScissorsIcon,
    title: "Complimentary Custom Stitching",
    text: "Free custom stitching on all bridal & festive orders. Our in-house tailors will craft your piece to a flawless fit.",
  },
  {
    icon: RulerIcon,
    title: "Free Blouse Fitting",
    text: "Sarees come with complimentary blouse adjustments — send your measurements and we will tailor it for you.",
  },
  {
    icon: VideoCameraIcon,
    title: "Video Call Styling Appointment",
    text: "Book a one-on-one video call with our styling consultant for bridal looks, draping demos and outfit coordination.",
  },
];

export default function SizeGuideModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Size and custom stitching guide"
    >
      <div
        className="animate-fade-in absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="glass-strong animate-scale-in relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-accent-soft"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">
          <RulerIcon className="h-3.5 w-3.5" />
          Size & Custom Stitching Guide
        </span>

        <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
          Find your perfect fit
        </h2>
        <p className="mt-2 text-sm text-muted">
          Measure around the fullest part of your bust, natural waist and hips.
          Between sizes? We recommend sizing up — complimentary adjustments are
          included on every order.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-card-border">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-card-border bg-accent-soft">
                <th className="px-4 py-3 font-bold">Size</th>
                <th className="px-4 py-3 font-bold">Bust</th>
                <th className="px-4 py-3 font-bold">Waist</th>
                <th className="px-4 py-3 font-bold">Hip</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-card-border last:border-0"
                >
                  <td className="px-4 py-3 font-bold text-accent">{row.size}</td>
                  <td className="px-4 py-3 text-muted">{row.bust}</td>
                  <td className="px-4 py-3 text-muted">{row.waist}</td>
                  <td className="px-4 py-3 text-muted">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-4">
          {services.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="glass flex gap-4 rounded-2xl p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 rounded-xl bg-emerald-soft px-4 py-3 text-center text-xs font-medium text-emerald">
          Need help with measurements? Chat with our styling consultant on
          WhatsApp — we respond within minutes.
        </p>
      </div>
    </div>
  );
}
