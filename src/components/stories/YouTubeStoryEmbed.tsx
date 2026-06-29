"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

type YouTubePlayerEvent = {
  data: number;
};

type YouTubePlayer = {
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
};

type YouTubeApi = {
  Player: new (
    element: HTMLIFrameElement,
    options: {
      events?: {
        onReady?: () => void;
        onStateChange?: (event: YouTubePlayerEvent) => void;
      };
    },
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YouTubeStoryEmbedProps = {
  videoId: string;
  title: string;
  caption?: string;
};

const playerState = {
  ended: 0,
  playing: 1,
} as const;

const endScreenBufferSeconds = 0.6;
let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function loadYouTubeApi(): Promise<YouTubeApi> {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT?.Player) {
        resolve(window.YT);
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

function getEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    controls: "0",
    disablekb: "1",
    enablejsapi: "1",
    fs: "0",
    iv_load_policy: "3",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
  });

  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function YouTubeStoryEmbed({
  videoId,
  title,
  caption,
}: YouTubeStoryEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (!isActive || !iframeRef.current) {
      return;
    }

    let cancelled = false;
    let player: YouTubePlayer | null = null;
    let timer: number | null = null;

    const hideBeforeEndScreen = () => {
      if (cancelled) {
        return;
      }
      cancelled = true;
      if (timer) {
        window.clearInterval(timer);
      }
      timer = null;
      try {
        player?.pauseVideo();
        player?.seekTo(0, true);
      } catch {
        // The embedded player can disappear while the iframe is being removed.
      }
      setHasFinished(true);
      setIsActive(false);
    };

    loadYouTubeApi().then((api) => {
      if (cancelled || !iframeRef.current) {
        return;
      }

      player = new api.Player(iframeRef.current, {
        events: {
          onReady: () => {
            timer = window.setInterval(() => {
              if (!player || cancelled) {
                return;
              }
              const duration = player.getDuration();
              const currentTime = player.getCurrentTime();
              const state = player.getPlayerState();

              if (
                state === playerState.playing &&
                duration > 0 &&
                currentTime > 1 &&
                duration - currentTime <= endScreenBufferSeconds
              ) {
                hideBeforeEndScreen();
              }
            }, 250);
          },
          onStateChange: (event) => {
            if (event.data === playerState.ended) {
              hideBeforeEndScreen();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (timer) {
        window.clearInterval(timer);
      }
      try {
        player?.destroy();
      } catch {
        // Ignore teardown races from the third-party iframe.
      }
    };
  }, [isActive]);

  const buttonLabel = hasFinished ? "Replay video" : "Play video";

  return (
    <figure className="my-10 overflow-hidden rounded-[2rem] bg-surface-inverse shadow-soft">
      <div className="relative aspect-video w-full">
        {isActive ? (
          <iframe
            ref={iframeRef}
            title={title}
            src={getEmbedSrc(videoId)}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setHasFinished(false);
              setIsActive(true);
            }}
            className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 bg-surface-inverse px-6 text-center text-on-surface-inverse transition-colors hover:bg-surface-charcoal focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-8px] focus-visible:outline-primary"
            aria-label={`${buttonLabel}: ${title}`}
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-soft transition-transform group-hover:scale-105">
              {hasFinished ? (
                <RotateCcw aria-hidden="true" className="size-9" />
              ) : (
                <Play aria-hidden="true" className="ml-1 size-9" />
              )}
            </span>
            <span className="max-w-lg font-serif text-2xl font-semibold leading-tight md:text-3xl">
              {title}
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {buttonLabel}
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption className="bg-surface-container-low px-6 py-4 text-sm text-on-surface-variant">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
