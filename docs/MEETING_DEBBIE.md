# Debbie meeting prep — Angel Paws website

**Purpose:** One document Debbie can read before or during a walkthrough: what is on the site today (marketing copy + global header/footer), how images are wired, what still uses placeholder content, and what we need from her to finish strong.

**Prepared:** April 14, 2026.

---

## How to use this doc

1. Skim **Budget & timeline** and **Executive snapshot**.
2. Use **Sitemap** as a checklist while clicking through the preview site.
3. For wording edits, jump to **Page-by-page copy** for the route you are on.
4. End with **Questions for Debbie** and **Action items** so decisions turn into a short to-do list.

---

## Budget & timeline

**Timeline (current plan)**

| Milestone | Date | Notes |
|-----------|------|--------|
| First full draft ready for Debbie’s review | **May 11, 2026** | Marketing pages + global chrome (header/footer) in reviewable shape. |
| Target site wrap | **June 1, 2026** | Depends on how quickly we edit together after May 11 (copy, photos, forms, and any factual corrections). |

**Budget**

- **Website creation:** **$2,000 flat fee**, due **upon completion** of the site.
- **Third-party dues and costs** (hosting, domain, and any paid services tied to running the site) are **in addition** to the flat fee and are paid directly or passed through as agreed.
- **Rough order of magnitude:** about **$50–$100** to get started (domain, hosting setup, and similar), then about **$50–$100 per year** ongoing for hosting and related recurring items—actual amounts depend on providers and what you enable (e.g. forms, donations, optional add-ons).

---

## Executive snapshot

- **Angel Paws Pet Therapy** is presented as a **faith-based pet therapy ministry** in the **Greater Houston** area, sharing comfort through certified therapy dog teams in hospitals, schools, care settings, and community contexts.
- The public site is a **Next.js** marketing site with embedded **Tally** contact/visit forms (when configured), **Donorbox** on `/donate`, and a **member portal** at `/members/portal` for password-protected resources.
- **Champion Forest** is referenced on the “What is pet therapy?” page as the church context for how faith shapes the work.
- Several sections still use **template statistics**, **sample board bios**, or **remote placeholder photos** (see **Placeholders & factual review**).

---

## Sitemap (marketing + member entry pages)

| Path | What Debbie sees |
|------|------------------|
| `/` | Home — mission, what we do, meetings, impact, scripture quote, where we serve, carousel, volunteer CTA |
| `/about` | Who we are, mission & beliefs, therapy-dog distinction, story timeline, CTA to board |
| `/what-is-pet-therapy` | Definition, why it works, outcomes, policies, CTA |
| `/where-we-serve` | Presence intro, hospitals / schools / care / community, facility CTA |
| `/meet-the-board` | Board hero, impact narrative, board grid (+ “Could you be next?”) |
| `/get-involved` | Hero, ways to serve, path to membership, application CTA |
| `/members` | Membership hero, four steps, member portal teaser |
| `/members/portal` | Sign-in or resource hub (after password) |
| `/donate` | Case for support, impact areas, Donorbox panel, newsletter strip |
| `/contact` | “Get in touch” + Tally embeds + map teaser |

**Global chrome:** `SiteHeader` (nav, Donate, Member Resources) and `SiteFooter` (mission links, quick links, connect icons, legal links).

---

## Global chrome

### Header (all pages)

- **Brand:** Logo image + visible wordmark **“Angel Paws”** (logo file: `public/brand/angel-paws/logo@2x.png`; logo `alt` is empty in code today).
- **Primary navigation:** **Home** · **About** (dropdown: **Who We Are & Beliefs** → `/about`, **What is Pet Therapy?** → `/what-is-pet-therapy`, **Meet our Board** → `/meet-the-board`, **Where We Serve** → `/where-we-serve`) · **Get Involved** · **Members** · **Contact**
- **Utility:** **Member Resources** → `/members/portal` (wide screens + mobile menu) · **Donate** → `/donate`
- **Mobile:** Same links under **About** subsection heading “About”.

### Footer

- **Title:** Angel Paws  
- **Tagline:** “Serving our community through faith, compassion, and the comfort of therapy dogs.”

**Mission column**

- Who We Are → `/about`
- Beliefs → `/about`
- Where We Serve → `/where-we-serve`

**Quick Links**

