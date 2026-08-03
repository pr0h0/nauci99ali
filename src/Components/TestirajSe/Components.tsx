import React from 'react';
import styled from 'styled-components';
import { Ime as iIme } from '../../Interfaces/Ime';
import { Ime } from '../ListaImena/Components';
import Button from '../Button/Button';

export const TestirajSe = styled.div`
    display: flex;
    flex-direction: column;
    button.paper-btn.btn-block.paper-btn {
        margin-bottom: 1rem !important;
    }
`;

export const shuffle = (array: iIme[]) => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

interface iTestniModul {
    pitanja: iIme[];
    sviOdgovori: iIme[];
}

export const TestniModul = (props: iTestniModul) => {
    const { pitanja, sviOdgovori } = props;

    const random = (od: number) => Math.floor(Math.random() * od);

    const getOdgovore = (pitanje: iIme) => {
        const odgovori = [...sviOdgovori].filter((p) => p.id !== pitanje?.id);

        return shuffle(
            [
                pitanje,
                odgovori.splice(random(odgovori.length), 1)[0],
                odgovori.splice(random(odgovori.length), 1)[0],
                odgovori.splice(random(odgovori.length), 1)[0],
            ].filter(Boolean)
        );
    };

    // first question is set up here rather than in a mount effect, so the
    // component never renders an empty frame before the quiz starts
    const [localPitanja, setLocalPitanja] = React.useState(() =>
        pitanja.slice(1)
    );
    const [pitanje, setPitanje] = React.useState<iIme | null>(
        pitanja[0] ?? null
    );
    const [odgovori, setOdgovori] = React.useState<iIme[]>(() =>
        pitanja[0] ? getOdgovore(pitanja[0]) : []
    );

    const [tacniOdgovori, setTacniOdgovori] = React.useState<iIme[]>([]);
    const [netacniOdgovori, setNetacniOdgovori] = React.useState<iIme[]>([]);

    // [pitanje, odgovor] of the answer being shown; null = modal closed
    const [modalData, setModalData] = React.useState<[iIme, iIme] | null>(null);

    const handleOdgovor = (odgovor: iIme) => {
        const tacno = pitanje?.id === odgovor.id;
        const setter = tacno ? setTacniOdgovori : setNetacniOdgovori;
        setter((prev) => [...prev, pitanje as iIme]);
        setModalData([pitanje as iIme, odgovor]);
    };

    const handleNextQuestion = () => {
        const [next, ...rest] = localPitanja;
        setPitanje(next ?? null);
        setOdgovori(next ? getOdgovore(next) : []);
        setLocalPitanja(rest);
        setModalData(null);
    };

    if (!pitanje) {
        if (!localPitanja.length) {
            return (
                <_TestniModul>
                    <h4>
                        Odgovorili ste{' '}
                        {!netacniOdgovori.length
                            ? 'sva '
                            : tacniOdgovori.length}{' '}
                        pitanja tacno
                    </h4>
                    <ul>
                        {tacniOdgovori.map((pitanje) => (
                            <li key={pitanje.id}>
                                <Ime {...pitanje} />
                            </li>
                        ))}
                    </ul>
                    {netacniOdgovori.length > 0 ? (
                        <>
                            <h4>
                                Odgovorili ste {netacniOdgovori.length} pitanja
                                netacno
                            </h4>
                            <ul>
                                {netacniOdgovori.map((pitanje) => (
                                    <li key={pitanje.id}>
                                        <Ime {...pitanje} isOpen />
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <h3 className="MasaAllah">MasaAllah</h3>
                    )}
                </_TestniModul>
            );
        }
        return null;
    }

    return (
        <_TestniModul>
            <Pitanje>
                {pitanje.transcription} - {pitanje.arabic}
            </Pitanje>
            <div className="odgovori">
                {odgovori.map((odgovor, i) => (
                    <Odgovor
                        key={`${pitanje.id}-${odgovor.id}`}
                        onClick={() => handleOdgovor(odgovor)}
                    >
                        {i + 1}. {odgovor.translation}
                    </Odgovor>
                ))}
            </div>

            <input
                className="modal-state"
                id="answerModal"
                type="checkbox"
                checked={modalData !== null}
                onChange={() => handleNextQuestion()}
            />

            {modalData && (
                <div
                    className="modal"
                    onKeyDown={(e) =>
                        e.key === 'Escape' && handleNextQuestion()
                    }
                >
                    <label className="modal-bg" htmlFor="answerModal"></label>
                    <div className="modal-body">
                        <h4 className="modal-title">
                            {modalData[0].id === modalData[1].id
                                ? 'Tacan'
                                : 'Netacan'}{' '}
                            odgovor
                        </h4>
                        <Ime
                            {...modalData[0]}
                            isOpen
                            showCheckbox={modalData[0].id === modalData[1].id}
                            key={'tacno-' + modalData[0].id}
                        />
                        {modalData[0].id !== modalData[1].id && (
                            <>
                                <p>Vas odgovor</p>
                                <Ime
                                    {...modalData[1]}
                                    isOpen
                                    key={'pogresno-' + modalData[0].id}
                                />
                            </>
                        )}
                        {/* a real button, so it is focusable and Enter works;
                            autoFocus lands the keyboard here as the modal opens */}
                        <Button
                            className="btn-block btn-success dalje"
                            onClick={() => handleNextQuestion()}
                            autoFocus
                        >
                            Dalje
                        </Button>
                    </div>
                </div>
            )}
        </_TestniModul>
    );
};

const _TestniModul = styled.div`
    display: flex;
    flex-direction: column;
    /* papercss gives every ul li a "-" marker; the result rows are cards */
    ul li::before {
        content: '';
    }
    .odgovori {
        display: flex;
        flex-direction: column;
    }
    .MasaAllah {
        text-align: center;
        margin-top: 1rem;
    }
    button.paper-btn {
        margin-bottom: 1rem !important;
    }
    .modal-body {
        min-width: max(50vw, min(600px, 90vw));
    }
    .modal-body > .dalje {
        margin-top: 1rem;
        font-weight: bold;
        background-color: var(--main-background, #fff);
    }
`;

const Pitanje = styled.h3`
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
`;

const Odgovor = styled.button.attrs({
    className: 'paper-btn',
})`
    width: 70%;
    margin-inline: auto;
`;
