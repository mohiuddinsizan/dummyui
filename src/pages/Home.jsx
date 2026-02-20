import CourseCarousel from "../components/home/CourseCarousel.jsx";
import TutorialVideos from "../components/home/TutorialVideos.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";

export default function Home() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-white/60">Welcome</div>
            <div className="mt-1 text-xl font-extrabold">Learn. Practice. Improve.</div>
            <div className="mt-2 text-sm text-white/65">
              Explore courses, watch tutorials, and take tests.
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {/* <Badge>Mobile UI</Badge> */}
            {/* <Badge>Frontend only</Badge> */}
          </div>
        </div>
      </Card>

      <CourseCarousel />

      <div id="tutorials" className="scroll-mt-24">
        <TutorialVideos />
      </div>
    </div>
  );
}
