import React from 'react';
import Button from './Button';

interface iProps {
    onClick: (arg?: any) => void;
    show: boolean;
}

const BackButton = (props: iProps) => {
    const { onClick, show } = props;

    if (!show) return null;

    return (
        <Button onClick={onClick} className="backButton">
            &lt; Nazad
        </Button>
    );
};
export default BackButton;
