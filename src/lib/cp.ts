export type CpItem = {
  i: string;
  m: string;
  v: string | null;
  j: string;
  f: string;
  k: string;
  e: string;
  x: string;
  tl: number;
};

export type CpFile = {
  meta: {
    total: number;
    verified: number;
    sekolah: string;
    dibuat: string;
  };
  sumber: string[];
  items: CpItem[];
};

export const JENJANG = [
  { id: "PAUD", label: "PAUD / TK / RA", short: "PAUD" },
  { id: "SD", label: "SD / MI", short: "SD" },
  { id: "SMP", label: "SMP / MTs", short: "SMP" },
  { id: "SMA", label: "SMA / MA", short: "SMA" },
  { id: "SMK", label: "SMK / MAK", short: "SMK" },
  { id: "Madrasah", label: "Madrasah", short: "Mad." },
  { id: "Khusus", label: "Pendidikan Khusus", short: "Khusus" },
  { id: "Paket", label: "Paket A / B / C", short: "Paket" },
] as const;

export type JenjangId = (typeof JENJANG)[number]["id"];

export const FASE_META: Record<
  string,
  { label: string; kelas: string }
> = {
  Fondasi: { label: "Fondasi", kelas: "RA / TK / usia dini" },
  A: { label: "Fase A", kelas: "Kelas I–II" },
  B: { label: "Fase B", kelas: "Kelas III–IV" },
  C: { label: "Fase C", kelas: "Kelas V–VI" },
  D: { label: "Fase D", kelas: "Kelas VII–IX" },
  E: { label: "Fase E", kelas: "Kelas X" },
  F: { label: "Fase F", kelas: "Kelas XI–XII" },
};

export const JENJANG_FASE: Record<JenjangId, string[]> = {
  PAUD: ["Fondasi"],
  SD: ["A", "B", "C"],
  SMP: ["D"],
  SMA: ["E", "F"],
  SMK: ["E", "F"],
  Madrasah: ["Fondasi", "A", "B", "C", "D", "E", "F"],
  Khusus: ["A", "B", "C", "D", "E", "F"],
  Paket: ["A", "B", "C", "D", "E", "F"],
};

export function jenjangOf(item: CpItem): JenjangId {
  if (item.j === "PAUD") return "PAUD";
  if (item.j === "Madrasah") return "Madrasah";
  if (item.j === "Pendidikan Khusus") return "Khusus";
  if (item.j === "SMK/MAK") return "SMK";
  if (item.j === "Paket A/B/C") return "Paket";
  if (item.f === "Fondasi") return "PAUD";
  if (item.f === "A" || item.f === "B" || item.f === "C") return "SD";
  if (item.f === "D") return "SMP";
  return "SMA";
}

export function formatCp(item: CpItem): string {
  const fase = FASE_META[item.f]?.label ?? `Fase ${item.f}`;
  const kelas = FASE_META[item.f]?.kelas ?? "";
  return [
    item.m,
    [fase, kelas, item.e, item.k].filter(Boolean).join(" · "),
    "",
    item.x,
  ].join("\n");
}

const CACHE_NAME = "cp-portal-v1";
const DATA_URL = "/cp.min.json";

export async function loadCpFile(): Promise<CpFile> {
  if (typeof window === "undefined") {
    throw new Error("Data CP hanya dimuat di peramban.");
  }

  let cache: Cache | null = null;
  try {
    cache = await caches.open(CACHE_NAME);
  } catch {
    cache = null;
  }

  try {
    const res = await fetch(DATA_URL, { cache: "reload" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (cache) {
      await cache.put(DATA_URL, res.clone());
    }
    return (await res.json()) as CpFile;
  } catch (onlineErr) {
    if (cache) {
      const cached = await cache.match(DATA_URL);
      if (cached) return (await cached.json()) as CpFile;
    }
    throw onlineErr instanceof Error
      ? onlineErr
      : new Error("Gagal memuat data Capaian Pembelajaran.");
  }
}

export function filterItems(
  items: CpItem[],
  opts: {
    jenjang: JenjangId | "";
    fase: string;
    mapel: string;
    q: string;
  },
): CpItem[] {
  const q = opts.q.trim().toLowerCase();
  const mapel = opts.mapel === "__ALL__" ? "" : opts.mapel;
  return items.filter((it) => {
    if (opts.jenjang && jenjangOf(it) !== opts.jenjang) return false;
    if (opts.fase && it.f !== opts.fase) return false;
    if (mapel && it.m !== mapel) return false;
    if (q) {
      const hay = `${it.m} ${it.e} ${it.k} ${it.x}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
