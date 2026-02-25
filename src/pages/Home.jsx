// src/pages/Home.jsx
import CourseCarousel from "../components/home/CourseCarousel.jsx";
import TutorialVideos from "../components/home/TutorialVideos.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";

export default function Home() {
  return (
    <div className="space-y-4">
      {/* Hero / Welcome */}
      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] font-extrabold text-white/60">
              <b>WELCOME 👋</b>
            </div>

            <div className="mt-1 text-lg leading-snug font-extrabold">
              বই নিন, পড়ুন, টেস্ট দিন
            </div>

            <div className="mt-2 text-sm leading-relaxed text-white/70">
              ক্যাটাগরি বাছাই করুন • বান্ডেল তৈরি করুন • সাবস্ক্রাইব করুন
            </div>

            {/* Optional quick actions for mobile */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>Admission Books</Badge>
              <Badge>HSC Books</Badge>
              <Badge>SSC Books</Badge>
            </div>
          </div>

          {/* Right side (kept minimal on mobile) */}
          <div className="flex flex-col items-end gap-2">
            {/* optional */}
            {/* <Badge>বাংলাদেশ</Badge> */}
          </div>
        </div>
      </Card>

      {/* Bundle / Books Carousel */}
      <CourseCarousel />

      <div id="tutorials" className="scroll-mt-24">
        <TutorialVideos />
      </div>
    </div>
  );
}