"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { accordionTransition } from "@/lib/motion-presets";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type AccordionSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  summary: string;
  description?: string;
  children: ReactNode;
};

export default function AccordionSection({
  id,
  eyebrow,
  title,
  summary,
  description,
  children,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduced = useReducedMotion() ?? false;

  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-5 sm:py-6">
      <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-cyan-400/20">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-4 p-6 text-left transition hover:bg-indigo-50/40 dark:hover:bg-white/[0.02]"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-inherit">
              {title}
            </h2>
            {!open && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {summary}
              </p>
            )}
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={accordionTransition(reduced)}
            className="mt-1 shrink-0 text-zinc-400 dark:text-zinc-500"
          >
            <ChevronIcon className="h-5 w-5" />
          </motion.span>
        </button>

        <motion.div
          id={panelId}
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={accordionTransition(reduced)}
          className="overflow-hidden"
        >
          <div className="border-t border-zinc-200 px-6 pb-6 pt-6 dark:border-white/10">
            {description && (
              <p className="mb-8 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
            {children}
          </div>
        </motion.div>
      </article>
    </section>
  );
}
