// src/pages/SubjectDetail.jsx  (REPLACE with this; it is now BookChapters / BookDetail)
import { Link, useParams, useSearchParams } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { myBooks } from "../data/mockData.js";

export default function SubjectDetail() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();

  // ✅ now courseId is actually a BOOK id
  const book = Array.isArray(myBooks) ? myBooks.find((b) => b.id === courseId) : null;
  const chapters = Array.isArray(book?.chapters) ? book.chapters : [];

  // optional: if you want to highlight a selected chapter from query (?chapter=...)
  const activeChapterId = searchParams.get("chapter");

  if (!book) {
    return (
      <Card className="p-4">
        <div className="text-sm font-extrabold text-white">বই খুঁজে পাওয়া যায়নি</div>
        <div className="mt-1 text-xs text-white/65">
          এই আইডি দিয়ে কোনো বই নেই: <span className="text-white/80">{courseId}</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <Card className="p-4 overflow-hidden">
        <div className="relative h-36 -m-4 mb-4">
          {book.thumb ? (
            <img
              src={book.thumb}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : null}

          {/* visibility fix for bright images */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />

          <div className="absolute bottom-3 left-4 right-4">
            <div className="text-xs text-white/70">আমার বই</div>
            <div className="mt-1 text-lg font-extrabold text-white leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              {book.title}
            </div>
            {book.subtitle ? (
              <div className="mt-1 text-xs text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] line-clamp-2">
                {book.subtitle}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{chapters.length} টি অধ্যায়</Badge>
          <Badge>চ্যাপ্টার লিস্ট</Badge>
        </div>
      </Card>

      {/* Chapters */}
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <div className="text-sm font-extrabold text-white">অধ্যায়সমূহ</div>
          <div className="text-xs text-white/55">{chapters.length} টি</div>
        </div>

        {chapters.length === 0 ? (
          <Card className="p-4">
            <div className="text-sm font-extrabold text-white">এখনো কোনো অধ্যায় নেই</div>
            <div className="mt-1 text-xs text-white/65">mockData.js এ book.chapters যোগ করুন</div>
          </Card>
        ) : (
          <div className="grid gap-3">
            {chapters.map((ch, idx) => {
              const active = activeChapterId && activeChapterId === ch.id;

              return (
                <Link
                      key={ch.id || idx}
                      to={`/my-courses/${book.id}/chapters/${encodeURIComponent(ch.id || String(idx))}`}
                      className="block"
                    >
                  <Card
                    className={[
                      "p-4 border transition active:scale-[0.99]",
                      active
                        ? "border-red-400/40 bg-red-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/7",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-white truncate">
                          {idx + 1}. {ch.title}
                        </div>
                        <div className="mt-1 text-xs text-white/60">
                          {ch.duration ? ch.duration : "Tap to open"}
                        </div>
                      </div>
                      <div className="text-[11px] font-extrabold text-white/80">
                        খুলুন →
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Test CTA */}
      <Card className="p-4 border border-red-500/25 bg-red-500/10">
        <div className="text-sm font-extrabold text-white">এই বই থেকে টেস্ট দিন</div>
        <div className="mt-1 text-xs text-white/70">
          এই বইয়ের সব অধ্যায় মিলিয়ে একটি টেস্ট শুরু করুন।
        </div>
        <div className="mt-3">
          <Link to={`/test/setup?book=${book.id}`}>
            <Button className="w-full">Take Test →</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}