import 'styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/Shared/NavBar/NavBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
import GlobalStyle from 'styles/Globalstyles';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { DefaultSeo } from 'next-seo';
import SEO from '../../seo.config';

const theme: DefaultTheme = {
    maxwidth: 520,
};
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { pathname } = router;
    const noNav = ['/login', '/register', '/add-plant'];

    const [queryClient] = useState(() => new QueryClient());
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const access = `${localStorage.getItem('access')}`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    }, []);

    return (
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <ThemeProvider theme={theme}>
                            <GlobalStyle />
                            <DefaultSeo {...SEO} />
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </Hydrate>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position='bottom-right'
                    />
                </QueryClientProvider>
            </RecoilRoot>

            <br></br>
            {noNav.includes(pathname) ? '' : <NavBar />}
        </>
    );
}

export default MyApp;