- Donate → `/donate`
- Contact → `/contact`
- What Is Pet Therapy → `/what-is-pet-therapy`
- Membership → `/members`
- Member Portal → `/members/portal`

**Connect**

- Icons labeled Website, Email, Support — **all currently link to `#` (placeholder).**
- **Privacy Policy** → `#` · **Terms of Service** → `#`

**Copyright line**

- “© [current year] Angel Paws Pet Therapy. A Digital Home for Healing and Hope.”

---

## Page-by-page copy

Copy below is **user-visible marketing text** from components (not page metadata). Headings reflect on-page hierarchy.

### `/` — Home

**Hero**

- Eyebrow: **Faith-Based Ministry**
- H1: **Sharing Hope and *Comfort* through the Love of a Furry Friend.**
- Lead: Angel Paws is a faith-based pet therapy ministry in the Houston area, sharing the love of Jesus through the steady comfort of therapy dogs.
- Buttons (labels only; **not wired as links in code today**): **Join Our Mission** · **Donate Now**
- Pull quote card: “When I needed a hand, you gave me your paw.”

**Mission band**

- Kicker: **Mission**
- Statement: Our mission is to share **Jesus** through the unconditional love our pets give to those whom God places in our path.

**They show up**

- H2: **They show up.**
- Body: Therapy dogs do something simple that makes a real difference. They show up. / In hospitals, schools, and care facilities, our dogs bring a calm presence into places that often feel heavy. For a few minutes, the room changes. People breathe easier. Conversations open up. Shoulders relax. / They don’t fix everything. But they make hard moments easier.
- **Hospitals & Healthcare** (on photo tile): A calm presence for patients, families, and staff—easing anxiety before procedures and bringing comfort on long days.
- **Schools & Literacy:** A more relaxed environment—students read, talk, or sit with a dog with less pressure and more focus.
- **Care Facilities:** Companionship and familiarity—moments of connection that break through loneliness and routine.

**Informational Meetings**

- H2: **Informational Meetings**
- Intro: Interested in joining Angel Paws? Come to our next informational meeting to learn about requirements, temperament testing, and how you and your pet can serve the community.
- **Card 1:** Tuesday, May 12, 2026 — 6:30 PM — 8:00 PM — CFBC Northwest Campus, Dining Hall — Quarterly Informational Meeting for prospective new members.
- **Card 2:** Saturday, August 15, 2026 — 10:00 AM — 11:30 AM — CFBC Champions Campus, Room 402 — Special workshop for existing members and focus on veteran outreach.
- Callout: **Questions before the meeting?** — “We're happy to chat about the vetting process or help you decide if your pet is a good fit for therapy work.” — Button: **Contact Debbie**

**Why it matters**

- Eyebrow: **Why it matters**
- H2: **A short visit can go a long way.**
- Body: Time with a therapy dog has been shown to lower stress, ease anxiety, and help people feel more at peace. But beyond the research, you can see it happen in real time. / A patient smiles for the first time that day. A student who was anxious starts to settle. A family in a difficult moment feels just a little more steady. / **It’s simple. And it matters.**
- Stats: **1,000+** People Visited · **Houston** Area Served
- Button (not linked): **Read Our Stories**

**Scripture band**

- Quotation: “The King will reply, ‘Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.’”
- Cite: **Matthew 25:40**

**Where We Serve (home strip)**

- H2: **Where We Serve**
- Sub: Our ministry extends across the Greater Houston area, from major medical centers to local elementary schools.
- Tiles (titles only): Medical Center · Hospice Care · Elementary Schools · Mental Health

**Bottom volunteer CTA**

- H2: **Ready to Share the Love with Your Furry Friend?**
- Body: We would love for you and your dog to join our growing therapy team family. You do not need special experience, just a gentle spirit and a heart to serve.
- Buttons (not linked): **Become a Volunteer** · **Partner With Us**

**Homepage carousel** (`HOME_SLIDES`)

1. **Unconditional Love** — A calm presence beside little ones—comfort that does not need words.
2. **Gentle Companions** — Sharing steady, patient friendship in hospitals, schools, and care settings.
3. **Hope in Small Moments** — Sometimes the first step toward healing is a warm paw and a gentle hand.

---

### `/about` — Who we are

**Hero**

