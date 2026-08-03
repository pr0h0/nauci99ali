import React from 'react';
import styled from 'styled-components';
import { ranges } from './ranges';

interface iProps {
    count: number;
    offset: number;
    onChange: (count: number, offset: number) => void;
}

export const useSelects = () => {
    const [state, setState] = React.useState({ count: 3, offset: 0 });

    React.useEffect(() => {
        try {
            const stored = JSON.parse(
                localStorage.getItem('selectsData') || '{}'
            );
            if (stored.count) {
                setState({ count: stored.count, offset: stored.offset || 0 });
            }
        } catch {
            // ponytail: unreadable storage just falls back to the defaults
        }
    }, []);

    const update = (count: number, offset: number) => {
        setState({ count, offset });
        localStorage.setItem('selectsData', JSON.stringify({ count, offset }));
    };

    return { ...state, update };
};

const Selects = (props: iProps) => {
    const { count, offset, onChange } = props;

    return (
        <_Selects>
            <div className="form-group">
                <label htmlFor="leftDD">Broj imena</label>
                <select
                    id="leftDD"
                    value={count}
                    onChange={(e) => onChange(parseInt(e.target.value), 0)}
                >
                    {[3, 5, 10, 25].map((n) => (
                        <option key={n} value={n}>
                            {n} imena
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="rightDD">Imena</label>
                <select
                    id="rightDD"
                    value={offset}
                    onChange={(e) => onChange(count, parseInt(e.target.value))}
                >
                    {ranges(count).map((r, i) => (
                        <option key={i} value={i}>
                            {r.from} - {r.to}
                        </option>
                    ))}
                </select>
            </div>
        </_Selects>
    );
};

export default Selects;

const _Selects = styled.div`
    display: flex;
    flex-wrap: nowrap;
    > .form-group {
        width: 90%;
        margin-inline: 5%;
        > * {
            width: 100%;
        }
    }
`;
