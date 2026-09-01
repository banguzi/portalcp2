import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import {
  Check,
  Copy,
  Moon,
  RotateCcw,
  Sun,
  PanelLeft,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  FASE_META,
  JENJANG_FASE,
  filterItems,
  formatCp,
  jenjangOf,
  loadCpFile,
  type CpFile,
  type CpItem,
  type JenjangId,
} from "@/lib/cp";
import { Button } from "@/components/ui/button";
import { CpCard } from "@/components/cp-card";
import { CpFilters } from "@/components/cp-filters";
import { cn } from "@/lib/utils";

const DEFAULT_JENJANG: JenjangId = "SMP";
const DEFAULT_FASE = "D";

function applyTheme(next: "dark" | "light") {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  localStorage.setItem("cp-theme", next);
}

export function CpPortal() {
  const [data, setData] = useState<CpFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jenjang, setJenjang] = useState<JenjangId | "">(DEFAULT_JENJANG);
  const [fase, setFase] = useState(DEFAULT_FASE);
  const [mapel, setMapel] = useState("");
  const [q, setQ] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("cp-theme");
    const next = saved === "light" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }, []);

  useEffect(() => {
    let live = true;
    loadCpFile()
      .then((file) => {
        if (live) setData(file);
      })
      .catch((err: unknown) => {
        if (live) {
          setError(err instanceof Error ? err.message : "Gagal memuat data.");
        }
      });
    return () => {
      live = false;
    };
  }, []);

  const scoped = useMemo(() => {
    if (!data) return [] as CpItem[];
    return data.items.filter((it) => {
      if (jenjang && jenjangOf(it) !== jenjang) return false;
      if (fase && it.f !== fase) return false;
      return true;
    });
  }, [data, jenjang, fase]);

  const mapelOptions = useMemo(() => {
    return Array.from(new Set(scoped.map((it) => it.m))).sort((a, b) =>
      a.localeCompare(b, "id"),
    );
  }, [scoped]);

  const visible = useMemo(() => {
    if (!data) return [] as CpItem[];
    const ready = Boolean(jenjang && fase && mapel);
    if (!ready && q.trim().length < 3) return [];
    return filterItems(data.items, { jenjang, fase, mapel, q });
  }, [data, jenjang, fase, mapel, q]);

  function chooseJenjang(id: JenjangId) {
    setJenjang(id);
    const only = JENJANG_FASE[id];
    setFase(only.length === 1 ? (only[0] ?? "") : "");
    setMapel("");
  }

  function chooseFase(id: string) {
    setFase(id);
    setMapel("");
  }

  function chooseMapel(id: string) {
    setMapel(id);
    if (id) setFiltersOpen(false);
  }

  function reset() {
    setJenjang(DEFAULT_JENJANG);
    setFase(DEFAULT_FASE);
    setMapel("");
    setQ("");
  }

  async function copyAll() {
    if (!visible.length) return;
    const text = visible.map(formatCp).join("\n\n────────\n\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${visible.length} CP disalin.`);
    } catch {
      toast.error("Tidak bisa menyalin. Izinkan clipboard di peramban.");
    }
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div className="desktop-grid scanlines min-h-dvh px-3 py-4 sm:px-6 sm:py-6">
      <a
        href="#hasil"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cyan focus:px-3 focus:py-2 focus:text-bg"
      >
        Loncat ke hasil
      </a>

      <div className="mx-auto flex min-h-[calc(100dvh-2rem)] max-w-6xl flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-window">
        <header className="bevel flex items-center gap-3 border-b border-line bg-chrome px-3 py-2.5 sm:px-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="size-3 rounded-full bg-danger" />
            <i className="size-3 rounded-full bg-magenta" />
            <i className="size-3 rounded-full bg-cyan" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display truncate text-xs tracking-widest text-cyan uppercase">
              Portal Capaian Pembelajaran
            </p>
            <h1 className="truncate font-display text-sm tracking-wide text-fg sm:text-base">
              SMP N 4 SATAP MT
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-raised px-2.5 py-1 font-mono text-xs text-ok tabular-nums">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            {data ? data.meta.verified.toLocaleString("id-ID") : "—"}
            <span className="hidden sm:inline">CP terverifikasi</span>
          </span>
          <Button
            type="button"
            variant="ghost"
            className="md:hidden"
            aria-expanded={filtersOpen}
            aria-controls="panel-filter"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            {filtersOpen ? <X className="size-4" /> : <PanelLeft className="size-4" />}
            Filter
          </Button>
          <Button
            type="button"
            variant="ghost"
            aria-label={theme === "dark" ? "Ubah ke mode terang" : "Ubah ke mode gelap"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </header>

        <div className="grid min-h-0 flex-1 md:grid-cols-[minmax(16rem,20rem)_1fr]">
          <aside
            id="panel-filter"
            className={cn(
              "border-b border-line bg-raised p-4 md:border-b-0 md:border-r",
              filtersOpen ? "block" : "hidden md:block",
            )}
          >
            <CpFilters
              jenjang={jenjang}
              fase={fase}
              mapel={mapel}
              q={q}
              mapelOptions={mapelOptions}
              onJenjang={chooseJenjang}
              onFase={chooseFase}
              onMapel={chooseMapel}
              onQuery={setQ}
            />
          </aside>

          <section className="flex min-h-0 flex-col">
            <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-4 py-3">
              <Button type="button" variant="cyan" onClick={copyAll} disabled={!visible.length}>
                <Copy className="size-4" />
                Salin semua yang tampil
              </Button>
              <Button type="button" variant="ghost" onClick={reset}>
                <RotateCcw className="size-4" />
                Reset filter
              </Button>
              <p
                className="w-full font-mono text-xs text-muted md:ml-auto md:w-auto tabular-nums"
                aria-live="polite"
              >
                {jenjang || "—"} · {fase ? `Fase ${fase}` : "fase?"} ·{" "}
                {visible.length.toLocaleString("id-ID")} tampil
                {data ? ` / ${data.meta.total.toLocaleString("id-ID")}` : ""}
              </p>
            </div>

            <div id="hasil" className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
              {error ? (
                <Notice
                  title="Data tidak termuat"
                  body={`${error} Periksa jaringan, lalu muat ulang. Setelah sukses, berkas JSON tersimpan untuk mode luring.`}
                />
              ) : !data ? (
                <Notice
                  title="Memuat arsip CP…"
                  body="Mengambil berkas resmi dan menyimpannya di cache peramban."
                />
              ) : visible.length === 0 ? (
                <ReadyHint jenjang={jenjang} fase={fase} mapelCount={mapelOptions.length} />
              ) : (
                <ul className="space-y-4">
                  {visible.map((item) => (
                    <li key={item.i}>
                      <CpCard
                        item={item}
                        onCopied={(ok) =>
                          ok
                            ? toast.success("Tersalin ke papan klip.")
                            : toast.error("Gagal menyalin.")
                        }
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        <footer className="space-y-1.5 border-t border-line bg-chrome px-4 py-3 text-xs leading-relaxed text-muted">
          <p className="font-mono tracking-wide text-cyan uppercase">Sumber peraturan</p>
          {data?.sumber.map((s) => (
            <p key={s}>{s}</p>
          ))}
          <p className="pt-1 text-fg">
            Pengembang: Ahmad Fauzi, S.Pd., Gr. ·{" "}
            <a
              href="https://instagram.com/banguzi"
              className="text-cyan hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              IG @banguzi
            </a>{" "}
            ·{" "}
            <a
              href="https://x.com/banguzi"
              className="text-cyan hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              X @banguzi
            </a>
          </p>
        </footer>
      </div>

      <Toaster theme={theme} position="bottom-center" richColors closeButton />
    </div>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-raised px-5 py-12 text-center">
      <p className="font-display text-sm tracking-wide text-magenta">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function ReadyHint({
  jenjang,
  fase,
  mapelCount,
}: {
  jenjang: JenjangId | "";
  fase: string;
  mapelCount: number;
}) {
  const faseMeta = fase ? FASE_META[fase] : null;
  return (
    <div className="rounded-lg border border-dashed border-line bg-raised px-5 py-10">
      <p className="text-center font-display text-sm tracking-wide text-magenta">
        Siap disalin setelah tiga langkah
      </p>
      <ol className="mx-auto mt-6 max-w-sm space-y-3 text-sm">
        <HintStep
          n={1}
          done={Boolean(jenjang)}
          current={!jenjang}
          label="Jenis sekolah"
          value={jenjang || "Pilih di panel kiri"}
        />
        <HintStep
          n={2}
          done={Boolean(fase)}
          current={Boolean(jenjang) && !fase}
          label="Fase / kelas"
          value={faseMeta ? `${faseMeta.label} · ${faseMeta.kelas}` : "Pilih fase"}
        />
        <HintStep
          n={3}
          done={false}
          current={Boolean(jenjang && fase)}
          label="Mata pelajaran"
          value={
            jenjang && fase
              ? `${mapelCount} mapel siap dipilih`
              : "Menunggu jenis dan fase"
          }
        />
      </ol>
      <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted">
        Atau ketik minimal 3 huruf pada kotak pencarian.
      </p>
    </div>
  );
}

function HintStep({
  n,
  done,
  current,
  label,
  value,
}: {
  n: number;
  done: boolean;
  current: boolean;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={cn(
          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs",
          done && "bg-ok text-bg",
          !done && current && "bg-magenta text-surface",
          !done && !current && "border border-line text-muted",
        )}
        aria-hidden="true"
      >
        {done ? <Check className="size-3.5" /> : n}
      </span>
      <span>
        <span className="block font-medium text-fg">{label}</span>
        <span className={cn("block text-xs", current ? "text-magenta" : "text-muted")}>
          {value}
        </span>
      </span>
    </li>
  );
}
