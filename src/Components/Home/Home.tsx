import React from 'react';
import { Page } from '../../Interfaces/Pages';
import Button from '../Button/Button';
import { List, ListItem } from './Components';

interface iProps {
    setActivePage: (page: Page) => void;
    children?: any;
}

const Home = (props: iProps) => {
    const { setActivePage } = props;

    return (
        <List>
            <ListItem>
                <Button onClick={() => setActivePage(Page.List)}>
                    Lista imena
                </Button>
            </ListItem>
            <ListItem>
                <Button onClick={() => setActivePage(Page.About)}>
                    O Imenima
                </Button>
            </ListItem>
            <ListItem>
                <Button onClick={() => setActivePage(Page.Learn)}>
                    Nauci imena
                </Button>
            </ListItem>
            <ListItem>
                <Button onClick={() => setActivePage(Page.Test)}>
                    Testiraj se
                </Button>
            </ListItem>
            {/* 
                <ListItem>
                    <Button onClick={() => setActivePage(Page.Other)}>
                        O stranici
                    </Button>
                </ListItem> 
            */}
        </List>
    );
};
export default Home;
