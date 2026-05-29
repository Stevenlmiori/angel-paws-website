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

function localImage(
  seed: string,
  src: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
  maxWidth?: number,
) {
  return {
    _type: "localImage",
    _key: key(seed),
    src,
    alt,
    width,
    height,
    caption,
    maxWidth,
  };
}

export const localStories: StoryDetail[] = [
  {
    _id: "local.a-moment-of-comfort-hope-and-prayer",
    title: "A Moment of Comfort, Hope, and Prayer",
    slug: "a-moment-of-comfort-hope-and-prayer",
    publishedAt: "2026-05-29T12:00:00.000Z",
    excerpt:
      "During an Angel Paws visit with the Bridgeland High School cheer team, a frightening medical emergency became a moment of prayer, comfort, and steady care.",
    tags: ["visit", "schools", "bridgeland", "prayer", "comfort"],
    featuredImage: {
      url: "/img/stories/bridgeland-high-school-cypress.jpg",
      alt: "Bridgeland High School in Cypress, Texas.",
    },
    seoTitle: "A Moment of Comfort, Hope, and Prayer | Angel Paws",
    seoDescription:
      "A recent Angel Paws school visit became a moment of comfort and prayer for students and staff after a medical emergency.",
    body: [
      block("bridgeland_intro", "normal", [
        "Sometimes God opens a door in a way we never could have planned.",
      ]),
      block("bridgeland_visit", "normal", [
        "Recently, the Angel Paws team had a visit scheduled with the cheer team at Bridgeland High School. Around 75 students were gathered and ready to spend time with the therapy dogs, excited for the comfort and joy that only a furry friend can bring.",
      ]),
      block("bridgeland_prompting", "normal", [
        "That morning, as Debbie Benningfield prayed over the visit, she sensed a clear prompting from the Holy Spirit to offer prayer for the students. Knowing that prayer in a public school setting can be sensitive, she reached out to the coach ahead of time and asked if that would be possible. The coach responded that it would be okay, as long as the students were asked first.",
      ]),
      block("bridgeland_emergency", "normal", [
        "About 30 minutes into the visit, one of the students, Riley, was sitting on the floor petting the dogs when she suddenly fell backward and began having a seizure. The staff responded immediately, moving quickly to protect her and care for her. Another staff member guided the rest of the students into a nearby room.",
      ]),
      block("bridgeland_prayer", "normal", [
        "As the Angel Paws team walked the dogs into the room where the students had gathered, the coach asked Debbie if she would pray for the girls.",
      ]),
      block("bridgeland_quote", "blockquote", [
        "So right there, in the middle of a classroom, they prayed.",
      ]),
      block("bridgeland_prayed_for", "normal", [
        "They prayed for Riley. They prayed for the students. They prayed for the coaches and staff. In a moment filled with fear and uncertainty, God provided comfort, peace, and the opportunity to point others to Him.",
      ]),
      block("bridgeland_heart_heading", "h2", ["This is the heart of Angel Paws"]),
      block("bridgeland_heart", "normal", [
        "Yes, therapy dogs bring smiles. They help calm anxious hearts. They offer comfort through a gentle presence. But again and again, God uses this ministry to bring something even deeper: hope, compassion, and reminders of His nearness.",
      ]),
      block("bridgeland_growth", "normal", [
        "As Angel Paws moves toward becoming a 501(c)(3) nonprofit organization, the ministry is preparing for growth. There are already more requests than the team can currently meet, and the hope is that this next step will allow Angel Paws to serve even more schools, hospitals, churches, organizations, and families in need of comfort and encouragement.",
      ]),
      block("bridgeland_gratitude", "normal", [
        "The ministry is also deeply grateful for the continued support of Champion Forest Baptist Church. From the beginning, Champion Forest saw the good this ministry could do in the community and beyond, and that support has helped Angel Paws bring comfort, hope, and the love of Jesus to so many.",
      ]),
      block("bridgeland_close", "normal", [
        "God is still opening doors. And sometimes, those doors open through gentle paws, willing hearts, and a prayer offered at just the right moment.",
      ]),
    ],
  },
  {
    _id: "local.klein-isd-superintendent-letter",
    title: "A Letter of Support from Klein ISD",
    slug: "klein-isd-superintendent-letter",
    publishedAt: "2026-05-29T11:00:00.000Z",
    excerpt:
      "Dr. Jenny McGown, Klein ISD Superintendent of Schools, shared a letter recognizing the meaningful impact Angel Paws continues to make for students, staff, and families.",
    tags: ["schools", "klein-isd", "testimony", "partnership"],
    featuredImage: {
      url: "/img/stories/klein-isd-promise2purpose.png",
      alt: "Klein ISD Promise2Purpose logo.",
    },
    seoTitle: "A Letter of Support from Klein ISD | Angel Paws",
    seoDescription:
      "Read Klein ISD Superintendent Dr. Jenny McGown's letter recognizing Angel Paws' partnership with schools and support for students, staff, and families.",
    body: [
      block("klein_intro", "normal", [
        "Angel Paws is grateful for the opportunity to serve schools across our community, including campuses throughout Klein ISD. One recent testimony came in the form of a letter from Dr. Jenny McGown, Klein ISD Superintendent of Schools.",
      ]),
      block("klein_support", "normal", [
        "In her letter, Dr. McGown offered support for the work of Angel Paws and recognized the meaningful impact the program continues to make among Klein ISD students, staff, and families.",
      ]),
      localImage(
        "klein_mcgown_portrait",
        "/img/stories/dr-jenny-mcgown-portrait.jpeg",
        "Dr. Jenny McGown, Klein ISD Superintendent of Schools.",
        512,
        640,
        "Dr. Jenny McGown, Klein ISD Superintendent of Schools.",
        360,
      ),
      block("klein_quote", "blockquote", [
        "Angel Paws provides far more than companionship through animals; the program creates opportunities for connection, healing, and personal growth for those it serves.",
      ]),
      block("klein_schultz_heading", "h2", [
        "A partnership that began with students",
      ]),
      block("klein_schultz", "normal", [
        "Dr. McGown highlighted Angel Paws' partnership with Schultz Elementary, the first campus in Klein ISD to welcome the program. Through its reading program, select students have been able to read aloud to well-trained therapy dogs, helping them improve reading fluency while also building confidence and self-esteem.",
      ]),
      block("klein_beyond", "normal", [
        "Over time, Angel Paws has expanded beyond the reading program to support professional development days, Meet the Teacher events, Career Day presentations, and moments when emotional support is needed most.",
      ]),
      block("klein_letter_heading", "h2", ["Read the letter"]),
      localImage(
        "klein_letter_image",
        "/img/stories/dr-jenny-mcgown-angel-paws-letter.jpeg",
        "Letter from Dr. Jenny McGown, Klein ISD Superintendent of Schools, supporting Angel Paws.",
        1117,
        1405,
        "Letter dated May 21, 2026 from Dr. Jenny McGown, Klein ISD Superintendent of Schools.",
      ),
      block("klein_gratitude", "normal", [
        "We are thankful for school partners who welcome this ministry and recognize how God can use all of His creation to bless others, even those with fur.",
      ]),
    ],
  },
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
