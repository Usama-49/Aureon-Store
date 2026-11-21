import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

export default function ProductGallery({ images = [], productName = "Product" }) {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const validImages = (Array.isArray(images) ? images : [])
    .filter((url) => typeof url === "string" && url.trim().length > 0)
    .slice(0, 4);

  const safeActiveIndex =
    activeImageIndex === null || validImages.length === 0
      ? null
      : Math.min(activeImageIndex, validImages.length - 1);

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === null ? null : (prev - 1 + validImages.length) % validImages.length,
    );
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev === null ? null : (prev + 1) % validImages.length));
  };

  useEffect(() => {
    if (safeActiveIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [safeActiveIndex, validImages.length]);

  if (validImages.length === 0) return null;

  return (
    <>
      <section className="mt-14 pt-8 border-t border-gray-700">
        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-200">
          <Images className="w-5 h-5 text-orange-400" />
          <span className="ml-2">Product Gallery</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {validImages.map((imgUrl, index) => (
            <button
              key={`${imgUrl}-${index}`}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 border border-gray-700 hover:border-orange-500/70 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <img
                src={imgUrl}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 right-3 bg-gray-950/80 text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                {index + 1} / {validImages.length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {safeActiveIndex !== null && validImages[safeActiveIndex] && (
        <div
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-gray-900 border border-gray-700 rounded-2xl p-3 sm:p-5 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close image preview"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800/90 text-gray-200 hover:text-orange-400 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-black max-h-[75vh]">
              <img
                src={validImages[safeActiveIndex]}
                alt={`${productName} preview ${safeActiveIndex + 1}`}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {validImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-gray-900/80 text-white hover:bg-orange-500 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-gray-900/80 text-white hover:bg-orange-500 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-gray-300 px-1">
              <span className="truncate">{productName}</span>
              <span className="font-semibold text-orange-400 shrink-0 ml-3">
                Image {safeActiveIndex + 1} of {validImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
