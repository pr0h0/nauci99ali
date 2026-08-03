import next from 'eslint-config-next/core-web-vitals';
import ts from 'eslint-config-next/typescript';

export default [
    { ignores: ['.next/', 'out/'] },
    ...next,
    ...ts,
    {
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
    },
];
