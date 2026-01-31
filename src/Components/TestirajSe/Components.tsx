import React from 'react';
import styled from 'styled-components';
import { Ime as iIme } from '../../Interfaces/Ime';
import { Ime } from '../ListaImena/Components';

export const TestirajSe = styled.div`
    display: flex;
    flex-direction: column;
    .selectovi {
        display: flex;
        flex-wrap: nowrap;
        > .form-group {
            width: 90%;
            margin-inline: 5%;
            > * {
                width: 100%;
            }
        }
    }
    button.paper-btn.btn-block.paper-btn {
        margin-bottom: 1rem !important;
    }
`;

interface iTestniModul {
    pitanja: iIme[];
    sviOdgovori: iIme[];
    tacniOdgovori: { current: iIme[] };
    netacniOdgovori: { current: iIme[] };
}

export const TestniModul = (props: iTestniModul) => {
    const { pitanja, sviOdgovori, tacniOdgovori, netacniOdgovori } = props;

    const [localPitanja, setLocalPitanja] = React.useState([...pitanja]);

    const [pitanje, setPitanje] = React.useState<iIme | null>(null);
    const [odgovori, setOdgovori] = React.useState<iIme[]>([]);

    const [showModal, setShowModal] = React.useState(false);
    const modalData = React.useRef<[iIme, iIme] | null>(null);

    React.useEffect(() => {
        handleNextQuestion(true);
    }, []);

    const random = (od: number) => Math.floor(Math.random() * od);

    const shuffleArray = (array: iIme[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getOdgovore = (pitanje: iIme) => {
        const odgovori = [...sviOdgovori].filter((p) => p.id !== pitanje?.id);

        return shuffleArray(
            [
                pitanje,
                odgovori.splice(random(odgovori.length), 1)[0],
                odgovori.splice(random(odgovori.length), 1)[0],
                odgovori.splice(random(odgovori.length), 1)[0],
            ].filter(Boolean)
        );
    };

    const handleOdgovor = (odgovor: iIme) => {
        if (pitanje?.id === odgovor.id) {
            tacniOdgovori.current.push(pitanje as iIme);
        } else {
            netacniOdgovori.current.push(pitanje as iIme);
        }
        modalData.current = [pitanje as iIme, odgovor];
        setShowModal(true);
        // handleNextQuestion();
    };

    const handleNextQuestion = (init = false) => {
        const tempPitanje = localPitanja.splice(0, 1)[0];
        setPitanje(tempPitanje);
        setOdgovori(getOdgovore(tempPitanje));
        setLocalPitanja([...localPitanja]);

        if (!init) {
            setShowModal(!showModal);
        }
    };

    if (!pitanje) {
        if (!localPitanja.length) {
            return (
                <_TestniModul>
                    <h4>
                        Odgovorili ste{' '}
                        {!netacniOdgovori.current.length
                            ? 'sva '
                            : tacniOdgovori.current.length}{' '}
                        pitanja tacno
                    </h4>
                    <ul>
                        {tacniOdgovori.current.map((pitanje) => (
                            <li key={pitanje.id}>
                                <Ime {...pitanje} />
                            </li>
                        ))}
                    </ul>
                    {netacniOdgovori.current.length > 0 ? (
                        <>
                            <h4>
                                Odgovorili ste {netacniOdgovori.current.length}{' '}
                                pitanja netacno
                            </h4>
                            <ul>
                                {netacniOdgovori.current.map((pitanje) => (
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
                checked={showModal}
                onChange={() => handleNextQuestion()}
            />

            {modalData.current && (
                <div className="modal">
                    <label className="modal-bg" htmlFor="answerModal"></label>
                    <div className="modal-body">
                        <h4 className="modal-title">
                            {modalData.current[0].id === modalData.current[1].id
                                ? 'Tacan'
                                : 'Netacan'}{' '}
                            odgovor
                        </h4>
                        <Ime
                            {...modalData.current[0]}
                            isOpen
                            showCheckbox={
                                modalData.current[0].id ===
                                modalData.current[1].id
                            }
                            key={'tacno-' + modalData.current[0].id}
                        />
                        {modalData.current[0].id !==
                            modalData.current[1].id && (
                            <>
                                <p>Vas odgovor</p>
                                <Ime
                                    {...modalData.current[1]}
                                    isOpen
                                    key={'pogresno-' + modalData.current[0].id}
                                />
                            </>
                        )}
                        <label
                            htmlFor="answerModal"
                            className="paper-btn btn-block btn-success"
                        >
                            Dalje
                        </label>
                    </div>
                </div>
            )}
        </_TestniModul>
    );
};

const _TestniModul = styled.div`
    display: flex;
    flex-direction: column;
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
    modal-body > label[for='answerModal'] {
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
