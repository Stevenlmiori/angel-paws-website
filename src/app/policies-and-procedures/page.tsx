import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Policies and Procedures | Angel Paws Pet Therapy",
  description:
    "Review the participation, safety, health, conduct, and visitation policies for Angel Paws Pet Therapy.",
  path: "/policies-and-procedures",
});

const preAcceptancePolicies = [
  "Attend an informational meeting.",
  "Understand, agree to, and sign the Angel Paws Pet Therapy Ministry Beliefs.",
  "Be 18 years or older to become a participant.",
  "Dogs must be at least one year old. Exceptions may be considered in some circumstances.",
  "Dogs and dog breeds with a history of aggression will not be considered for participation.",
  "Submit a completed Participant Application with a headshot of the applicant, a headshot of the dog, and a valid copy of the applicant's driver's license.",
  "Dogs must pass a Canine Good Citizen test administered by an Angel Paws Pet Therapy evaluator, even if they passed a CGC test before applying.",
  "A veterinarian must evaluate the dog and complete the Angel Paws Pet Therapy Veterinarian Evaluation Form.",
] as const;

const participantPolicies = [
  "Pay the $120 initial participant fee. Anyone joining during the calendar year pays a prorated fee of $10 per month. After the initial fee, the annual cost is $75 and is due by January 15 each year.",
  "Participants receive an Angel Paws Pet Therapy dog tag after completing five documented visits.",
  "Comply with all Angel Paws Pet Therapy rules and policies.",
  "Wear an Angel Paws shirt and photo ID during visits. Participants purchase and monogram shirts at their own expense.",
  "Complete an annual veterinary wellness visit within 12 months of the previous visit and submit the completed Wellness Form. Dogs must be current on rabies vaccination and may not visit until Angel Paws has a completed form confirming their health and required tests.",
  "Make at least one visit every two months. A dog that has not visited within two months may be asked to complete a temperament test before returning, confirming that the dog is properly socialized.",
  "Follow facility agreements, site-specific rules, and any required background-check process.",
  "Do not use a therapy-dog title to enter facilities that are not approved Angel Paws facilities.",
  "Do not represent a therapy dog as a service dog or use therapy-dog status to seek special treatment.",
  "Notify the designated facility leader if you signed up for a visit and cannot attend.",
  "Keep dogs on a leash and maintain control of the leash during visits.",
  "Visit only approved facilities on scheduled days and times. Special visits require approval from both the facility and the Angel Paws lead for that facility.",
  "Bring dogs to visits clean, with nails trimmed and smoothed.",
  "Clean up and properly dispose of any pet accident.",
  "Visit with another competent adult present, either another Angel Paws participant or a facility staff member.",
  "Immediately report any sign of aggression to the team leader. The leader must complete an Incident Report and notify the President or designee. The Board may dismiss the participant and dog or require additional training.",
  "Follow each site's procedures for posting photographs on social media.",
  "Do not accept cash donations. Donations to Angel Paws are made through the donation link on this website.",
] as const;

function PolicyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 list-disc space-y-4 pl-6 text-lg leading-relaxed text-on-surface-variant marker:text-primary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PoliciesAndProceduresPage() {
  return (
    <Section tone="warm" className="!pt-28 md:!pt-32">
      <article className="mx-auto max-w-screen-md px-6 sm:px-10 lg:px-12">
        <Link
          href="/what-is-pet-therapy"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
          Back to What Is Pet Therapy
        </Link>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Participant standards
        </p>
        <h1 className="font-serif text-4xl leading-tight text-on-surface sm:text-5xl md:text-6xl">
          Angel Paws Pet Therapy Policies
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
          These policies set the expectations for applicants, participants, and
          therapy dogs before and during Angel Paws visits.
        </p>

        <section className="mt-14">
          <h2 className="font-serif text-3xl text-on-surface">Pre-acceptance</h2>
          <PolicyList items={preAcceptancePolicies} />
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-3xl text-on-surface">Participants</h2>
          <PolicyList items={participantPolicies} />
        </section>
      </article>
    </Section>
  );
}
