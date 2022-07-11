import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fbAuth } from '../firebaseConfig';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { pathname } = router;
    const noNav = ['/login', '/register', '/add-plant'];
    useEffect(() => {
        let token = sessionStorage.getItem('PlantAlarmToken');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return (
        <>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>

            <br></br>
            {noNav.includes(pathname) ? '' : <NavBar />}
        </>
    );
}

export default MyApp;
