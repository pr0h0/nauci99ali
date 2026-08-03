import React from 'react';
import { Ime } from '../ListaImena/Components';
import { NauciImena as _NauciImena } from './Components';
import { Ime as iIme } from '../../Interfaces/Ime';
import Selects, { useSelects } from '../Selects';

interface iProps {
    list: iIme[];
}

const NauciImena = (props: iProps) => {
    const { list } = props;
    const { count, offset, update } = useSelects();

    return (
        <_NauciImena className="NauciImena">
            <Selects count={count} offset={offset} onChange={update} />
            {list.slice(offset * count, offset * count + count).map((ime) => (
                <Ime key={ime.id} {...ime} showCheckbox />
            ))}
        </_NauciImena>
    );
};

export default NauciImena;
