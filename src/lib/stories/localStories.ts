import { DEBBIE_IMG } from "@/lib/debbieImages";
import { KHOU_FLOOD_COVERAGE } from "@/lib/siteLinks";
import type { StoryDetail, StoryListItem } from "@/lib/sanity/types";
import { storyParagraphs } from "./storyBlocks";

/**
 * Repo-backed stories. `publishedAt` is the **event date** (when the visit or
 * crisis response happened), not when the story was added to the website.
 * Listed oldest → newest; public indexes sort newest event first.
 */
export const localStories: StoryDetail[] = [
  {
    _id: "local.sutherland-springs",
    title: "Church Shooting in Sutherland Springs, Texas",
    slug: "sutherland-springs",
    /** Crisis response — November 2017 (Debbie: exact visit date not recalled) */
    publishedAt: "2017-11-15T12:00:00.000Z",
    excerpt:
      "Angel Paws teams served with quiet presence after the Sutherland Springs tragedy—comfort when words were hard to find.",
    featuredImage: {
      url: "/gallery/Sutherland Springs Church Shooting.jpg",
      alt: "Angel Paws therapy dogs serving after the Sutherland Springs church shooting",
    },
    tags: ["visit", "crisis-response"],
    body: storyParagraphs([
      "After the church shooting in Sutherland Springs, Angel Paws teams traveled to serve survivors, families, first responders, and a grieving community. Therapy dogs offered calm presence in a moment when words were difficult and hearts were heavy.",
      "This is the heart of Angel Paws: trained teams entering schools, assisted living facilities, hospitals, churches, and moments of community crisis with humility and care. The dogs do not fix the loss. They make room for a breath, a prayer, a smile, or a few minutes when someone does not have to carry the whole weight alone.",
    ]),
  },
  {
    _id: "local.memory-care-ollie",
    title: "A Gentle Paw Opens a Quiet Heart",
    slug: "memory-care-ollie",
    /** Before 2020 (Debbie: exact date pending) — placeholder mid-2019 for sort order */
    publishedAt: "2019-06-01T12:00:00.000Z",
    excerpt:
      "Ollie helped a quiet resident at assisted living recall childhood memories—and opened a conversation about faith.",
    featuredImage: {
      url: DEBBIE_IMG.ollieMemoryCare,
      alt: "Ollie during a memory care visit at assisted living",
    },
    tags: ["visit", "memory-care"],
    body: storyParagraphs([
      "It was a Saturday morning and Ollie and I were visiting at an Assisted Living facility. As we walked to the main living area to meet with the sweet residents we had come to love, we noticed someone sitting on a bench by himself. I had never seen him so Ollie and I went over to introduce ourselves. The residents said, \"oh he doesn't talk to anyone.\" I knew Ollie could get him to talk so I sat Ollie beside him and introduced ourselves and told him today was pet therapy day—did he want to pet Ollie.",
      "He sat quietly for several minutes before he gently lifted his hand and began to stroke Ollie. Within a few minutes he began to tell us about the dog he had as a child. His father traveled a lot, so he only had his dog to play with. He loved his dog because it brought him joy and comfort. Then with the biggest smile he turned to me and said, \"I have one question for you—do you know Jesus?\" I told him briefly my salvation story and he said that he got saved as a boy when his preacher asked those that wanted to know Jesus to please come forward. He said, \"I didn't walk, I ran up to the front and accepted Jesus.\"",
      "We see these types of stories all the time. Just the mere petting of a dog can help people recall fond memories. That day Ollie made a new friend—and so did I.",
    ]),
  },
  {
    _id: "local.kerrville-tucker",
    title: "Stories from Tragedy in the Hill Country Flooding",
    slug: "kerrville-flood-tucker",
    /** First Kerrville trip after July 4, 2025 floods (Debbie, July 9, 2025) */
    publishedAt: "2025-07-09T12:00:00.000Z",
    excerpt:
      "A first responder asked Kathleen to deliver heartbreaking news about Tucker—a story of grief, hope, and faithful presence.",
    featuredImage: {
      url: DEBBIE_IMG.kerrvilleFlowers,
      alt: "Memorial flowers in Kerrville after Hill Country flooding",
    },
    tags: ["visit", "kerrville", "crisis-response"],
    body: [
      ...storyParagraphs([
        "One encounter in Kerrville will stay with me forever—Kathleen, a team member of Angel Paws. The storm became personal, even though I never knew them. A local first responder approached me with something in his hand and a face full of emotion. He asked, \"Can I ask something of you?\" I told him I would help in any way I could. He then handed me a bone-shaped tag from a dog collar with the name Tucker on it. On the back were Tucker's owner's phone numbers. He informed me that he had found Tucker's remains and had taken the tag to make a notification. He said, \"Because you are a pet therapy ministry, maybe you can deliver the news better than I can.\" How could I refuse?",
        "I think deep down, he suspected Tucker's family may not have survived the flood and his heart couldn't take it. I proceeded to call the first number on the tag and got voicemail. I left a message informing her that Tucker did not survive and that the first responder respectfully and lovingly took care of him. But even then, I had a sinking feeling in the pit of my stomach, so I searched the list of missing people from the flood. Sadly, I found Tucker's owners were still missing. I then saw a social media post from a family member seeking information about them, so I messaged her after I returned home.",
        "Theirs is a story of hope and survival. While Tucker and his owners did not survive the flood, three family members were rescued and were being treated at the hospital. I was able to return Tucker's tag to the family. She said that Tucker was a spoiled and beloved pet.",
      ]),
      {
        _type: "block",
        _key: "links-block",
        style: "normal",
        markDefs: [
          {
            _key: "khou1",
            _type: "link",
            href: KHOU_FLOOD_COVERAGE,
          },
        ],
        children: [
          {
            _type: "span",
            _key: "l1",
            text: "Related coverage: ",
            marks: [],
          },
          {
            _type: "span",
            _key: "l2",
            text: "Houston therapy dogs serve Kerrville flood survivors (KHOU)",
            marks: ["khou1"],
          },
        ],
      },
    ],
  },
  {
    _id: "local.comfort-hope-prayer-school",
    title: "A Moment of Comfort, Hope, and Prayer",
    slug: "a-moment-of-comfort-hope-and-prayer",
    /** High school cheer visit (Debbie, May 26, 2026) */
    publishedAt: "2026-05-26T12:00:00.000Z",
    excerpt:
      "During an Angel Paws visit with a local high school cheer team, a frightening medical emergency became a moment of prayer, comfort, and steady care.",
    featuredImage: {
      url: DEBBIE_IMG.ajSchools,
      alt: "Angel Paws therapy dog during a school visit",
    },
    tags: ["visit", "schools", "prayer", "comfort"],
    body: storyParagraphs([
      "Sometimes God opens a door in a way we never could have planned.",
      "Recently, the Angel Paws team had a visit scheduled with the cheer team at a local high school. Around 75 students were gathered and ready to spend time with the therapy dogs, excited for the comfort and joy that only a furry friend can bring.",
      "That morning, as Debbie Benningfield prayed over the visit, she sensed a clear prompting from the Holy Spirit to offer prayer for the students. Knowing that prayer in a public school setting can be sensitive, she reached out to the coach ahead of time and asked if that would be possible. The coach responded that it would be okay, as long as the students were asked first.",
      "About 30 minutes into the visit, one of the students was sitting on the floor petting the dogs when she suddenly fell backward and began having a seizure. The staff responded immediately, moving quickly to protect the student and care for her. Another staff member guided the rest of the students into a nearby room.",
      "As the Angel Paws team walked the dogs into the room where the students had gathered, the coach asked Debbie if she would pray for the girls. So right there, in the middle of a classroom, they prayed. They prayed for the student. They prayed for the students. They prayed for the coaches and staff. In a moment filled with fear and uncertainty, God provided comfort, peace, and the opportunity to point others to Him.",
      "This is the heart of Angel Paws. Yes, therapy dogs bring smiles. They help calm anxious hearts. They offer comfort through a gentle presence. But again and again, God uses this ministry to bring something even deeper: hope, compassion, and reminders of His nearness.",
      "This ministry is also deeply grateful for the continued support of Champion Forest Baptist Church. From the beginning, Champion Forest saw the good this ministry could do in the community and beyond, and that support has helped Angel Paws bring comfort, hope, and the love of Jesus to so many.",
      "As God continues to call Angel Paws to serve an even greater area, we know the next step was to form a 501(c)(3). Angel Paws trusted that calling and is now a 501(c)(3) nonprofit organization, ready to go wherever God calls us.",
      "God is still opening doors. And sometimes, those doors open through gentle paws, willing hearts, and a prayer offered at just the right moment.",
    ]),
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
