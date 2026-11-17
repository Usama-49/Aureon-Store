import { Mail, User, Phone, ExternalLink } from "lucide-react";

export default function CustomerInfo({ userEmail, whatsappNo }) {
  // Format local Pakistani numbers (e.g., 03001234567 -> 923001234567) for wa.me
  const formatWhatsAppLink = (number) => {
    if (!number) return "#";
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      return `https://wa.me/92${cleaned.slice(1)}`;
    }
    if (cleaned.startsWith("92")) {
      return `https://wa.me/${cleaned}`;
    }
    return `https://wa.me/${cleaned}`;
  };

  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-orange-500/70 
      hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">Customer Information</h2>

      <div className="space-y-5">
        {/* Customer Type */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <User size={20} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">Customer</p>
            <p className="font-medium text-white">Registered User</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <Mail size={20} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">Email</p>
            <p className="break-all text-white">{userEmail}</p>
          </div>
        </div>

        {/* WhatsApp Number */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Phone size={20} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">WhatsApp</p>
            {whatsappNo ? (
              <a
                href={formatWhatsAppLink(whatsappNo)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>{whatsappNo}</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <p className="text-zinc-500 text-sm">Not provided</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
