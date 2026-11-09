import { readFile } from "node:fs/promises";

const items = JSON.parse(
    await readFile("src/features/artworks/data/raw-artworks.json", "utf8")
);

const has = (v) =>
    Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim());

console.table({
    total: items.length,
    creation_date: items.filter((i) => has(i.creation_date)).length,
    technique: items.filter((i) => has(i.technique)).length,
    culture: items.filter((i) => has(i.culture)).length,
    measurements: items.filter((i) => has(i.measurements)).length,
    description: items.filter((i) => has(i.description)).length,
    did_you_know: items.filter((i) => has(i.did_you_know)).length,
    artist_bio: items.filter((i) => has(i.creators?.[0]?.biography)).length,
});

console.log(items.slice(0, 8).map((i) => i.measurements));