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
    <Card>
      {/* Top half image — increased to h-72 for tall/portrait book covers */}
      <div className="relative w-full h-72 bg-gray-100 overflow-hidden rounded-t-xl">
        {c.image ? (
          <img
            src={c.image}
            alt={c.name || "বই"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            📚
          </div>
        )}

        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <Badge>{catLabel(c.category)}</Badge>
          <Badge variant="secondary">{subLabel(c.subcategory)}</Badge>
        </div>

        {c.validity ? (
          <div className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
            {c.validity}
          </div>
        ) : null}
      </div>

      {/* Bottom half description — all unchanged */}
      <div className="p-3 flex flex-col gap-1">
        <p className="font-semibold text-sm leading-snug line-clamp-2">
          {c.name || "বই"}
        </p>
        <p className="text-xs text-gray-500 line-clamp-2">
          {c.desc || "—"}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">মূল্য</span>
          <span className="font-bold text-sm text-green-600">
            ৳ {money(c.price)}
          </span>
        </div>
      </div>
    </Card>
  );
}