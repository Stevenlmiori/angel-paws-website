"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const meetings = [
  {
    date: "Tuesday, May 12, 2026",
    time: "6:30 PM — 8:00 PM",
    location: "CFBC Northwest Campus, Dining Hall",
    description: "Visit planning and care-community coordination.",
  },
  {
    date: "Saturday, August 15, 2026",
    time: "10:00 AM — 11:30 AM",
    location: "CFBC Champions Campus, Room 402",
    description: "Service-area planning and partner follow-up.",
  },
];

export function MeetingDates() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Informational Meetings
            </h2>
            <p className="mt-6 text-lg text-stone-600">
              Angel Paws coordinates visits carefully so each facility knows
              what to expect and every visit has room to be calm, safe, and
              helpful.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {meetings.map((meeting, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <div className="group relative rounded-3xl bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 text-primary">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-container">
                      <Calendar className="size-6" />
                    </div>
                    <span className="font-serif text-xl font-bold">
                      {meeting.date}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-stone-500">
                      <Clock className="size-5" />
                      <span className="font-sans text-base">
                        {meeting.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-500">
                      <MapPin className="size-5" />
                      <span className="font-sans text-base">
                        {meeting.location}
                      </span>
                    </div>
                  </div>

                  <p className="border-t border-stone-100 pt-6 text-stone-600">
                    {meeting.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={200}>
          <div className="mt-16 rounded-3xl bg-primary-container/40 p-12 text-center">
            <h3 className="font-serif text-2xl font-bold text-on-primary-container">
              Questions before requesting a visit?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-stone-600">
              {
                "We're happy to talk through your setting, timing, and what kind of visit may be the best fit."
              }
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/contact#visitation-request"
                className="rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-on-primary transition-opacity hover:opacity-90"
              >
                Request a Visit
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