- Eyebrow: **Our Heart**
- H1: **Who We Are**
- Body: Angel Paws exists to bring comfort, encouragement, and connection through therapy dogs. / We serve in places where people are often facing stress, uncertainty, or difficult circumstances. Hospitals, schools, and care environments where even a small moment of calm can mean a lot. / Our teams are made up of trained volunteers and their dogs who give their time to simply be present. No pressure. No expectations. / **Just a calm, steady presence when it’s needed most.**
- Floating card (large screens): “The presence of a dog can unlock a door to the soul that has been closed for years.” — **Founder’s Reflection**

**Our Mission & Beliefs**

- H2: **Our Mission & Beliefs**
- Tag: Guided by faith, led by compassion, and sustained by the simple wag of a tail.
- **Kingdom Ministry:** We believe our pets are a gift from God, uniquely designed to break down barriers and open hearts to the Gospel message.
- **Unconditional Love:** Our therapy visits model the selfless, judging-free love that Christ offers to us, bringing peace to hospitals, schools, and homes.
- **Vetted Excellence:** To honor God in our service, we maintain rigorous training and temperament standards, ensuring every visit is safe and professional.
- **Sharing Hope:** We exist to be 'Kingdom Builders' in Northwest Houston, using the simple act of a wagging tail to start deep conversations about hope.

**What Makes Therapy Dogs Different**

- H2 as titled
- Body: Therapy dogs are not service animals trained for one individual. / They are trained to interact with many people, offering comfort, companionship, and emotional support in a variety of environments. / They don’t judge. They don’t rush. They don’t interrupt. / **They just show up, and that’s often enough.**

**Our Story**

- Section kicker: **The Journey** · H2: **Our Story**
- **The Seed of Hope:** It began with a single visit to a local nursing home. Our founders witnessed how the presence of their family dog transformed an atmosphere of silence into one of joyful chatter and memories. That afternoon, the vision for Angel Paws was born—a mission to institutionalize these moments of grace across Houston.
- **Helping the Hurting:** From a small beginning, we have grown to meet more and more needs across our city and region. We expanded from a small team of three to a network of certified handlers and their faithful companions. From the Texas Medical Center to quiet suburban libraries, Angel Paws became a staple of community resilience, especially during times of local hardship. *(Media: embedded YouTube ministry clip — `https://www.youtube.com/watch?v=sxl9IDVqQVw` — privacy-oriented `youtube-nocookie.com` player with `rel=0`, modest branding, and loop so the end screen is less prominent.)*
- **Looking Forward:** Today, Angel Paws continues to evolve, integrating modern therapy techniques with our timeless faith foundation. We are committed to training the next generation of therapy teams, ensuring that the legacy of compassion continues to thrive for decades to come. *(Media: AI placeholder — brown cocker spaniel in a therapy vest, wide composition for the 16:9 panel — replace when ministry art is ready.)*
- Closing line: **It’s hard to explain, but easy to feel.**

**Leadership CTA**

- H2: **Want to learn more about our leadership?**
- Body: Meet the dedicated board members and specialists who guide our ministry with wisdom and heart.
- Button: **Meet the Board**

---

### `/what-is-pet-therapy`

- Eyebrow: **What We Do**
- H1: **What is *pet therapy*?**
- Intro: Pet therapy, often called animal-assisted therapy, is the use of trained animals to support people emotionally and mentally. **At its core, it’s about connection.** Our therapy dogs visit hospitals, schools, and care facilities to spend time with people who may be dealing with stress, anxiety, illness, or loneliness. Even a few minutes with a dog can help someone feel more at ease.

**Why It Works**

- Short lines: There’s something about a dog that puts people at ease. / They don’t expect anything. They don’t need conversation. They don’t bring pressure into the room. / That kind of presence can change how a person feels, even in a short visit.

**What We See Every Day** (bullets)

- Patients who relax during difficult treatments
- Students who gain confidence and focus
- People who simply feel less alone  
- Line: **You can see the difference almost immediately.**

**Cards**

- **What are your safety policies?** Safety is our priority. Every team is vaccinated, temperament-tested, and certified. We adhere to the policies of each facility, ensuring a professional and hygienic environment for all visits.
- **How does faith shape your work?** As a ministry of Champion Forest, we believe a faithful dog carries the comfort Christ asks us to share. We love without agenda, offering prayer and presence wherever we are invited.

**Policies & Procedures**

