import {
  FASE_META,
  JENJANG,
  JENJANG_FASE,
  type JenjangId,
} from "@/lib/cp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CpFilters({
  jenjang,
  fase,
  mapel,
  q,
  mapelOptions,
  onJenjang,
  onFase,
  onMapel,
  onQuery,
}: {
  jenjang: JenjangId | "";
  fase: string;
  mapel: string;
  q: string;
  mapelOptions: string[];
  onJenjang: (v: JenjangId) => void;
  onFase: (v: string) => void;
  onMapel: (v: string) => void;
  onQuery: (v: string) => void;
}) {
  const fases = jenjang ? JENJANG_FASE[jenjang] : [];

  return (
    <div className="flex flex-col gap-5">
      <label className="block">
        <span className="mb-1.5 block font-mono text-xs tracking-widest text-cyan uppercase">
          Cari teks
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Cari dalam jenjang & fase aktif…"
          className="min-h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-fg placeholder:text-faint"
        />
      </label>

      <fieldset>
        <legend className="mb-2 font-mono text-xs tracking-widest text-cyan uppercase">
          1 · Jenis sekolah
        </legend>
        <div className="flex flex-wrap gap-2">
          {JENJANG.map((j) => {
            const on = jenjang === j.id;
            return (
              <Button
                key={j.id}
                type="button"
                variant="chip"
                aria-pressed={on}
                onClick={() => onJenjang(j.id)}
                className={cn(
                  "px-3",
                  on && "border-magenta bg-magenta text-surface",
                )}
              >
                <span className="sm:hidden">{j.short}</span>
                <span className="hidden sm:inline">{j.label}</span>
              </Button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-mono text-xs tracking-widest text-cyan uppercase">
          2 · Fase / kelas
        </legend>
        {!jenjang ? (
          <p className="text-sm text-muted">Pilih jenis sekolah terlebih dahulu.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {fases.map((f) => {
              const meta = FASE_META[f];
              const on = fase === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onFase(f)}
                  className={cn(
                    "min-h-14 rounded-md border px-3 py-2 text-left",
                    on
                      ? "border-magenta bg-magenta text-surface"
                      : "border-line bg-surface text-fg hover:border-cyan",
                  )}
                >
                  <span className="block font-display text-xs tracking-wider uppercase">
                    {meta.label}
                  </span>
                  <span
                    className={cn("block text-xs", on ? "opacity-90" : "text-muted")}
                  >
                    {meta.kelas}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block font-mono text-xs tracking-widest text-cyan uppercase">
          3 · Mata pelajaran
        </span>
        <select
          value={mapel}
          onChange={(e) => onMapel(e.target.value)}
          disabled={!jenjang || !fase}
          aria-label="Mata pelajaran"
          className="min-h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-fg disabled:opacity-40"
        >
          <option value="">
            {!jenjang || !fase
              ? "Pilih jenis dan fase dulu"
              : "Pilih mata pelajaran…"}
          </option>
          {jenjang && fase && mapelOptions.length > 0 ? (
            <option value="__ALL__">Semua mapel ({mapelOptions.length})</option>
          ) : null}
          {mapelOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
