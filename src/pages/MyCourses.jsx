import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import { myCourses } from "../data/mockData.js";

export default function MyCourses() {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-extrabold">My Courses</div>
        <div className="text-xs text-white/60">Big thumbnail cards</div>
      </div>

      {/* Bigger cards: 1 column for true mobile look */}
      <div className="grid gap-4">
        {myCourses.map((c) => (
          <Link key={c.id} to={`/my-courses/${c.id}`}>
            <Card className="overflow-hidden">
              {/* thumbnail */}
              <div className="relative h-44 w-full">
                <img
                  src={c.thumb}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-base font-extrabold leading-snug">{c.title}</div>
                  <div className="mt-1 text-xs text-white/70">{c.subtitle}</div>
                  <div className="mt-3 flex gap-2">
                    <Badge>{c.subjects.length} subjects</Badge>
                    <Badge>Tap to open</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
