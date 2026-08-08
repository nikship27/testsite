import { WhatsAppIcon } from "@/components/icons";

const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with the store's WhatsApp number (country code + number, digits only)

const MESSAGE =
  "Hi Ethnic Threads! I'd like to speak with a styling consultant about custom stitching, blouse fitting, or booking a video call appointment.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with a styling consultant on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-xl shadow-black/20 transition hover:scale-105 active:scale-95"
    >
      <span className="relative">
        <WhatsAppIcon className="h-7 w-7" />
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#25D366] bg-amber-400" />
        </span>
      </span>
      <span className="hidden text-left sm:block">
        <span className="block text-xs font-semibold leading-tight">
          Chat with Styling Consultant
        </span>
        <span className="block text-[11px] leading-tight opacity-90">
          Custom stitching · Fitting · Video call
        </span>
      </span>
    </a>
  );
}
