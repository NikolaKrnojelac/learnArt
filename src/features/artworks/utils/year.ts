

export function parseYear(text?: string | null): number | null {
    if(!text) return null;

    const direct = text.match(/(\d{3,4})/);
    let year: number | null = null;

    if (direct) {
        year = Number(direct[1]);

    }else {
        const century = text.match(/(\d{1,2})(?:st|nd|rd|th) century/i);
        if(century)
            year = (Number(century[1]) - 1) * 1000 + 50;



    }

    if (year === null) return null;
    return /\b(BCE|BC)\b|B\.C\./i.test(text) ? -year : year;
}