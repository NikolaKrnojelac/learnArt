import { readFile } from "node:fs/promises";

const items = JSON.parse(
    await readFile("src/features/artworks/data/raw-artworks.json", "utf8")
);

function parseYear(text) {
    if (!text) return null;
    const direct = text.match(/\b(\d{3,4})\b/);
    let year = null;
    if (direct) {
        year = Number(direct[1]);
    } else {
        const century = text.match(/(\d{1,2})(?:st|nd|rd|th) century/i);
        if (century) year = (Number(century[1]) - 1) * 100 + 50;
    }
    if (year == null) return null;
    return /\b(BCE|BC)\b|B\.C\./i.test(text) ? -year : year;
}

const years = items.map((i) => parseYear(i.creation_date));
console.log("parsed years:", years.filter((y) => y != null).length, "of", items.length);
console.log(
    "unparsed samples:",
    items.filter((_, i) => years[i] == null).slice(0, 10).map((i) => i.creation_date)
);

const buckets = {
    "before 1400": (y) => y < 1400,
    "1400-1600": (y) => y >= 1400 && y < 1600,
    "1600-1800": (y) => y >= 1600 && y < 1800,
    "1800-1900": (y) => y >= 1800 && y < 1900,
    "1900+": (y) => y >= 1900,
};
console.table(
    Object.fromEntries(
        Object.entries(buckets).map(([label, test]) => [
            label,
            years.filter((y) => y != null && test(y)).length,
        ])
    )
);

const byArtist = new Map();
for (const item of items) {
    const raw = item.creators?.[0]?.description;
    if (!raw) continue;
    const name = raw.replace(/\s*\(.*\)\s*$/, "").trim();
    byArtist.set(name, (byArtist.get(name) ?? 0) + 1);
}
console.log("artists with a name:", byArtist.size);
console.table(
    [...byArtist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)
);

const byType = {};
for (const item of items) byType[item.type] = (byType[item.type] ?? 0) + 1;
console.table(byType);