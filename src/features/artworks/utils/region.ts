// "Italy, Rome, 17th century" -> "Italy"
export function getRegion(culture?: string | null): string | null {
    const first = culture?.split(",")[0]?.trim();
    return first ? first : null;
}