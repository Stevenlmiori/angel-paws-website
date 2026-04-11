"use client";

import { FormEvent, useState } from "react";

export function DonateNewsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="mx-auto max-w-screen-xl px-6 pb-16 sm:px-10 lg:px-12">
      <div className="rounded-[3rem] bg-primary px-8 py-16 text-center text-on-primary sm:px-12 md:py-24">
        <h2 className="mb-6 font-serif text-4xl md:text-5xl">
          Stay Connected with Hope
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90">
          Subscribe to our newsletter for heartwarming stories of recovery and
          updates on where our therapy teams are visiting next.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row"
        >
          <label htmlFor="donate-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="donate-newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 rounded-full bg-white/10 px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
            autoComplete="email"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-transform hover:scale-[1.02]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
