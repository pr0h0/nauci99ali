import 'papercss/dist/paper.min.css';
import '../App.css';
import type { AppProps } from 'next/app';
import Layout from '../Components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
