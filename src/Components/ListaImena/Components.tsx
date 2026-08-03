import React from 'react';
import styled from 'styled-components';
import { Ime as iIme } from '../../Interfaces/Ime';
import { isLearned as readLearned, setLearned } from '../learned';

interface iProps extends iIme {
    showCheckbox?: boolean;
    isOpen?: boolean;
}

export const Ime = (props: iProps) => {
    const { translation, arabic, id, transcription, showCheckbox } = props;
    const [isLearned, setIsLearned] = React.useState(false);

    // read after mount, so the prerendered markup and the first client render match
    React.useEffect(() => {
        setIsLearned(readLearned(id));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsLearned(checked);
        setLearned(id, checked);
    };

    return (
        <_Ime className="collapsible">
            <input
                id={`collapsible-${id}`}
                type="checkbox"
                name="collapsible"
                defaultChecked={props.isOpen || false}
            />
            <Header
                as="label"
                htmlFor={`collapsible-${id}`}
                className={`paper-btn btn-block btn-${
                    isLearned ? 'success' : 'secondary-outline'
                }`}
            >
                {id}. {transcription} - {arabic}
            </Header>
            <Text className="collapsible-body">
                <span className="text">{translation}</span>
                {showCheckbox && (
                    <>
                        <input
                            id={`learned-${id}`}
                            type="checkbox"
                            checked={isLearned}
                            onChange={handleChange}
                            aria-label={`Naučeno: ${transcription}`}
                        />
                        <label className="tick" htmlFor={`learned-${id}`}>
                            <span className="tick-text">Naučeno</span>
                            <span className="tick-box" />
                        </label>
                    </>
                )}
            </Text>
        </_Ime>
    );
};

// papercss hides the collapsible toggle with `display: none`, which drops it out
// of the tab order — clip it instead so it stays keyboard-reachable
const srOnly = `
    display: block;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
`;

const _Ime = styled.div`
    position: relative;
    margin-block: 0.25rem;
    border-top-style: hidden !important;

    > input[id^='collapsible'] {
        ${srOnly}
    }
    > input[id^='collapsible']:focus-visible + label {
        outline: 2px solid var(--primary, #41403e);
        outline-offset: 2px;
    }
    /* a collapsed body is only opacity/max-height:0, so its controls stay in the
       tab order — hide it properly until it is open */
    > input[id^='collapsible']:not(:checked) ~ .collapsible-body {
        visibility: hidden;
    }
`;

const Header = styled.h3`
    text-align: left !important;
`;

const Text = styled.div`
    display: flex;
    flex-wrap: nowrap;
    /* keeps the translation on the same line as the checkbox */
    align-items: center;
    gap: 0.75rem;
    justify-content: space-between;

    border-bottom-style: hidden;

    .text {
        flex: 1;
        text-align: left;
    }
    input[type='checkbox'] {
        ${srOnly}

        &:focus-visible + .tick .tick-box {
            outline: 2px solid var(--primary, #41403e);
            outline-offset: 2px;
        }

        &:checked + .tick .tick-box {
            background-color: var(--secondary-light, #deefff);
            /* grid centring keeps the tick centred whatever the box size is */
            &::after {
                content: '✔';
                position: absolute;
                inset: 0;
                display: grid;
                place-items: center;
            }
        }
    }
    /* .tick is a <label> now, so papercss's .collapsible label box has to go */
    .tick {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 0 0 auto;
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: normal;
        white-space: nowrap;
        cursor: pointer;
    }
    .tick-text {
        font-size: 0.8rem;
    }
    .tick-box {
        position: relative;
        display: block;
        flex: 0 0 auto;
        /* 44px is the minimum comfortable touch target */
        width: 44px;
        height: 44px;
        border: 1px solid #000;
        background-color: transparent;

        &::after {
            content: '';
        }
    }
`;