- H3: **Policies & Procedures**
- Intro: To ensure the highest quality of service, Angel Paws teams follow a strict set of protocols:
- **Certification:** All dogs must pass a temperament evaluation and basic obedience test.
- **Health:** Up-to-date vaccinations and wellness exams are required annually.
- **Conduct:** Handlers are trained in active listening and proper hospital etiquette.
- **Frequency:** Teams typically visit for 1-2 hours at a time to ensure the comfort and health of the animal.

**CTA band**

- H2: **Want to learn more?**
- Body: Read how we serve on **Where We Serve**, or reach out on **Contact** with a question.
- Button: **Thinking about membership** → `/members`

---

### `/where-we-serve`

**Hero**

- Eyebrow: **Our Presence**
- H1: **A Presence in *Every Corner.***
- Body: Our teams serve in a variety of environments across the community. / Each one is different, but the need is the same. A calm presence in the middle of real life.
- Side quote: “The paws that heal are found wherever they are needed most.”

**Hospitals**

- In hospitals, our dogs visit patients, families, and staff. / They help ease anxiety before procedures, bring comfort during long days, and give people something to look forward to. / **For many, it becomes the best part of their day.**
- Bullets: Critical & Intensive Care Support · Post-Operative Rehabilitation Motivation · Waiting Area Anxiety Reduction

**Schools**

- In schools, therapy dogs help create a more relaxed and supportive environment. / Students often feel more comfortable reading, talking, or simply sitting with a dog. It lowers pressure and helps them focus.
- **Program Highlight** quote: “Dogs don’t correct pronunciation; they just wag their tails and listen to the magic of the words.”
- Bullets: One-on-One Literacy Coaching · University Finals Week De-stressing

**Care Facilities**

- In care homes and similar settings, therapy dogs bring companionship and familiarity. / They create moments of connection that can break through loneliness and routine.
- Stat tiles: **85%** Resident Engagement Increase · **400+** Visits Annually

**Community Outreach**

- Beyond the walls of institutions, Angel Paws is active in the heart of our city. We provide support at community events, memorials, and public safety initiatives, demonstrating the power of the human-animal bond for all.
- Link label: **Explore Event Calendar** → currently **`#`** (placeholder)

**Bottom CTA**

- Quote: A calm presence can change the tone of an entire room.
- H2: **Does your facility need a *visit from Angel Paws?***
- Body: We are always looking to expand our reach. If you represent a healthcare, educational, or community organization, we invite you to apply for our services.
- **Request a Visit** — button, **not linked** in code today · **Become a Volunteer** → `/get-involved`

---

### `/meet-the-board`

**Hero**

- Eyebrow: **The Heart of Our Mission**
- H1: **Guided by compassion, led by *connection.***
- Lead: Meet the dedicated individuals who volunteer their time and expertise to ensure every community we touch feels the healing power of a cold nose and a warm heart.
- Quote card: “Our board members aren’t just leaders; they’re the first to volunteer for a shift.”

**Impact band**

- Eyebrow: **Our Shared Vision**
- H2: **Every paw print leaves a mark on the soul.**
- Body: Our board meets monthly not just to review numbers, but to share stories from the field. It’s this proximity to our mission—the actual wagging tails and the smiles they provoke—that keeps our leadership grounded and focused.
- Stats: **500+** Monthly Visits · **12** Districts Served

**Board grid** (each card: name, role badge, “Companion: [name]”, bio — **all five people below are sample data in code, not verified ministry facts**)

1. **Sarah Jenkins** — President — Companion: Barnaby — With 15 years in healthcare administration, Sarah founded Angel Paws after seeing the transformative effect Barnaby had on hospital patients during their private visits.
2. **Michael Chen** — Treasurer — Companion: Pippin — Michael brings financial precision and a soft heart to the board. He believes that emotional support should be accessible to everyone, regardless of their circumstances.
3. **Elena Rodriguez** — Secretary — Companion: Luna — A retired school teacher, Elena coordinates our education initiatives. She is passionate about the bond between therapy animals and children with learning disabilities.
4. **David Thorne** — Strategy — Companion: Copper — David ensures our long-term growth is sustainable. His dog Copper is a favorite at the local veterans' hospice where they visit weekly.
5. **Maya Patel** — Community — Companion: Roo — Maya leads our community outreach and volunteer recruitment. Her background in social work helps us identify new areas where pet therapy can make a difference.

**Closing card**

