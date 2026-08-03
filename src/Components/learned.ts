// Which names are marked learned. localStorage is the store of record; this
// keeps one parsed copy so rendering 99 rows doesn't mean 99 JSON.parse calls.
// Browser-only — call from effects and event handlers, never during render.
type Learned = { [id: number]: boolean };

let cache: Learned | null = null;

const read = (): Learned => {
    if (!cache) {
        try {
            cache = JSON.parse(localStorage.getItem('learned') || '{}');
        } catch {
            // ponytail: unreadable storage just means nothing is learned yet
            cache = {};
        }
    }
    return cache as Learned;
};

export const isLearned = (id: number) => read()[id] === true;

export const setLearned = (id: number, value: boolean) => {
    cache = { ...read(), [id]: value };
    localStorage.setItem('learned', JSON.stringify(cache));
};
