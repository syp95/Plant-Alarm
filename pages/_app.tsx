import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <br></br>
            <NavBar />
        </>
    );
}

export default MyApp;
