import type { StoredPortalResource } from "./resourceTypes";

/** Shipped default list when no saved data exists yet (Redis / local file). */
export const DEFAULT_PORTAL_RESOURCES: StoredPortalResource[] = [
  {
    id: "annual-wellness-form",
    title: "Annual wellness form",
    description: "View or print the veterinarian wellness and vaccination form.",
    href: "https://drive.google.com/file/d/16TTFq24xBcw20ImREYg0Ah50JqAvfXoW/view",
    external: true,
    iconId: "clipboard",
  },
  {
    id: "approved-facilities",
    title: "Approved facilities",
    description: "Current locations, visit times, and team contacts.",
    href: "https://drive.google.com/file/d/1syUWeo6JlwtKHddtkm6MbfU0Gq3JbcPm/view",
    external: true,
    iconId: "file",
  },
  {
    id: "beliefs-and-mission",
    title: "Beliefs & mission",
    description: "Angel Paws' statement of beliefs and mission.",
    href: "https://drive.google.com/file/d/1_kWcV05rIaqIN4Sge2yND_XqDakCzO03/view",
    external: true,
    iconId: "file",
  },
  {
    id: "conflict-of-interest-policy",
    title: "Conflict of interest policy",
    description: "Read the policy for directors, officers, employees, and participants.",
    href: "https://drive.google.com/file/d/180FEbt6M0xJUpBrO0EageFtoU6_fFduH/view",
    external: true,
    iconId: "file",
  },
  {
    id: "incident-report-form",
    title: "Incident report form",
    description: "View or print the form used to report an incident.",
    href: "https://drive.google.com/file/d/1I0bYaREUvDjiixvtin_-eauvU0oKzoWU/view",
    external: true,
    iconId: "clipboard",
  },
  {
    id: "participant-application",
    title: "Participant application",
    description: "View or print the September 2026 participant application.",
    href: "https://drive.google.com/file/d/1HFu548EQ9xnLjR-tOr3HywRfAg0i3eKQ/view",
    external: true,
    iconId: "clipboard",
  },
  {
    id: "participant-policies",
    title: "Participant policies",
    description: "Requirements and guidelines for Angel Paws participants.",
    href: "https://drive.google.com/file/d/1C7EVcS3-2eYUrRw4EQYwHpcaQN3wr615/view",
    external: true,
    iconId: "file",
  },
  {
    id: "roster-and-links",
    title: "Roster & links",
    description: "Team roster, contact details, and useful links.",
    href: "https://drive.google.com/file/d/1nCgmJQXoscg8x2XtkQ4wH7TJAQxO4ZyQ/view",
    external: true,
    iconId: "link",
  },
];