- H3: **Could you be next?**
- Body: We are always looking for passionate individuals to join our advisory councils and committees.
- Button: **Get Involved** → `/get-involved`

---

### `/get-involved`

**Hero**

- Eyebrow: **Join Us**
- H1: **Become a *Healing Presence.***
- Body: There are a few simple ways to be part of what’s happening through Angel Paws. / Whether you have a dog, time to give, or just want to support the work, there’s a place for you.

**Ways to serve**

- Eyebrow: **Ways to serve** · H2: **Many gifts, one mission**
- **Become a Therapy Team:** If you have a dog with the right temperament, you may be able to serve together. Our teams go through training and evaluation before visiting facilities. Once approved, you'll be part of something that makes a real difference in people's lives.
- **Serve Without a Dog:** Not everyone has a dog, but there are still ways to help. From assisting with coordination to supporting visits and events, your time matters.
- **Support the Work:** Every visit takes preparation, training, and coordination. Your support helps make more visits possible and allows us to reach more people in our community.

**Path to membership**

- H2: **Path to membership**
- Sub: A simple sequence—we never rush the heart or the dog. Timelines vary by team and season.
- **01 Intro conversation:** Tell us your story and your dog's temperament. We'll help you understand time commitments and heart posture.
- **02 Orientation:** Learn our faith foundation, safeguarding expectations, and how we partner with each facility.
- **03 Skills & evaluation:** Handlers and dogs complete practical training aligned with industry standards and our ministry culture.
- **04 Serve:** Join a team, receive mentoring, and begin scheduled visits with ongoing support from Angel Paws.

**Closing CTA**

- H2: **Ready for the next step?**
- Body: Share a little about yourself—we’ll follow up with the right forms, training dates, and a warm welcome.
- Italic: You don’t have to do everything. You just have to take the next step.
- **Start an application** → currently **`#`** (placeholder) · **See where we serve** → `/where-we-serve`

---

### `/members`

**Hero**

- Eyebrow: **Membership**
- H1: **How you *become a member***
- Lead: Angel Paws grows through families who love Jesus and love dogs. If that sounds like you, here is the gentle path we follow—no rush, no pressure, just clarity.

**Steps**

1. **Say hello** — Reach out through Contact. Tell us a little about you and your dog—we read every message.
2. **Meet and learn** — We will walk you through expectations, training rhythms, and how visits fit real life.
3. **Train and certify** — Your dog’s temperament and health matter. We help you understand what certification asks and where to get it.
4. **Serve together** — When you are ready, you join a team that shows up with humility—treat bags in one pocket, prayers in the other.

**Member portal teaser**

- H2: **Member portal**
- Body: Members sign in with the team password to open forms, policies, and Drive links in one place—simple for our team to update and simple for handlers to find.
- Bullets: Membership roster (for members) · Annual wellness form · Incident report form · Policies and handbooks (PDFs)
- Button: **Go to portal** → `/members/portal`

---

### `/members/portal`

**Signed out**

- H1: **Member portal**
- Body: Enter the password your team lead shared with you. This page lists forms, policies, and other links—without digging through email.
- Form label: **Member password** · Submit: **Unlock resources** / while submitting: **Checking…**
- Link: **Back to membership** → `/members`

**Signed in — Resource hub**

- Eyebrow: **Members**
- H1: **Resource hub**
- Sub: Forms, policies, and links your team uses often—kept in one place.
- Button: **Sign out**
- Empty state: No resources are published yet. Please check back soon.
- Footer line: Need something that is not listed? **Contact the team** → `/contact`

**Misconfigured server (operators only)**

- If env vars are missing, visitors may see **Portal setup needed** with a short technical explanation and **Back to membership**.

---

### `/donate`

**Hero**

- Eyebrow: **Support Our Mission**
- H1: **Healing Hearts, *One Paw* at a Time.**
- Lead: Your generosity allows us to provide certified therapy animals to hospitals, schools, and communities in need. Every dollar directly supports the care, training, and travel of our dedicated animal partners.
- **Donate Now** (anchor to panel) · **Learn More** → `/get-involved`
- Side stat: **100%** — Of public donations fund direct animal care and training.

**How Your Gift Helps**

- **Hospital Visits:** Funding specialized training for high-stress medical environments.
- **School Programs:** Supporting literacy programs and emotional support in classrooms.
- **Animal Welfare:** Ensuring our therapy partners receive top-tier veterinary care.

**Testimonial**

