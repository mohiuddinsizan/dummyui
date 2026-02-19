import { Link, useParams } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { myCourses } from "../data/mockData.js";

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = myCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <Card className="p-4">
        <div className="text-sm font-bold">Course not found.</div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div className="text-xl font-extrabold">{course.title}</div>
        <div className="mt-1 text-sm text-white/65">{course.subtitle}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{course.subjects.length} subjects</Badge>
          <Badge>Board focused</Badge>
        </div>
      </Card>

      <div className="space-y-2">
        <div className="text-sm font-extrabold">Subjects</div>
        <div className="grid gap-3">
          {course.subjects.map((s) => (
            <Link key={s.id} to={`/my-courses/${course.id}/subjects/${s.id}`}>
              <Card className="p-4">
                <div className="text-sm font-extrabold">{s.title}</div>
                <div className="mt-1 text-xs text-white/60">
                  {s.chapters.length} chapters
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Take Test below subject list */}
      <Card className="p-4">
        <div className="text-sm font-extrabold">Ready to practice?</div>
        <div className="mt-1 text-xs text-white/60">
          Take a quick test from this course.
        </div>
        <div className="mt-3">
          <Link to="/test/setup">
            <Button>Take Test</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
