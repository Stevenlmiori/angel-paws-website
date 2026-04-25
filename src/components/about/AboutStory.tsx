import Image from "next/image";
import { ABOUT_IMG } from "./media";

const youtubeEmbedParams = new URLSearchParams({
  rel: "0",
  modestbranding: "1",
  playsinline: "1",
  /** Replays when the video ends so viewers are less likely to sit on YouTube’s end-screen suggestions. */
  loop: "1",
  playlist: "sxl9IDVqQVw",
});

type StoryMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "youtube"; videoId: string; iframeTitle: string };

const blocks: ReadonlyArray<{
  title: string;
  body: string;
  reverse: boolean;
  media: StoryMedia;
}> = [
  {
    media: {
      kind: "image",
      src: ABOUT_IMG.storySeed,
      alt: "Elderly woman laughing with a therapy dog in a care setting",
    },
    title: "The Seed of Hope",
    body: "In 2014, after receiving life-changing medical news, our founder began searching for hope and found both a church family and a renewed calling in Christ. Soon after, she witnessed how therapy-dog visits shifted hospital rooms from fear and isolation to calm conversation and comfort.",
    reverse: false,
  },
  {
    media: {
      kind: "youtube",
      videoId: "sxl9IDVqQVw",
      iframeTitle: "Angel Paws ministry video on YouTube",
    },
    title: "Helping the Hurting",
    body: "Angel Paws began in 2017 as a small church-based ministry and grew as requests for visits increased across Houston. We served schools, colleges, assisted living communities, hospitals, and crisis-impacted communities, and saw God open doors far beyond what our early team could have imagined.",
    reverse: true,
  },
  {
    media: {
      kind: "image",
      src: ABOUT_IMG.storyForward,
      alt: "Brown therapy cocker spaniel in a vest, looking toward the camera",
    },
    title: "Looking Forward",
    body: "Today, as a 501(c)(3) nonprofit ministry, we continue to equip handlers and therapy dogs to serve with excellence, humility, and compassion. Our prayer is simple: to keep sharing the love of Jesus through the steady comfort our pets bring to every place we are invited.",
    reverse: false,
  },
];

export function AboutStory() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="mb-16 text-center md:mb-20">
        <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-primary">
          The Journey
        </span>
        <h2 className="font-serif text-5xl text-on-surface md:text-6xl">
          Our Story
        </h2>
      </div>
      <div className="space-y-20 md:space-y-24">
        {blocks.map(({ media, title, body, reverse }) => (
          <div
            key={title}
            className={`flex flex-col items-center gap-12 md:flex-row md:gap-16 ${reverse ? "md:flex-row-reverse" : ""}`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg md:rounded-3xl">
                {media.kind === "image" ? (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <iframe
                    title={media.iframeTitle}
                    src={`https://www.youtube-nocookie.com/embed/${media.videoId}?${youtubeEmbedParams.toString()}`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="mb-6 font-serif text-3xl text-on-surface">
                {title}
              </h3>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-20 max-w-2xl text-center font-serif text-2xl italic text-primary md:mt-24 md:text-3xl">
        It&apos;s hard to explain, but easy to feel.
      </p>
    </section>
  );
}
