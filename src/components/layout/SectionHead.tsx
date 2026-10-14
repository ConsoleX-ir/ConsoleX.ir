"use client";

import Reveal from "@/components/motion/Reveal";

type Props = {
  index: string;
  title: string;
  note?: string;
};

/** Shared editorial section header: numbered eyebrow + hairline + optional note. */
export default function SectionHead({ index, title, note }: Props) {
  return (
    <Reveal>
      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="eyebrow whitespace-nowrap">
          {index} / {title}
        </span>
        <span className="h-px flex-1 bg-cx-border" />
        {note ? (
          <span className="eyebrow hidden whitespace-nowrap sm:block">
            {note}
          </span>
        ) : null}
      </div>
    </Reveal>
  );
}
