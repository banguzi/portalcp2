import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, c as Copy, i as ShieldCheck, l as Check, o as PanelLeft, r as Sun, s as Moon, t as X } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DpoUUHK0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var JENJANG = [
	{
		id: "PAUD",
		label: "PAUD / TK / RA",
		short: "PAUD"
	},
	{
		id: "SD",
		label: "SD / MI",
		short: "SD"
	},
	{
		id: "SMP",
		label: "SMP / MTs",
		short: "SMP"
	},
	{
		id: "SMA",
		label: "SMA / MA",
		short: "SMA"
	},
	{
		id: "SMK",
		label: "SMK / MAK",
		short: "SMK"
	},
	{
		id: "Madrasah",
		label: "Madrasah",
		short: "Mad."
	},
	{
		id: "Khusus",
		label: "Pendidikan Khusus",
		short: "Khusus"
	},
	{
		id: "Paket",
		label: "Paket A / B / C",
		short: "Paket"
	}
];
var FASE_META = {
	Fondasi: {
		label: "Fondasi",
		kelas: "RA / TK / usia dini"
	},
	A: {
		label: "Fase A",
		kelas: "Kelas I–II"
	},
	B: {
		label: "Fase B",
		kelas: "Kelas III–IV"
	},
	C: {
		label: "Fase C",
		kelas: "Kelas V–VI"
	},
	D: {
		label: "Fase D",
		kelas: "Kelas VII–IX"
	},
	E: {
		label: "Fase E",
		kelas: "Kelas X"
	},
	F: {
		label: "Fase F",
		kelas: "Kelas XI–XII"
	}
};
var JENJANG_FASE = {
	PAUD: ["Fondasi"],
	SD: [
		"A",
		"B",
		"C"
	],
	SMP: ["D"],
	SMA: ["E", "F"],
	SMK: ["E", "F"],
	Madrasah: [
		"Fondasi",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F"
	],
	Khusus: [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F"
	],
	Paket: [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F"
	]
};
function jenjangOf(item) {
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
function formatCp(item) {
	const fase = FASE_META[item.f]?.label ?? `Fase ${item.f}`;
	const kelas = FASE_META[item.f]?.kelas ?? "";
	return [
		item.m,
		[
			fase,
			kelas,
			item.e,
			item.k
		].filter(Boolean).join(" · "),
		"",
		item.x
	].join("\n");
}
var CACHE_NAME = "cp-portal-v1";
var DATA_URL = "/cp.min.json";
async function loadCpFile() {
	if (typeof window === "undefined") throw new Error("Data CP hanya dimuat di peramban.");
	let cache = null;
	try {
		cache = await caches.open(CACHE_NAME);
	} catch {
		cache = null;
	}
	try {
		const res = await fetch(DATA_URL, { cache: "reload" });
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		if (cache) await cache.put(DATA_URL, res.clone());
		return await res.json();
	} catch (onlineErr) {
		if (cache) {
			const cached = await cache.match(DATA_URL);
			if (cached) return await cached.json();
		}
		throw onlineErr instanceof Error ? onlineErr : /* @__PURE__ */ new Error("Gagal memuat data Capaian Pembelajaran.");
	}
}
function filterItems(items, opts) {
	const q = opts.q.trim().toLowerCase();
	const mapel = opts.mapel === "__ALL__" ? "" : opts.mapel;
	return items.filter((it) => {
		if (opts.jenjang && jenjangOf(it) !== opts.jenjang) return false;
		if (opts.fase && it.f !== opts.fase) return false;
		if (mapel && it.m !== mapel) return false;
		if (q) {
			if (!`${it.m} ${it.e} ${it.k} ${it.x}`.toLowerCase().includes(q)) return false;
		}
		return true;
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 min-h-11 px-3.5 text-sm font-medium duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan", {
	variants: { variant: {
		solid: "rounded-sm bg-magenta text-surface hover:brightness-110",
		cyan: "rounded-sm bg-cyan text-bg hover:brightness-110",
		ghost: "rounded-sm border border-line bg-raised text-fg hover:border-cyan",
		chip: "rounded-full border border-line bg-raised text-fg",
		copy: "rounded-sm border border-cyan bg-transparent text-cyan hover:bg-cyan hover:text-bg"
	} },
	defaultVariants: { variant: "ghost" }
});
function Button({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
function CpCard({ item, onCopied }) {
	const [done, setDone] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "cp-card rounded-lg border border-line bg-raised p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-magenta uppercase",
						children: item.m
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-muted",
						children: [
							fase?.label ?? item.f,
							fase?.kelas ? ` · ${fase.kelas}` : "",
							item.k ? ` · ${item.k}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-medium leading-snug text-fg",
						children: item.e
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "copy",
				onClick: copy,
				"aria-label": `Salin capaian ${item.e}`,
				className: "shrink-0",
				children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-4",
					"aria-hidden": "true"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					className: "size-4",
					"aria-hidden": "true"
				}), done ? "Tersalin" : "Salin"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-fg",
			children: item.x
		})]
	});
}
function CpFilters({ jenjang, fase, mapel, q, mapelOptions, onJenjang, onFase, onMapel, onQuery }) {
	const fases = jenjang ? JENJANG_FASE[jenjang] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block font-mono text-xs tracking-widest text-cyan uppercase",
					children: "Cari teks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: q,
					onChange: (e) => onQuery(e.target.value),
					placeholder: "Cari dalam jenjang & fase aktif…",
					className: "min-h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-fg placeholder:text-faint"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "mb-2 font-mono text-xs tracking-widest text-cyan uppercase",
				children: "1 · Jenis sekolah"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: JENJANG.map((j) => {
					const on = jenjang === j.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "chip",
						"aria-pressed": on,
						onClick: () => onJenjang(j.id),
						className: cn("px-3", on && "border-magenta bg-magenta text-surface"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: j.short
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: j.label
						})]
					}, j.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "mb-2 font-mono text-xs tracking-widest text-cyan uppercase",
				children: "2 · Fase / kelas"
			}), !jenjang ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Pilih jenis sekolah terlebih dahulu."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: fases.map((f) => {
					const meta = FASE_META[f];
					const on = fase === f;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": on,
						onClick: () => onFase(f),
						className: cn("min-h-14 rounded-md border px-3 py-2 text-left", on ? "border-magenta bg-magenta text-surface" : "border-line bg-surface text-fg hover:border-cyan"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-xs tracking-wider uppercase",
							children: meta.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("block text-xs", on ? "opacity-90" : "text-muted"),
							children: meta.kelas
						})]
					}, f);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block font-mono text-xs tracking-widest text-cyan uppercase",
					children: "3 · Mata pelajaran"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: mapel,
					onChange: (e) => onMapel(e.target.value),
					disabled: !jenjang || !fase,
					"aria-label": "Mata pelajaran",
					className: "min-h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-fg disabled:opacity-40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: !jenjang || !fase ? "Pilih jenis dan fase dulu" : "Pilih mata pelajaran…"
						}),
						jenjang && fase && mapelOptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: "__ALL__",
							children: [
								"Semua mapel (",
								mapelOptions.length,
								")"
							]
						}) : null,
						mapelOptions.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: name,
							children: name
						}, name))
					]
				})]
			})
		]
	});
}
var DEFAULT_JENJANG = "SMP";
var DEFAULT_FASE = "D";
function applyTheme(next) {
	document.documentElement.classList.toggle("dark", next === "dark");
	localStorage.setItem("cp-theme", next);
}
function CpPortal() {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [jenjang, setJenjang] = (0, import_react.useState)(DEFAULT_JENJANG);
	const [fase, setFase] = (0, import_react.useState)(DEFAULT_FASE);
	const [mapel, setMapel] = (0, import_react.useState)("");
	const [q, setQ] = (0, import_react.useState)("");
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const next = localStorage.getItem("cp-theme") === "light" ? "light" : "dark";
		setTheme(next);
		applyTheme(next);
	}, []);
	(0, import_react.useEffect)(() => {
		let live = true;
		loadCpFile().then((file) => {
			if (live) setData(file);
		}).catch((err) => {
			if (live) setError(err instanceof Error ? err.message : "Gagal memuat data.");
		});
		return () => {
			live = false;
		};
	}, []);
	const scoped = (0, import_react.useMemo)(() => {
		if (!data) return [];
		return data.items.filter((it) => {
			if (jenjang && jenjangOf(it) !== jenjang) return false;
			if (fase && it.f !== fase) return false;
			return true;
		});
	}, [
		data,
		jenjang,
		fase
	]);
	const mapelOptions = (0, import_react.useMemo)(() => {
		return Array.from(new Set(scoped.map((it) => it.m))).sort((a, b) => a.localeCompare(b, "id"));
	}, [scoped]);
	const visible = (0, import_react.useMemo)(() => {
		if (!data) return [];
		if (!Boolean(jenjang && fase && mapel) && q.trim().length < 3) return [];
		return filterItems(data.items, {
			jenjang,
			fase,
			mapel,
			q
		});
	}, [
		data,
		jenjang,
		fase,
		mapel,
		q
	]);
	function chooseJenjang(id) {
		setJenjang(id);
		const only = JENJANG_FASE[id];
		setFase(only.length === 1 ? only[0] ?? "" : "");
		setMapel("");
	}
	function chooseFase(id) {
		setFase(id);
		setMapel("");
	}
	function chooseMapel(id) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "desktop-grid scanlines min-h-dvh px-3 py-4 sm:px-6 sm:py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#hasil",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cyan focus:px-3 focus:py-2 focus:text-bg",
				children: "Loncat ke hasil"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-[calc(100dvh-2rem)] max-w-6xl flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-window",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "bevel flex items-center gap-3 border-b border-line bg-chrome px-3 py-2.5 sm:px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex gap-1.5",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-3 rounded-full bg-danger" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-3 rounded-full bg-magenta" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-3 rounded-full bg-cyan" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display truncate text-xs tracking-widest text-cyan uppercase",
									children: "Portal Capaian Pembelajaran"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate font-display text-sm tracking-wide text-fg sm:text-base",
									children: "SMP N 4 SATAP MT"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-raised px-2.5 py-1 font-mono text-xs text-ok tabular-nums",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "size-3.5",
										"aria-hidden": "true"
									}),
									data ? data.meta.verified.toLocaleString("id-ID") : "—",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "CP terverifikasi"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								className: "md:hidden",
								"aria-expanded": filtersOpen,
								"aria-controls": "panel-filter",
								onClick: () => setFiltersOpen((v) => !v),
								children: [filtersOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { className: "size-4" }), "Filter"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								"aria-label": theme === "dark" ? "Ubah ke mode terang" : "Ubah ke mode gelap",
								onClick: toggleTheme,
								children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid min-h-0 flex-1 md:grid-cols-[minmax(16rem,20rem)_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							id: "panel-filter",
							className: cn("border-b border-line bg-raised p-4 md:border-b-0 md:border-r", filtersOpen ? "block" : "hidden md:block"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CpFilters, {
								jenjang,
								fase,
								mapel,
								q,
								mapelOptions,
								onJenjang: chooseJenjang,
								onFase: chooseFase,
								onMapel: chooseMapel,
								onQuery: setQ
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex min-h-0 flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 border-b border-line bg-surface px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "cyan",
										onClick: copyAll,
										disabled: !visible.length,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Salin semua yang tampil"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										onClick: reset,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset filter"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "w-full font-mono text-xs text-muted md:ml-auto md:w-auto tabular-nums",
										"aria-live": "polite",
										children: [
											jenjang || "—",
											" · ",
											fase ? `Fase ${fase}` : "fase?",
											" ·",
											" ",
											visible.length.toLocaleString("id-ID"),
											" tampil",
											data ? ` / ${data.meta.total.toLocaleString("id-ID")}` : ""
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: "hasil",
								className: "min-h-0 flex-1 overflow-y-auto p-4 sm:p-5",
								children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
									title: "Data tidak termuat",
									body: `${error} Periksa jaringan, lalu muat ulang. Setelah sukses, berkas JSON tersimpan untuk mode luring.`
								}) : !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
									title: "Memuat arsip CP…",
									body: "Mengambil berkas resmi dan menyimpannya di cache peramban."
								}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadyHint, {
									jenjang,
									fase,
									mapelCount: mapelOptions.length
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-4",
									children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CpCard, {
										item,
										onCopied: (ok) => ok ? toast.success("Tersalin ke papan klip.") : toast.error("Gagal menyalin.")
									}) }, item.i))
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "space-y-1.5 border-t border-line bg-chrome px-4 py-3 text-xs leading-relaxed text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono tracking-wide text-cyan uppercase",
								children: "Sumber peraturan"
							}),
							data?.sumber.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: s }, s)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "pt-1 text-fg",
								children: [
									"Pengembang: Ahmad Fauzi, S.Pd., Gr. ·",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://instagram.com/banguzi",
										className: "text-cyan hover:underline",
										rel: "noreferrer",
										target: "_blank",
										children: "IG @banguzi"
									}),
									" ",
									"·",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://x.com/banguzi",
										className: "text-cyan hover:underline",
										rel: "noreferrer",
										target: "_blank",
										children: "X @banguzi"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme,
				position: "bottom-center",
				richColors: true,
				closeButton: true
			})
		]
	});
}
function Notice({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed border-line bg-raised px-5 py-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-sm tracking-wide text-magenta",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
function ReadyHint({ jenjang, fase, mapelCount }) {
	const faseMeta = fase ? FASE_META[fase] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed border-line bg-raised px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center font-display text-sm tracking-wide text-magenta",
				children: "Siap disalin setelah tiga langkah"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mx-auto mt-6 max-w-sm space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintStep, {
						n: 1,
						done: Boolean(jenjang),
						current: !jenjang,
						label: "Jenis sekolah",
						value: jenjang || "Pilih di panel kiri"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintStep, {
						n: 2,
						done: Boolean(fase),
						current: Boolean(jenjang) && !fase,
						label: "Fase / kelas",
						value: faseMeta ? `${faseMeta.label} · ${faseMeta.kelas}` : "Pilih fase"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintStep, {
						n: 3,
						done: false,
						current: Boolean(jenjang && fase),
						label: "Mata pelajaran",
						value: jenjang && fase ? `${mapelCount} mapel siap dipilih` : "Menunggu jenis dan fase"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted",
				children: "Atau ketik minimal 3 huruf pada kotak pencarian."
			})
		]
	});
}
function HintStep({ n, done, current, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs", done && "bg-ok text-bg", !done && current && "bg-magenta text-surface", !done && !current && "border border-line text-muted"),
			"aria-hidden": "true",
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-medium text-fg",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("block text-xs", current ? "text-magenta" : "text-muted"),
			children: value
		})] })]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CpPortal, {});
}
//#endregion
export { Home as component };
