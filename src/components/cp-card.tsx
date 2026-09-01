import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { type CpItem, FASE_META, formatCp } from "@/lib/cp";
import { Button } from "@/components/ui/button";

export function CpCard({
  item,
  onCopied,
}: {
  item: CpItem;
  onCopied: (ok: boolean) => void;
}) {
  const [done, setDone] = useState(false);
  const fase = FASE_META[item.f];

  async function copy() {
    const text = formatCp(item);
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      onCopied(true);
      window.setTimeout(() => setDone(false), 1600);
    } catch {
      onCopied(false);
    }
  }

  return (
    <article className="cp-card rounded-lg border border-line bg-raised p-4 sm:p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <p className="font-display text-xs tracking-widest text-magenta uppercase">
            {item.m}
          </p>
          <p className="font-mono text-xs text-muted">
            {fase?.label ?? item.f}
            {fase?.kelas ? ` · ${fase.kelas}` : ""}
            {item.k ? ` · ${item.k}` : ""}
          </p>
          <h3 className="text-base font-medium leading-snug text-fg">{item.e}</h3>
        </div>
        <Button
          type="button"
          variant="copy"
          onClick={copy}
          aria-label={`Salin capaian ${item.e}`}
          className="shrink-0"
        >
          {done ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {done ? "Tersalin" : "Salin"}
        </Button>
      </header>
      <p className="mt-3 text-sm leading-relaxed text-fg">{item.x}</p>
    </article>
  );
}
