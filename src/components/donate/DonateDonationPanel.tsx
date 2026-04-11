import { BadgeCheck, Lock } from "lucide-react";
import { DonorboxFrame } from "@/components/embeds/DonorboxFrame";

export function DonateDonationPanel() {
  return (
    <section
      id="donate-panel"
      className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12"
    >
      <div className="mx-auto max-w-2xl rounded-[3rem] bg-surface-container-highest p-8 shadow-soft sm:p-12 md:p-16">
        <div className="mb-10 text-center">
          <h2 className="mb-4 font-serif text-4xl text-on-surface">
            Make a Secure Donation
          </h2>
          <p className="text-on-surface-variant">
            Give through Donorbox—one-time or recurring. Payment details stay
            with Donorbox; we never see them on this site.
          </p>
        </div>

        <DonorboxFrame />

        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-on-surface/10 pt-8 sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <Lock className="size-4 text-primary" strokeWidth={2} aria-hidden />
            <span>Secure checkout (Donorbox)</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <BadgeCheck
              className="size-4 text-primary"
              strokeWidth={2}
              aria-hidden
            />
            <span>501(c)(3) nonprofit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
