import 'papercss/dist/paper.min.css';
import '../index.css';
import '../App.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Wrapper from '../Components/Wrapper/Wrapper';
import BackButton from '../Components/Button/BackButton';
import Title from '../Components/Title/Title';
import Layout from '../Components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
