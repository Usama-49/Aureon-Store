export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes energyFlow {
          0%, 100% {
            transform: scale(0.75);
            opacity: 0.35;
            box-shadow: 0 0 6px rgba(251,146,60,.25);
          }

          50% {
            transform: scale(1.35);
            opacity: 1;
            box-shadow: 0 0 18px rgba(251,146,60,.9);
          }
        }
      `}</style>

      <div className="flex items-center justify-center py-32">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full bg-orange-400"
            style={{
              animation: "energyFlow 1.05s ease-in-out infinite",
            }}
          />

          <span
            className="w-3 h-3 rounded-full bg-orange-400"
            style={{
              animation: "energyFlow 1.05s ease-in-out .18s infinite",
            }}
          />

          <span
            className="w-3 h-3 rounded-full bg-orange-400"
            style={{
              animation: "energyFlow 1.05s ease-in-out .36s infinite",
            }}
          />
        </div>
      </div>
    </>
  );
}
