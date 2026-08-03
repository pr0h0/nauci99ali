// Page ranges for the "Imena" dropdown: 99 names split into pages of `count`.
export const ranges = (count: number) =>
    Array.from({ length: Math.ceil(99 / count) }, (_, i) => ({
        from: 1 + i * count,
        to: Math.min(99, (i + 1) * count),
    }));
