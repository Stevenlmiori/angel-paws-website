import type { StoryDetail, StoryListItem } from "@/lib/sanity/types";

type Run = string | { text: string; href: string };

function key(seed: string) {
  return `local_${seed}`;
}

function block(
  seed: string,
  style: "normal" | "h2" | "blockquote",
  runs: Run[],
) {
  const markDefs: Array<{ _type: "link"; _key: string; href: string }> = [];
  const children = runs.map((run, index) => {
    if (typeof run === "string") {
      return {
        _type: "span",
        _key: key(`${seed}_span_${index}`),
        text: run,
        marks: [],
      };
    }
    const markKey = key(`${seed}_link_${index}`);
    markDefs.push({ _type: "link", _key: markKey, href: run.href });
    return {
      _type: "span",
      _key: key(`${seed}_span_${index}`),
      text: run.text,
      marks: [markKey],
    };
  });

  return {
    _type: "block",
    _key: key(seed),
    style,
    children,
    markDefs,
  };
}

export const localStories: StoryDetail[] = [
  {
    _id: "local.a-calm-presence-in-kerrville",
    title: "A Calm Presence in Kerrville",
    slug: "a-calm-presence-in-kerrville",
    publishedAt: "2026-05-22T04:14:13.000Z",
    excerpt:
      "After the July 2025 Kerrville floods, Angel Paws teams brought therapy dogs to survivors, responders, and school staff. Covey, Kathleen Yeaman's Boykin Spaniel, was part of that quiet ministry of comfort.",
    tags: ["visit", "kerrville", "covey", "flood-response", "home-spotlight"],
    featuredImage: {
      url: "/img/stories/covey-kerrville.jpeg",
      alt: "Covey, an Angel Paws therapy dog who serves in assisted living and community care visits.",
    },
    seoTitle: "A Calm Presence in Kerrville | Angel Paws",
    seoDescription:
      "Angel Paws was featured by CNN after therapy dog teams served flood survivors and responders in Kerrville. Read Covey's story of comfort and care.",
    body: [
      block("kerrville_intro", "normal", [
        "In July 2025, after devastating flash flooding in the Texas Hill Country, Angel Paws teams traveled from Houston to Kerrville with a simple ministry posture: show up, listen, and let trained therapy dogs offer calm where words were hard to find.",
      ]),
      block("kerrville_cnn", "normal", [
        "That quiet work was noticed nationally. ",
        {
          text: "CNN News Central",
          href: "https://transcripts.cnn.com/show/cnc/date/2025-07-16/segment/04",
        },
        " featured Angel Paws on July 16, 2025, describing the dogs as comfort for first responders and flood survivors. Debbie Benningfield told CNN that the dogs know their job: to comfort.",
      ]),
      block("kerrville_quote", "blockquote", [
        "These dogs know their job very well.",
      ]),
      block("kerrville_presence_heading", "h2", [
        "Covey's ministry of presence",
      ]),
      block("kerrville_presence_1", "normal", [
        "One of the dogs serving in that season was Covey, Kathleen Yeaman's Boykin Spaniel and longtime Angel Paws therapy dog. In Kathleen's account for the Boykin Spaniel Club newsletter, she shared that Covey has a special gift for memory care and assisted living visits: moving slowly, leaning in gently, and helping people feel seen without being rushed.",
      ]),
      block("kerrville_presence_2", "normal", [
        "In Kerrville, that same steady presence mattered. Angel Paws teams visited places serving responders, survivors, relief workers, school staff, and community members carrying grief in different ways. Covey sat with people who needed a pause, a soft head to touch, and a reminder that comfort can arrive quietly.",
      ]),
      block("kerrville_after_heading", "h2", ["After the cameras left"]),
      block("kerrville_after_1", "normal", [
        "The story did not end with one trip or one news segment. Kathleen wrote that Angel Paws returned to Kerrville for additional visits, including a day with school teachers and staff preparing for a difficult year after the flood. At one high school, the dogs arrived before staff left for a memorial service for a family connected to the school community.",
      ]),
      block("kerrville_after_2", "normal", [
        "This is the heart of Angel Paws: trained teams entering schools, assisted living facilities, hospitals, churches, and moments of community crisis with humility and care. The dogs do not fix the loss. They make room for a breath, a prayer, a smile, or a few minutes when someone does not have to carry the whole weight alone.",
      ]),
      block("kerrville_help_heading", "h2", ["How to help"]),
      block("kerrville_help", "normal", [
        "If your school, care facility, church, or community organization would benefit from a therapy dog visit, ",
        { text: "request a visit", href: "/contact" },
        ". If you want to help Angel Paws continue bringing comfort into places of need, you can ",
        { text: "give here", href: "/donate" },
        ".",
      ]),
      block("kerrville_sources", "normal", [
        "Sources reviewed: ",
        {
          text: "CNN transcript from July 16, 2025",
          href: "https://transcripts.cnn.com/show/cnc/date/2025-07-16/segment/04",
        },
        "; ",
        {
          text: "StateDefenseForce.com coverage of Kerrville recovery efforts",
          href: "https://statedefenseforce.com/2025/07/22/hope-in-the-aftermath-texas-state-guard-aids-central-texas-in-long-term-recovery/",
        },
        "; and Kathleen Yeaman's September 2025 Boykin Spaniel Club newsletter article, ",
        {
          text: '"Covey and Angel Paws: Therapy Ministry."',
          href: "https://img1.wsimg.com/blobby/go/9b51756f-d8a0-4f7e-90e1-6fa56ef746c0/September%20Newsletter%202025%20COM-ca8ad04.pdf",
        },
      ]),
    ],
  },
];

export function getLocalStoryBySlug(slug: string): StoryDetail | null {
  return localStories.find((story) => story.slug === slug) ?? null;
}

export function getLocalStorySlugs(): string[] {
  return localStories.map((story) => story.slug);
}

export function getLocalPublishedStories(tag?: string): StoryListItem[] {
  const tagNorm = tag?.trim().toLowerCase() ?? "";
  return localStories
    .filter((story) => {
      if (!tagNorm) {
        return true;
      }
      return (story.tags ?? []).map((x) => x.toLowerCase()).includes(tagNorm);
    })
    .map((story) => ({
      _id: story._id,
      title: story.title,
      slug: story.slug,
      publishedAt: story.publishedAt,
      excerpt: story.excerpt,
      featuredImage: story.featuredImage,
      tags: story.tags,
    }))
    .sort((a, b) => {
      const ad = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bd = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bd - ad;
    });
}

export function mergePublishedStories(
  localItems: StoryListItem[],
  sanityItems: StoryListItem[],
): StoryListItem[] {
  const seen = new Set<string>();
  return [...localItems, ...sanityItems]
    .filter((story) => {
      if (seen.has(story.slug)) {
        return false;
      }
      seen.add(story.slug);
      return true;
    })
    .sort((a, b) => {
      const ad = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bd = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bd - ad;
    });
}