- Quote: Seeing my daughter smile for the first time in weeks because of a visit from Bella was a miracle we'll never forget.
- Attribution: **Sarah J.** — Parent of a patient

**Donation panel**

- H2: **Make a Secure Donation**
- Sub: Give through Donorbox—one-time or recurring. Payment details stay with Donorbox; we never see them on this site.
- Trust row: Secure checkout (Donorbox) · 501(c)(3) nonprofit

**Newsletter**

- H2: **Stay Connected with Hope**
- Body: Subscribe to our newsletter for heartwarming stories of recovery and updates on where our therapy teams are visiting next.
- Field placeholder: Enter your email address · Button: **Subscribe** *(form is UI-only today; submit does not send yet)*

---

### `/contact`

**Get in touch**

- H2: **Get in touch**
- Lead: Share a question, request a visit, or tell us a bit about your organization. We will follow up as soon as we can.
- **Tally:** When form IDs are set in environment variables, the page embeds your Tally form(s). If not configured, visitors see **Contact forms coming soon** with instructions for operators (references `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID` and optional `NEXT_PUBLIC_TALLY_VISIT_FORM_ID`).
- When visit form is present: **Request a visit** — Tell us about your facility or need. We will follow up by email or phone.

**Quick links aside**

- **Home** · **Member Portal** · **Donate**

**Map teaser**

- H2: **We Serve Across the Region**
- Body: From hospitals to schools, we bring comfort wherever it's needed most in the **Tri-State area.** *(Geography should be reconciled with Houston-first copy elsewhere.)*
- Button: **Explore Service Areas** → `/where-we-serve`

---

## Image inventory

Paths and keys are centralized in `src/lib/siteImages.ts` (`SITE_IMAGES`); each file or remote URL is wired from one page module (see per-page `media.ts` under `src/components/`).

### Real ministry photos (local JPEGs in `public/img/`)

| File | Used for (summary) |
|------|---------------------|
| `gave-me-your-paw.jpg` | Home hero only (pairs with the “…gave me your paw.” quote in `HomeHero`) |
| `sam-comforting-kid-2.jpg` | Home “Care Facilities” pillar photo tile |
| `angelpaws-dog-and-owner-nk_horizontal.jpg` | Home impact / feature strip |
| `sam-comforting-kid-1.jpg` | *(Present on disk; not referenced in the current site registry — available if you want it wired to a specific block.)* |

**Ideal for Debbie:** Confirm the in-use JPEGs are approved for web, credit/caption preferences, and whether any should be swapped (e.g. more explicit “CFBC / Angel Paws” context in frame).

### AI / design placeholders (local PNGs in `public/img/`)

| File | Used for (summary) |
|------|---------------------|
| `about-hero-therapy-team.png` | About page hero |
| `about-story-seed-of-hope.png` | Homepage carousel slide 1 |
| `about-story-bayou-city.png` | Homepage carousel slide 2 |
| `about-story-looking-forward-cocker.png` | About Our Story “Looking Forward” (wide framing for the video-shaped panel) |

Replace these with ministry-owned photography when ready.

### Remote / placeholder-style imagery (URLs in code, not local files)

- **About** — Hero uses local AI PNG above. **Our Story:** first chapter uses a unique Unsplash dog+care photo; second chapter is a **YouTube embed** (see **Helping the Hurting** under `/about`); third chapter uses `about-story-looking-forward-cocker.png`. All wired via `src/components/about/media.ts` and `AboutStory.tsx`.
- **Home** — Additional Unsplash images for pillars and carousel slide 3 are defined in `src/components/home/media.ts` (see `SITE_IMAGES` for exact URLs).
- **Where We Serve** hero + four area photos — `src/components/where-we-serve/media.ts`.
- **Meet the Board** hero, impact image, and each board headshot — `src/components/meet-the-board/media.ts`.
- **Donate** hero — `src/components/donate/media.ts`.
- **Contact** map image — `src/components/contact/media.ts`.
- **Get Involved** hero reuses **About** hero image key (same local PNG).

**Plan:** Treat remote URLs and AI placeholders as **replaceable** until Debbie supplies final photography or approved stock. For each section, decide: keep URL, upload to `public/`, or swap to a ministry-owned asset.

### Brand

- Header logo: `public/brand/angel-paws/logo@2x.png`

---

## Forms & integrations (reference only — no secrets)

