import React from 'react';
import styled from 'styled-components';
import { Ime as iIme } from '../../Interfaces/Ime';

interface iProps extends iIme {
    showCheckbox?: boolean;
    isOpen?: boolean;
}

export const Ime = (props: iProps) => {
    const { translation, arabic, id, transcription, showCheckbox } = props;
    const [isLearned, setIsLearned] = React.useState(false);

    React.useEffect(() => {
        let learned: { [key: number]: boolean } = { 0: true };
        try {
            learned = JSON.parse(localStorage.getItem('learned') || '{}');
        } catch (e) {
            //
        }

        setIsLearned(learned[id] || false);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsLearned(checked);
        const learned: { [key: number]: boolean } = {
            ...JSON.parse(localStorage.getItem('learned') || '{}'),
        };
        learned[id] = checked;
        localStorage.setItem('learned', JSON.stringify(learned));
    };

    const handleTextClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let target = (e.target as HTMLElement).parentElement as HTMLElement;

        target = target.querySelector('input') as HTMLElement;

        target?.click();
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
                            type="checkbox"
                            checked={isLearned}
                            onChange={handleChange}
                        />
                        <span className="tick" onClick={handleTextClick} />
                    </>
                )}
            </Text>
        </_Ime>
    );
};

const _Ime = styled.div`
    margin-block: 0.25rem;
    border-top-style: hidden !important;
`;

const Header = styled.h3`
    text-align: left !important;
`;

const Text = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    border-bottom-style: hidden;

    .text{
        flex: 1;
        text-align: left;
    }
    input[type=checkbox]{
        position: fixed: 
        top: -1000px;
        left: -1000px;
        visibility: hidden;
        opacity: 0;

        &:checked + .tick {
            background-color: var(--secondary-light, #deefff);
            &::after {
                content: '✔';
                text-align: center;
                line-height: 1.5;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
    }
    .tick{
        position: relative;
        width: 32px;
        height: 32px;
        border: 1px solid #000;
        background-color: transparent;

        &::after {
            content: '';
        }
    }
`;
