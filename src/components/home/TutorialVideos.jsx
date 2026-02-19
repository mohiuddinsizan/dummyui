import Card from "../ui/Card.jsx";
import { tutorialVideos } from "../../data/mockData.js";
import { Play } from "lucide-react";

export default function TutorialVideos() {
  return (
    <div className="space-y-2">
      <div>
        <div className="text-sm font-extrabold">Tutorial Videos</div>
        <div className="text-xs text-white/60">YouTube-style thumbnails</div>
      </div>

      <div className="grid gap-3">
        {tutorialVideos.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            {/* 16:9 thumbnail */}
            <div className="relative aspect-video w-full">
              <img
                src={v.thumb}
                alt={v.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              {/* dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* play button */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur shadow-[0_18px_60px_-40px_rgba(255,50,80,0.8)]">
                  <Play className="ml-1 h-7 w-7" />
                </div>
              </div>

              {/* duration badge */}
              <div className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2 py-1 text-[11px] font-extrabold text-white">
                {v.duration}
              </div>
            </div>

            {/* title area */}
            <div className="p-4">
              <div className="text-sm font-extrabold leading-snug">{v.title}</div>
              <div className="mt-1 text-xs text-white/60">{v.channel}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
