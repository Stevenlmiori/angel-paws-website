import Link from "next/link";
import { LogOut } from "lucide-react";
import { loadStoredPortalResources } from "@/lib/memberPortal/resourcesStore";
import { getPortalIcon } from "@/lib/memberPortal/portalIcons";
import { Button } from "@/components/ui/Button";
import { logoutAction } from "./actions";

export async function MemberPortalDashboard() {
  const memberPortalResources = await loadStoredPortalResources();

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Members
          </p>
          <h1 className="font-serif text-4xl text-on-surface md:text-5xl">
            Resource hub
          </h1>
          <p className="mt-3 max-w-xl text-lg text-on-surface-variant leading-relaxed">
            Forms, policies, and links your team uses often—kept in one place.
          </p>
        </div>
        <form action={logoutAction} className="shrink-0">
          <Button
            type="submit"
            variant="secondary"
            className="gap-2 uppercase tracking-widest"
          >
            <LogOut className="size-4" aria-hidden />
            Sign out
          </Button>
        </form>
      </div>

      {memberPortalResources.length === 0 ? (
        <p className="text-center text-on-surface-variant">
          No resources are published yet. Please check back soon.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {memberPortalResources.map((item) => {
            const Icon = getPortalIcon(item.iconId);
            const inner = (
              <>
                <span className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="font-serif text-xl text-on-surface">{item.title}</span>
                <span className="mt-2 block text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </span>
              </>
            );

            const cardClass =
              "block rounded-[1.75rem] bg-surface-container-high p-6 shadow-soft transition hover:shadow-md md:p-8";

            if (item.external) {
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link href={item.href} className={cardClass}>
                  {inner}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-12 text-center text-sm text-on-surface-variant">
        Need something that is not listed?{" "}
        <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">
          Contact the team
        </Link>
        .
      </p>
    </div>
  );
}
