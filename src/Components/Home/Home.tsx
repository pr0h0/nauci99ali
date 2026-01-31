import React from 'react';
import { useRouter } from 'next/router';
import Button from '../Button/Button';
import { List, ListItem } from './Components';

const Home = () => {
    const router = useRouter();

    return (
        <List>
            <ListItem>
                <Button onClick={() => router.push('/lista-imena')}>
                    Lista imena
                </Button>
            </ListItem>
            <ListItem>
                <Button onClick={() => router.push('/o-imenima')}>
                    O Imenima
                </Button>
            </ListItem>
            <ListItem>
                <Button onClick={() => router.push('/nauci-imena')}>
                    Nauci imena
                </Button>
            </ListItem>
            <ListItem>
                <Button onClick={() => router.push('/testiraj-se')}>
                    Testiraj se
                </Button>
            </ListItem>
        </List>
    );
};
export default Home;
