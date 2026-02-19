import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <Card className="p-4">
      <div className="text-xl font-extrabold">404</div>
      <div className="mt-1 text-sm text-white/65">Page not found.</div>
      <div className="mt-3">
        <Link to="/home">
          <Button>Go Home</Button>
        </Link>
      </div>
    </Card>
  );
}
