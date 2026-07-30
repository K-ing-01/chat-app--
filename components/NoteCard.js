"use client";

// Aesthetic note card, four visual styles pulled from the reference images:
//   "sticky"     - soft rounded cream note + corner doodle (book & mug)
//   "flatTorn"   - clean white paper, torn left edge, paperclip, drop shadow
//   "sketchTape" - hand-drawn ink outline, torn left edge, tape at the top
//   "sketchTorn" - hand-drawn ink outline, torn on ALL sides, tape both corners
//
// If you don't pass a `variant`, one is picked automatically — but
// deterministically (hashed from title+date), not with Math.random().
// That matters in Next.js: Math.random() at render time causes the
// server-rendered HTML and the client re-render to disagree, which
// throws a hydration error. Hashing the note's own content means the
// "random" pick is stable across server and client, and each note still
// looks different from its neighbors.

// ---------- tiny deterministic "random" helpers ----------

function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

// mulberry32: small seeded PRNG so the jagged edges look hand-torn
// but render identically every time for the same seed.
function makeRng(seed) {
    let a = seed;
    return function rng() {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Builds an SVG path for a w x h rectangle, with a jagged "torn paper"
// edge on whichever sides you ask for, straight lines on the rest.
function jaggedRectPath(w, h, rng, {step = 20, amplitude = 7, sides = {}} = {}) {
    // Walks from `from` to `to` in `step`-sized chunks, returning a flat
    // [axisPosition, perpendicularWobble, axisPosition, perpendicularWobble, ...]
    // list. axisPosition moves steadily along the edge; wobble is the
    // random in/out jitter that gives the torn-paper look.
    const jag = (from, to) => {
        const len = Math.abs(to - from);
        const dir = to > from ? 1 : -1;
        const points = [];
        for (let d = 0; d <= len; d += step) {
            points.push(from + dir * d);
            points.push((rng() - 0.5) * 2 * amplitude);
        }
        return points;
    };

    // Build each side as a flat array of [alongAxis, perpOffset] pairs,
    // then convert to absolute x,y depending on which edge it is.
    const top = sides.top ? jag(0, w) : [0, 0, w, 0];
    const right = sides.right ? jag(0, h) : [0, 0, h, 0];
    const bottom = sides.bottom ? jag(w, 0) : [w, 0, 0, 0];
    const left = sides.left ? jag(h, 0) : [h, 0, 0, 0];

    const pts = [];
    for (let i = 0; i < top.length; i += 2) pts.push([top[i], sides.top ? top[i + 1] : 0]);
    for (let i = 0; i < right.length; i += 2) pts.push([w - (sides.right ? right[i + 1] : 0), right[i]]);
    for (let i = 0; i < bottom.length; i += 2) pts.push([bottom[i], h - (sides.bottom ? -bottom[i + 1] : 0)]);
    for (let i = 0; i < left.length; i += 2) pts.push([sides.left ? left[i + 1] : 0, left[i]]);

    return "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L") + " Z";
}

// ---------- palettes ----------

const PALETTES = {
    cream: {paper: "#FFF3D6", ink: "#4A3B22", tape: "#F6C9D1"},
    white: {paper: "#FFFFFF", ink: "#2E3A59", tape: "#C9D6F0"},
    pink: {paper: "#FFF7F3", ink: "#5A3C42", tape: "#E9C8D6"},
    yellow: {paper: "#FBE38A", ink: "#2B2410", tape: "#F4D35E"},
};

const VARIANT_DEFAULTS = {
    sticky: "cream",
    flatTorn: "white",
    sketchTape: "pink",
    sketchTorn: "yellow",
};

const VARIANTS = ["sticky", "flatTorn", "sketchTape", "sketchTorn"];

// ---------- the component ----------

export default function NoteCard({
                                     title = "Untitled note",
                                     date = "Jul 30, 2026",
                                     description = "Write something worth remembering here.",
                                     variant,
                                     color,
                                     seed,
                                     className = "",
                                 }) {
    const seedStr = seed ?? `${title}::${date}`;
    const seedNum = hashString(seedStr);
    const rng = makeRng(seedNum);

    const pickedVariant = variant || VARIANTS[seedNum % VARIANTS.length];
    const pickedColor = color || VARIANT_DEFAULTS[pickedVariant];
    const p = PALETTES[pickedColor] || PALETTES.white;
    const tilt = (rng() - 0.5) * 4; // -2deg .. 2deg, stable per note

    const W = 300;
    const H = 380;

    const bodyPath =
        pickedVariant === "sketchTorn"
            ? jaggedRectPath(W, H, rng, {
                sides: {top: true, right: true, bottom: true, left: true},
                amplitude: 6,
                step: 22
            })
            : pickedVariant === "flatTorn" || pickedVariant === "sketchTape"
                ? jaggedRectPath(W, H, rng, {sides: {left: true}, amplitude: 7, step: 20})
                : null;

    const inkOutline = pickedVariant === "sketchTape" || pickedVariant === "sketchTorn";

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .note-font { font-family: 'Caveat', cursive; }
      `}</style>

            <div
                className={`relative ${className}`}
                style={{width: W, height: H, transform: `rotate(${tilt}deg)`}}
            >
                {/* ---- SOFT ROUNDED STICKY (image 1 style) ---- */}
                {pickedVariant === "sticky" && (
                    <div
                        className="absolute inset-0 rounded-2xl p-6 pt-8 drop-shadow-[0_14px_22px_rgba(0,0,0,0.25)]"
                        style={{background: p.paper}}
                    >
                        <NoteText p={p} title={title} date={date} description={description}/>
                        <svg
                            className="absolute bottom-4 right-4 w-16 h-11 opacity-70"
                            viewBox="0 0 60 40"
                            fill="none"
                            stroke={p.ink}
                            strokeWidth="1.5"
                        >
                            <path d="M4 30 L4 18 L26 12 L26 26 Z"/>
                            <path d="M4 18 L26 12"/>
                            <circle cx="42" cy="20" r="8"/>
                            <path
                                d="M42 18 c1.5 -2 4.5 -2 5 0 c0.5 2 -2 2.5 -5 2.5 s-5.5 -0.5 -5 -2.5 c0.5 -2 3.5 -2 5 0"/>
                        </svg>
                    </div>
                )}

                {/* ---- CLEAN TORN PAPER + PAPERCLIP (image 2 style) ---- */}
                {pickedVariant === "flatTorn" && (
                    <>
                        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${W} ${H}`}>
                            <path d={bodyPath} fill={p.paper}
                                  style={{filter: "drop-shadow(6px 10px 10px rgba(0,0,0,0.25))"}}/>
                        </svg>
                        <div className="absolute inset-0 pl-10 pr-7 pt-8 pb-6">
                            <NoteText p={p} title={title} date={date} description={description}/>
                        </div>
                        <svg
                            className="absolute -top-2 right-8 w-8 h-14 rotate-6 opacity-80"
                            viewBox="0 0 20 40"
                            fill="none"
                            stroke={p.ink}
                            strokeWidth="2.5"
                        >
                            <path d="M6 8 C6 3 16 3 16 10 L16 30 C16 35 8 35 8 30 L8 14" strokeLinecap="round"/>
                        </svg>
                    </>
                )}

                {/* ---- HAND-DRAWN INK, TORN LEFT + TOP TAPE (image 3 style) ---- */}
                {pickedVariant === "sketchTape" && (
                    <>
                        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${W} ${H}`}>
                            <path d={bodyPath} fill={p.paper} stroke={p.ink} strokeWidth="3" strokeLinejoin="round"/>
                            <line x1={W * 0.14} y1={54} x2={W - 20} y2={54} stroke={p.ink} strokeWidth="2"
                                  opacity="0.8"/>
                        </svg>
                        <div
                            className="absolute h-7 w-24 -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg] border-2"
                            style={{background: p.tape, borderColor: p.ink}}
                        />
                        <div className="absolute inset-0 pl-10 pr-7 pt-16 pb-6">
                            <NoteText p={p} title={title} date={date} description={description} plain/>
                        </div>
                    </>
                )}

                {/* ---- HAND-DRAWN INK, TORN ALL SIDES + 2 TAPES (image 4 style) ---- */}
                {pickedVariant === "sketchTorn" && (
                    <>
                        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${W} ${H}`}>
                            <path d={bodyPath} fill={p.paper} stroke={p.ink} strokeWidth="3" strokeLinejoin="round"/>
                            <line x1={26} y1={54} x2={W - 26} y2={54} stroke={p.ink} strokeWidth="2" opacity="0.8"/>
                        </svg>
                        <div
                            className="absolute h-8 w-16 -top-3 left-4 -rotate-12 border-2"
                            style={{background: p.tape, borderColor: p.ink}}
                        />
                        <div
                            className="absolute h-8 w-16 -top-3 right-4 rotate-12 border-2"
                            style={{background: p.tape, borderColor: p.ink}}
                        />
                        <div className="absolute inset-0 pl-8 pr-8 pt-16 pb-6">
                            <NoteText p={p} title={title} date={date} description={description} plain/>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

function NoteText({p, title, date, description, plain}) {
    return (
        <>
      <span className="absolute top-2 right-2 text-xs tracking-wide opacity-60" style={{color: p.ink}}>
        {date}
      </span>
            <h3
                className={plain ? "text-xl font-semibold mb-2" : "note-font text-3xl leading-none mb-2"}
                style={{color: p.ink}}
            >
                {title}
            </h3>
            {!plain && <div className="h-px mb-3 opacity-20" style={{background: p.ink}}/>}
            <p className="text-sm leading-relaxed whitespace-pre-line opacity-80" style={{color: p.ink}}>
                {description}
            </p>
        </>
    );
}

// ---------- usage ----------
//
// One note, auto-styled from its own title+date (stable, no hydration issues):
//   <NoteCard title="Ideas" date="Jul 30, 2026" description="Refactor the interceptor" />
//
// A board of notes that all look different from each other:
//   {notes.map((n) => (
//     <NoteCard key={n.id} title={n.title} date={n.date} description={n.body} seed={n.id} />
//   ))}
//
// Force a specific look when you want one:
//   <NoteCard variant="sketchTorn" color="yellow" title="Reminder" date="..." description="..." />