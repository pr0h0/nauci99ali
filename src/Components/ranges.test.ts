import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ranges } from './ranges.ts';

// regression: this used to be ceil(100 / count), which added a trailing
// "100 - 99" page over an empty slice whenever count didn't divide 100
test('never pages past name 99', () => {
    for (const count of [3, 5, 10, 25]) {
        const pages = ranges(count);
        assert.equal(pages.at(-1)?.to, 99, `count=${count} ends at 99`);
        assert.ok(
            pages.every((p) => p.from <= 99),
            `count=${count} has no empty page`
        );
        assert.equal(pages[0].from, 1);
    }
});

test('pages tile the whole list without gaps or overlap', () => {
    for (const count of [3, 5, 10, 25]) {
        const pages = ranges(count);
        pages.forEach((p, i) => {
            if (i > 0) assert.equal(p.from, pages[i - 1].to + 1);
        });
        assert.equal(pages.length, Math.ceil(99 / count));
    }
});
