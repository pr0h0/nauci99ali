import React from 'react';
import { TestirajSe as _TestirajSe, TestniModul, shuffle } from './Components';
import { Ime as iIme } from '../../Interfaces/Ime';
import Button from '../Button/Button';
import Selects, { useSelects } from '../Selects';

interface iProps {
    list: iIme[];
}

const TestirajSe = (props: iProps) => {
    const { list } = props;
    const { count, offset, update } = useSelects();

    const [pitanja, setPitanja] = React.useState<iIme[] | null>(null);

    if (pitanja) {
        return <TestniModul sviOdgovori={list} pitanja={pitanja} />;
    }

    return (
        <_TestirajSe className="TestirajSe">
            <Selects count={count} offset={offset} onChange={update} />

            <Button
                onClick={() =>
                    setPitanja(
                        shuffle(
                            list.slice(offset * count, offset * count + count)
                        )
                    )
                }
                className="paper-btn btn-block"
            >
                Testiraj {count} imena
            </Button>
            <Button
                onClick={() => setPitanja(shuffle(list))}
                className="paper-btn btn-block"
            >
                Testiraj 99 imena
            </Button>
        </_TestirajSe>
    );
};

export default TestirajSe;
