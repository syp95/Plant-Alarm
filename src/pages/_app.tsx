import 'styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { pathname } = router;
    const noNav = ['/login', '/register', '/add-plant'];

    const [queryClient] = useState(() => new QueryClient());

    // 리프레쉬 토큰..
    // useEffect(() => {
    //     const refresh = `${localStorage.getItem('refresh')}`;
    //     axios
    //         .post(
    //             '/plantapi/api/auth/refresh',
    //             {},
    //             {
    //                 headers: {
    //                     Refresh: refresh,
    //                 },
    //             },
    //         )
    //         .then((res) => {
    //             const { accessToken, refreshToken } = res.data.logindata;
    //             console.log(accessToken);
    //             localStorage.setItem('refresh', refreshToken);
    //             axios.defaults.headers.common[
    //                 'Authorization'
    //             ] = `Bearer ${accessToken}`;
    //         });
    // }, []);

    useEffect(() => {
        const start = () => {
            NProgress.start();
        };
        const end = () => {
            NProgress.done();
        };
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);

        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
        };
    }, []);

    return (
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Component {...pageProps} />
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
