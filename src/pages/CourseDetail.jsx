// src/pages/CourseDetail.jsx
import { Link, useParams } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { myBooks, myBundles } from "../data/mockData.js";

export default function CourseDetail() {
  const { courseId } = useParams();

  // ✅ New data structure:
  // bundle.books[] (each book has chapters[])
  // book.chapters[]
  const bundle = Array.isArray(myBundles) ? myBundles.find((b) => b.id === courseId) : null;
  const book = Array.isArray(myBooks) ? myBooks.find((b) => b.id === courseId) : null;

  // ===== Bundle View =====
  if (bundle) {
    const books = Array.isArray(bundle.books) ? bundle.books : []; // ✅ direct books

    return (
      <div className="space-y-4">
        {/* Header */}
        <Card className="p-4 overflow-hidden">
          <div className="relative h-36 -m-4 mb-4">
            {bundle.thumb ? (
              <img
                src={bundle.thumb}
                alt={bundle.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : null}
            {/* readability overlay */}
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
            <div className="absolute bottom-3 left-4 right-4">
              <div className="text-xs text-white/70">আমার বান্ডেল</div>
              <div className="mt-1 text-lg font-extrabold text-white leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                {bundle.title}
              </div>
              {bundle.subtitle ? (
                <div className="mt-1 text-xs text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] line-clamp-2">
                  {bundle.subtitle}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>{books.length} টি বই</Badge>
            <Badge>বান্ডেল</Badge>
          </div>
        </Card>

        {/* Books */}
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <div className="text-sm font-extrabold text-white">বান্ডেলের বইগুলো</div>
            <div className="text-xs text-white/55">{books.length} টি</div>
          </div>

          {books.length === 0 ? (
            <Card className="p-4">
              <div className="text-sm font-bold text-white">এই বান্ডেলে এখনো কোনো বই নেই</div>
              <div className="mt-1 text-xs text-white/65">mockData.js এ bundle.books যোগ করুন</div>
            </Card>
          ) : (
            <div className="grid gap-3">
              {books.map((bk) => (
                <Link key={bk.id} to={`/my-courses/${bk.id}`} className="block">
                  <Card className="p-3.5 border border-white/10 bg-white/5 hover:bg-white/7 transition active:scale-[0.99]">
                    <div className="flex items-center gap-3">
                      <img
                        src={bk.thumb}
                        alt={bk.title}
                        className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-extrabold text-white truncate">{bk.title}</div>
                        <div className="mt-1 text-xs text-white/60 truncate">{bk.subtitle}</div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-[11px] text-white/55">
                            {(bk.chapters?.length || 0)} টি অধ্যায়
                          </div>
                          <div className="text-[11px] font-extrabold text-white/80">
                            খুলুন →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bundle Test CTA */}
        <Card className="p-5 border border-red-500/25 bg-red-500/10">
          <div className="text-base font-extrabold text-white">এই বান্ডেল থেকে টেস্ট দিন</div>
          <div className="mt-2 text-sm text-white/70 leading-relaxed">
            বান্ডেলের সব বই/অধ্যায় মিলিয়ে কম্বাইন্ড টেস্ট দিতে নিচের বাটনে চাপুন।
          </div>
          <div className="mt-4">
            <Link to={`/test/setup?bundle=${bundle.id}`}>
              <Button className="w-full">কম্বাইন্ড টেস্ট →</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // ===== Book View =====
  if (!book) {
    return (
      <Card className="p-4">
        <div className="text-sm font-bold text-white">বই/বান্ডেল খুঁজে পাওয়া যায়নি।</div>
      </Card>
    );
  }

  const chapters = Array.isArray(book.chapters) ? book.chapters : [];

  return (
    <div className="space-y-4">
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
          <Badge>বই</Badge>
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
            <div className="text-sm font-bold text-white">এই বইয়ে এখনো কোনো অধ্যায় নেই</div>
            <div className="mt-1 text-xs text-white/65">mockData.js এ book.chapters যোগ করুন</div>
          </Card>
        ) : (
          <div className="grid gap-3">
            {chapters.map((ch, idx) => (
                <Link
                  key={ch.id || idx}
                  to={`/my-courses/${book.id}/chapters/${encodeURIComponent(ch.id || String(idx))}`}
                  className="block"
                >
                <Card className="p-3.5 border border-white/10 bg-white/5 hover:bg-white/7 transition active:scale-[0.99]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-white truncate">
                        {idx + 1}. {ch.title}
                      </div>
                      {ch.duration ? (
                        <div className="mt-1 text-xs text-white/60">{ch.duration}</div>
                      ) : (
                        <div className="mt-1 text-xs text-white/50">অধ্যায়</div>
                      )}
                    </div>
                    <div className="text-[11px] font-extrabold text-white/80">খুলুন →</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Book Test CTA */}
      <Card className="p-5 border border-red-500/25 bg-red-500/10">
        <div className="text-base font-extrabold text-white">এই বই থেকে টেস্ট দিন</div>
        <div className="mt-2 text-sm text-white/70 leading-relaxed">
          এই বইয়ের সব অধ্যায় মিলিয়ে একটি পূর্ণাঙ্গ টেস্ট দিতে নিচের বাটনে চাপুন।
        </div>
        <div className="mt-4">
          <Link to={`/test/setup?book=${book.id}`}>
            <Button className="w-full">এই বই থেকে টেস্ট →</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}