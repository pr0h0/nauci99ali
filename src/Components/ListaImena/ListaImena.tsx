import React from 'react';
import { Ime as iIme } from '../../Interfaces/Ime';
import { Ime } from './Components';

interface iProps {
    list: iIme[];
}
const ListaImena = (props: iProps) => {
    const { list } = props;

    return (
        <>
            {list.map((ime) => (
                <Ime key={ime.id} {...ime} />
            ))}
        </>
    );
};
export default ListaImena;
