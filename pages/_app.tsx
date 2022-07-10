import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fbAuth } from '../firebaseConfig';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

const theme = {
    bg: 'white',
};

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { pathname } = router;
    const noNav = ['/login', '/register'];
    useEffect(() => {
        let token = sessionStorage.getItem('PlantAlarmToken');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
            </ThemeProvider>
            <br></br>
            {noNav.includes(pathname) ? '' : <NavBar />}
        </>
    );
}

export default MyApp;
