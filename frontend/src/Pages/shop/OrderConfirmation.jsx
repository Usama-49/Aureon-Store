import {
  CircleCheckBig,
  MessageCircle,
  Mail,
  ArrowRight,
  AlertTriangle,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function OrderConfirmation() {
  const [countdown, setCountdown] = useState(3);
  const [isDisabled, setIsDisabled] = useState(true);

  const whatsappNumber = "923707084050";
  const supportEmail = "woodorycraft@gmail.com";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Admin, I just placed an order. I wanted to connect regarding my order confirmation.",
  )}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}&su=${encodeURIComponent(
    "Order Inquiry / Support",
  )}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl border border-green-400/80 rounded-2xl bg-gray-900/90 p-8 shadow-2xl">
        {/* Success Icon */}
        <div className="flex items-center justify-center">
          <CircleCheckBig className="text-green-400 h-16 w-16" />
        </div>

        {/* Title */}
        <div className="text-center mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Order Confirmed!</h2>
        </div>

        {/* Red Attention Banner */}
        <div className="mt-5 p-4 bg-red-500/15 border border-red-500/40 rounded-xl flex items-start gap-3">
          <AlertTriangle className="text-red-400 h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-sm text-red-200">
            <span className="font-bold text-red-400">Attention!: </span>
            Please keep your WhatsApp active. Our administration team will contact you shortly to
            verify your order details before dispatch.
          </div>
        </div>

        {/* Thank You & Description */}
        <div className="text-center mt-5">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Thank you for shopping with us! Your transaction is successfully complete. If you'd like
            to reach out immediately, you can contact admin directly below.
          </p>
        </div>

        {/* Action/Contact Card */}
        <div className="mt-5 p-5 bg-green-400/10 rounded-xl border border-green-400/30 space-y-3">
          <p className="text-xs text-green-200 text-center font-medium">
            Connect directly with our support team:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md cursor-pointer"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Email Support Button */}
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md cursor-pointer"
            >
              <Mail size={18} />
              <span>Email Support</span>
            </a>
          </div>
        </div>

        {/* Order Status Header Notice */}
        <div className="mt-5 p-3 bg-zinc-800/60 rounded-xl border border-zinc-700 flex items-center gap-2.5 text-zinc-300 text-xs sm:text-sm">
          <Package className="text-orange-400 shrink-0" size={18} />
          <span>
            You can always check your order status from the order icon in the header section.
          </span>
        </div>

        {/* Footer Note & Regards */}
        <div className="mt-5 text-center space-y-1">
          <p className="text-xs text-gray-400">
            For further queries, you can email us anytime via the contact section in the footer.
          </p>
          <p className="text-sm font-semibold text-orange-400 pt-2">
            Regards, <br />
            Aureon Team
          </p>
        </div>

        {/* Continue Shopping (Disabled for 3s) */}
        <div className="flex justify-center mt-6">
          {isDisabled ? (
            <button
              disabled
              className="cursor-not-allowed inline-flex items-center gap-2 px-6 py-3 bg-orange-600/50 text-white/60 text-sm font-semibold rounded-full shadow-none transition-all duration-200"
            >
              <span>Continue Shopping ({countdown}s)</span>
            </button>
          ) : (
            <Link to="/home">
              <button className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-orange-600/20 transition-all duration-200">
                <span>Continue Shopping</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
