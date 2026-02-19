import { Link, useParams } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { myCourses } from "../data/mockData.js";

export default function SubjectDetail() {
  const { courseId, subjectId } = useParams();
  const course = myCourses.find((c) => c.id === courseId);
  const subject = course?.subjects.find((s) => s.id === subjectId);

  if (!course || !subject) {
    return (
      <Card className="p-4">
        <div className="text-sm font-bold">Subject not found.</div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div className="text-xs text-white/60">{course.title}</div>
        <div className="text-xl font-extrabold">{subject.title}</div>
        <div className="mt-2 text-sm text-white/65">
          Choose a chapter to open details.
        </div>
      </Card>

      <div className="grid gap-3">
        {subject.chapters.map((ch) => (
          <Link
            key={ch.id}
            to={`/my-courses/${course.id}/subjects/${subject.id}/chapters/${ch.id}`}
          >
            <Card className="p-4">
              <div className="text-sm font-extrabold">{ch.title}</div>
              <div className="mt-1 text-xs text-white/60">Tap to view</div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="p-4">
        <div className="text-sm font-extrabold">Take Test</div>
        <div className="mt-1 text-xs text-white/60">
          Start a test from this subject.
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
