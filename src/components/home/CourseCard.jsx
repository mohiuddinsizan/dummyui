import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

export default function CourseCard({ course }) {
  return (
    <Card className="w-[280px] shrink-0 overflow-hidden">
      {/* Top half image */}
      <div className="relative h-32">
        <img
          src={course.image}
          alt={course.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="text-sm font-extrabold">{course.name}</div>
          <Badge>{course.validity}</Badge>
        </div>
      </div>

      {/* Bottom half description */}
      <div className="p-4">
        <div className="text-sm text-white/70">{course.desc}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-white/60">Price</div>
          <div className="text-base font-extrabold">৳ {course.price}</div>
        </div>
      </div>
    </Card>
  );
}
