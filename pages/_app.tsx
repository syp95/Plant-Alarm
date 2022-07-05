import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
            <br></br>
            <NavBar />
        </>
    );
}

export default MyApp;