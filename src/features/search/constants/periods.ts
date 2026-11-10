export type Period = {
    id: string;
    label: string;
    from: number;
    to: number;
}

export const PERIODS: Period[] = [
    { id: "ancient-medieval", label: "Ancient & Medieval", from: -Infinity, to: 1400 },
    { id: "early-modern", label: "1400–1800", from: 1400, to: 1800 },
    { id: "nineteenth", label: "19th Century", from: 1800, to: 1900 },
    { id: "modern", label: "1900 & Later", from: 1900, to: Infinity },
]
