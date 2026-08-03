import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Wrapper from './Wrapper/Wrapper';
import BackButton from './Button/BackButton';
import Title from './Title/Title';

interface LayoutProps {
    children: ReactNode;
}

const titles: Record<string, string> = {
    '/': '99 Allahovih lijepih imena',
    '/lista-imena': 'Lista imena',
    '/o-imenima': 'O Imenima',
    '/nauci-imena': 'Nauci imena',
    '/testiraj-se': 'Testiraj se',
    '/404': 'Stranica nije pronađena',
};

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const { pathname } = router;
    const titleText = titles[pathname] || '99 Allahovih lijepih imena';
    const showBack = pathname !== '/';

    const handleBack = () => {
        router.push('/');
    };

    return (
        <Wrapper>
            <Head>
                <title>{titleText}</title>
            </Head>
            <BackButton onClick={handleBack} show={showBack} />
            <Title>{titleText}</Title>
            {children}
        </Wrapper>
    );
};

export default Layout;
