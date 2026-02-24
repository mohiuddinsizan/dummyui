// src/components/home/CourseCard.jsx
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

function money(n) {
  return Number(n || 0).toLocaleString();
}

function catLabel(v) {
  if (v === "admission") return "ভর্তি";
  if (v === "hsc") return "এইচএসসি";
  if (v === "ssc") return "এসএসসি";
  return "ক্যাটাগরি";
}

function subLabel(v) {
  if (v === "quick_preparation") return "কুইক প্রিপ";
  if (v === "guide") return "গাইড";
  if (v === "understanding") return "আন্ডারস্ট্যান্ডিং";
  if (v === "test_paper") return "টেস্ট পেপার";
  return "সিরিজ";
}

export default function CourseCard({ course }) {
  const c = course || {};
  return (
    <Card className="w-[280px] shrink-0 overflow-hidden">
      {/* Top half image */}
      <div className="relative h-32">
        {c.image ? (
          <img
            src={c.image}
            alt={c.name || "Book"}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="h-full w-full bg-white/5" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-extrabold leading-snug truncate">
              {c.name || "বই"}
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <Badge>{catLabel(c.category)}</Badge>
              <Badge>{subLabel(c.subcategory)}</Badge>
            </div>
          </div>

          {c.validity ? (
            <div className="flex-shrink-0">
              <Badge>{c.validity}</Badge>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom half description */}
      <div className="p-4">
        <div className="text-sm text-white/70">{c.desc || "—"}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-white/60">মূল্য</div>
          <div className="text-base font-extrabold">৳ {money(c.price)}</div>
        </div>
      </div>
    </Card>
  );
}