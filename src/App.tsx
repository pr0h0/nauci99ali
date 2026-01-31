/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import BackButton from './Components/Button/BackButton';
import Home from './Components/Home/Home';
import Title from './Components/Title/Title';
import Wrapper from './Components/Wrapper/Wrapper';
import { Ime } from './Interfaces/Ime';
import { Page } from './Interfaces/Pages';

import 'papercss/dist/paper.min.css';
import './App.css';
import ListaImena from './Components/ListaImena/ListaImena';
import OImenima from './Components/oImenima/OImenima';
import NauciImena from './Components/NauciImena/NauciImena';
import TestirajSe from './Components/TestirajSe/TestirajSe';

function App() {
    const [names, setNames] = useState<Ime[]>([]);
    const [activeComponentEnum, setActiveComponentEnum] = useState<Page>(
        Page.Home
    );

    useEffect(() => {
        fetch(`/data/names.json?cachebuster=${Date.now()}`)
            .then((res) => res.json())
            .then((data) => setNames(data.names));
    }, []);

    const setActivePage = (page: Page) => {
        setActiveComponentEnum(page);
    };

    let activeComponent: JSX.Element;
    let titleText: string;

    switch (activeComponentEnum) {
        case Page.Home: {
            activeComponent = <Home setActivePage={setActivePage} />;
            titleText = '99 Allahovih lijepih imena';
            break;
        }
        case Page.List: {
            activeComponent = <ListaImena list={names} />;
            titleText = 'Lista imena';
            break;
        }
        case Page.About: {
            activeComponent = <OImenima />;
            titleText = 'O Imenima';
            break;
        }
        case Page.Learn: {
            activeComponent = <NauciImena list={names} />;
            titleText = 'Nauci imena';
            break;
        }
        case Page.Test: {
            activeComponent = <TestirajSe list={names} key={Date.now()} />;
            titleText = 'Testiraj se';
            break;
        }
        // case Page.Other: {
        //     activeComponent = <div>O stranici</div>;
        //     titleText = 'O stranici';
        //     break;
        // }
        default: {
            activeComponent = <></>;
            titleText = 'Page' + String(activeComponentEnum);
            break;
        }
    }

    return (
        <Wrapper>
            <BackButton
                onClick={() => setActivePage(Page.Home)}
                show={activeComponentEnum !== Page.Home}
            />
            <Title>{titleText}</Title>
            {activeComponent}
        </Wrapper>
    );
}

export default App;
