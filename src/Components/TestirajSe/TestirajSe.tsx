import React, { useEffect } from 'react';
import { TestirajSe as _TestirajSe, TestniModul } from './Components';
import { Ime as iIme } from '../../Interfaces/Ime';
import Button from '../Button/Button';

interface iProps {
    list: iIme[];
}

const NauciImena = (props: iProps) => {
    const { list } = props;

    const [count, setCount] = React.useState(3);
    const [offset, setOffset] = React.useState(0);

    const [step, setStep] = React.useState(1);

    const pitanja = React.useRef<iIme[]>([]);
    const tacniOdgovori = React.useRef<iIme[]>([]);
    const netacniOdgovori = React.useRef<iIme[]>([]);

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
    };

    const shuffleArray = (array: iIme[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    React.useEffect(() => {
        if ([2, 98].includes(step)) {
            let imena = list.slice(0);

            if (step === 2) {
                imena = list.slice(offset * count, offset * count + count);
            }

            pitanja.current = shuffleArray.call(null, imena);
            tacniOdgovori.current = [];
            netacniOdgovori.current = [];

            setStep((prevStep) => prevStep + 1);
        }
    }, [step]);

    console.log({ step });

    if (step === 1) {
        return (
            <_TestirajSe className="TestirajSe">
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

                <Button
                    onClick={() => setStep(2)}
                    className="paper-btn btn-block"
                >
                    <>Testiraj {count} imena</>
                </Button>
                <Button
                    onClick={() => setStep(98)}
                    className="paper-btn btn-block"
                >
                    <>Testiraj 99 imena</>
                </Button>
            </_TestirajSe>
        );
    }

    if (step === 2 || step === 98) return null;

    return (
        <TestniModul
            sviOdgovori={list.slice()}
            pitanja={pitanja.current}
            tacniOdgovori={tacniOdgovori}
            netacniOdgovori={netacniOdgovori}
        />
    );
};

export default NauciImena;
