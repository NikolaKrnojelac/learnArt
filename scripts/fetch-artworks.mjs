import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const BASE = "https://openaccess-api.clevelandart.org/api/artworks/";
const OUT = "src/features/artworks/data/raw-artworks.json";

const TYPES = [
    "Painting",
    "Drawing",
    "Print",
    "Sculpture",
    "Photograph",
    "Textile",
    "Ceramic",
];
const PER_TYPE = 60;
const PAGE_SIZE = 20;

const FIELDS = [
    "id", "title", "creation_date", "technique", "type", "culture",
    "department", "measurements", "description", "did_you_know",
    "creditline", "url", "images", "creators",
].join(",");

async function fetchPage(type, skip, attempt = 1) {
    const params = new URLSearchParams({
        cc0: "1",
        has_image: "1",
        type,
        limit: String(PAGE_SIZE),
        skip: String(skip),
        fields: FIELDS,
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120_000);

    try {
        const res = await fetch(`${BASE}?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json.data;
    } catch (err) {
        if (attempt >= 4) throw err;
        console.log(`  retry ${attempt} for ${type} skip=${skip} (${err.message})`);
        return fetchPage(type, skip, attempt + 1);
    } finally {
        clearTimeout(timer);
    }
}

function shuffle(items) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const byId = new Map();

for (const type of TYPES) {
    console.log(`Fetching ${type}...`);
    for (let skip = 0; skip < PER_TYPE; skip += PAGE_SIZE) {
        const items = await fetchPage(type, skip);
        items.forEach((item) => byId.set(item.id, item));
        console.log(`  ${type}: ${skip + items.length} done`);
        if (items.length < PAGE_SIZE) break;
    }

    await mkdir(dirname(OUT), { recursive: true });
    await writeFile(OUT, JSON.stringify(shuffle([...byId.values()])));
    console.log(`Saved ${byId.size} artworks so far`);
}

console.log("Done.");