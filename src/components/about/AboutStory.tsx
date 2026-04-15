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
    body: "It began with a single visit to a local nursing home. Our founders witnessed how the presence of their family dog transformed an atmosphere of silence into one of joyful chatter and memories. That afternoon, the vision for Angel Paws was born—a mission to institutionalize these moments of grace across Houston.",
    reverse: false,
  },
  {
    media: {
      kind: "youtube",
      videoId: "sxl9IDVqQVw",
      iframeTitle: "Angel Paws ministry video on YouTube",
    },
    title: "Helping the Hurting",
    body: "From a small beginning, we have grown to meet more and more needs across our city and region. We expanded from a small team of three to a network of certified handlers and their faithful companions. From the Texas Medical Center to quiet suburban libraries, Angel Paws became a staple of community resilience, especially during times of local hardship.",
    reverse: true,
  },
  {
    media: {
      kind: "image",
      src: ABOUT_IMG.storyForward,
      alt: "Brown therapy cocker spaniel in a vest, looking toward the camera",
    },
    title: "Looking Forward",
    body: "Today, Angel Paws continues to evolve, integrating modern therapy techniques with our timeless faith foundation. We are committed to training the next generation of therapy teams, ensuring that the legacy of compassion continues to thrive for decades to come.",
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