| System | Role on site | Configuration (see `.env.example`) |
|--------|----------------|--------------------------------------|
| **Tally** | Contact + optional “request a visit” embed on `/contact` | `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID`, `NEXT_PUBLIC_TALLY_VISIT_FORM_ID` |
| **Donorbox** | Donation widget on `/donate` | `NEXT_PUBLIC_DONORBOX_CAMPAIGN` (optional; has default in code) |
| **Member portal** | Password gate + resource cards | `MEMBER_PORTAL_PASSWORD`, `MEMBER_PORTAL_COOKIE_SECRET`, optional session TTL; Redis keys for persisted links in production |
| **Member portal admin** | Not in public nav; bookmark for operators | `MEMBER_PORTAL_ADMIN_EMAIL`, `MEMBER_PORTAL_ADMIN_PASSWORD` |

Operator-facing detail also lives in `docs/HANDOFF.md`.

---

## Placeholders & factual review

| Item | Where | Suggested action |
|------|--------|------------------|
| **Tri-State area** vs Houston | `/contact` map teaser | Rewrite to Greater Houston (or your actual service geography). |
| **Sample board** names, roles, bios, photos | `/meet-the-board` | Replace with real board roster and photos; remove or adjust stats (**500+** visits, **12** districts) if not sourced. |
| **Story narrative** (founding, TMC, “team of three”) | `/about` Our Story | Confirm accuracy or mark as inspirational draft. |
| **Home / Care stats** (**1,000+**, **85%**, **400+**) | Home, Where We Serve | Confirm, source, or soften wording. |
| **Testimonial “Sarah J.” / Bella** | `/donate` | Replace with a permissioned real quote or remove. |
| **Buttons not linked** | Home hero & CTA, Home impact, Where We Serve “Request a Visit” | Wire to `/contact`, Tally anchor, Donate, or `#donate-panel` as you decide. |
| **`#` links** | Footer social/legal, Get Involved application, Community “Event Calendar” | Replace with real URLs or remove until ready. |
| **Newsletter form** | `/donate` | Connect to your email platform or hide until live. |
| **Logo `alt` text** | Header | Set to meaningful alt (e.g. “Angel Paws Pet Therapy”) for accessibility. |

---

## Launch checklist (short)

- [ ] Debbie approval on mission wording, geography, and Champion Forest references  
- [ ] Replace placeholder imagery paths with final assets  
- [ ] Tally forms live + tested; optional visit form  
- [ ] Donorbox campaign tested end-to-end  
- [ ] Member portal password rotated and shared through secure channel  
- [ ] Footer legal + social URLs finalized  
- [ ] Decide on `NEXT_PUBLIC_SITE_INDEXABLE` when going public (`true` only when ready for Google)

---

## Questions for Debbie

1. **Geography:** Confirm preferred phrase everywhere: Greater Houston, Northwest Houston, specific campuses only, etc. (Resolve **Tri-State** line on Contact.)  
2. **Story:** Is the **Our Story** three-chapter narrative accurate as written, or should it be shortened to only verified history?  
3. **Statistics:** Which numbers (if any) may we display without a written source?  
4. **Board:** Who belongs on `/meet-the-board`, in what order, with which photos and one-line bios?  
5. **Champion Forest:** Any wording you want standardized when we name the church (e.g. “ministry of Champion Forest Baptist Church”)?  
6. **Meetings:** Are the May 12 and August 15, 2026 entries final for the site, or should they stay off the site until each date is confirmed?  
7. **Calls to action:** Should **Join Our Mission** / **Become a Volunteer** / **Request a Visit** all route to Contact, to a single Tally form, or split flows?  
8. **Donations:** Is the **100%** and **501(c)(3)** language approved by your treasurer or counsel?  
9. **Member portal:** Which PDFs or links should appear first for handlers?

---

## Action items

| Owner | Task | Due / notes |
|-------|------|----------------|
| Debbie | Answer **Questions for Debbie** (can be inline in this doc or email) | Before or at meeting |
| Steven | Wire hero/CTA buttons and placeholder `#` links once destinations are chosen | After May 11 review |
| Steven | Swap board + story + stats per approved facts | After content lock |
| Debbie / team | Supply final photography list + permissions | As available |
| Steven | Connect newsletter + confirm Donorbox + Tally in production env | Before launch |

---

*End of meeting prep doc.*
