const PREFERRED_LABELS = ["unframed", "overall", "image", "sheet"];
const SILENT_LABELS = new Set(["unframed", "overall"]);

export function capitalizeFirst(value?: string | null) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : null;
}

export function formatDimensions(raw?: string | null): string | null {
    if (!raw) return null;

    const segments = raw
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const colon = part.indexOf(":");
            const label = colon > -1 ? part.slice(0, colon).trim() : "";
            const value = (colon > -1 ? part.slice(colon + 1) : part)
                .replace(/\s*\([^)]*\)/g, "")
                .replace(/\s+x\s+/g, " × ")
                .trim();
            return { label, value };
        });

    if (segments.length === 0) return null;

    const chosen =
        PREFERRED_LABELS.map((preferred) =>
            segments.find((s) => s.label.toLowerCase() === preferred)
        ).find(Boolean) ??
        segments.find((s) => s.label.toLowerCase() !== "framed") ??
        segments[0];

    const label = chosen.label.toLowerCase();
    return !label || SILENT_LABELS.has(label)
        ? chosen.value
        : `${chosen.label}: ${chosen.value}`;
}

export function formatByLine(artist?: string | null, medium?:string | null){
    return [artist ? `by ${artist}` : null, medium].filter(Boolean).join(" • ");
}