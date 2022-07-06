import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const showNav = router.pathname === '/login' ? false : true;
    useEffect(() => {
        let token = sessionStorage.getItem('PlantAlarmToken');
        if (!token) {
            router.push('/login');
        }
    }, []);
    return (
        <>
            <Component {...pageProps} />
            <br></br>
            {showNav && <NavBar />}
        </>
    );
}

export default MyApp;
