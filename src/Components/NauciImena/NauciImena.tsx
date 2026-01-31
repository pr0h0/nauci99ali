import React, { useEffect } from 'react';
import { Ime } from '../ListaImena/Components';
import { NauciImena as _NauciImena } from './Components';
import { Ime as iIme } from '../../Interfaces/Ime';

interface iProps {
    list: iIme[];
}

const NauciImena = (props: iProps) => {
    const { list } = props;

    const [count, setCount] = React.useState(3);
    const [offset, setOffset] = React.useState(0);

    useEffect(() => {
        let selectsData = { offset: 0, count: 3 };
        try {
            selectsData = JSON.parse(
                localStorage.getItem('selectsData') || '{}'
            );
        } catch (e) {
            //
        }

        setCount((prevCount) => selectsData.count || prevCount);
        setOffset((prevOffset) => selectsData.offset || prevOffset);
    }, []);

    const generateLeftDropdown = () => {
        return [3, 5, 10, 25].map((count) => (
            <option key={count} value={count}>
                {count} imena
            </option>
        ));
    };

    const generateRightDropDown = () => {
        const broj = Math.ceil(100 / count);
        const list = [];
        let offset = 0;
        for (let i = 0; i < broj; i++) {
            list.push(
                <option key={i} value={i}>
                    {1 + offset} - {Math.min(99, offset + count)}
                </option>
            );
            offset += count;
        }
        return list;
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            target: { id },
        } = e;

        let c = count,
            o = offset;
        if (id === 'leftDD') {
            c = parseInt(e.target.value);
            o = 0;
        } else if (id === 'rightDD') {
            o = parseInt(e.target.value);
        }

        setCount(c);
        setOffset(o);

        localStorage.setItem(
            'selectsData',
            JSON.stringify({ count: c, offset: o })
        );
    };

    const imena = list
        .slice(offset * count, offset * count + count)
        .map((ime) => <Ime key={ime.id} {...ime} showCheckbox />);

    return (
        <_NauciImena className="NauciImena">
            <div className="selectovi">
                <div className="form-group">
                    <label htmlFor="leftDD">Broj imena</label>
                    <select
                        id="leftDD"
                        value={count}
                        onChange={handleSelectChange}
                    >
                        {generateLeftDropdown()}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="rightDD">Imena</label>
                    <select
                        id="rightDD"
                        value={offset}
                        onChange={handleSelectChange}
                    >
                        {generateRightDropDown()}
                    </select>
                </div>
            </div>
            {imena}
        </_NauciImena>
    );
};

export default NauciImena;
