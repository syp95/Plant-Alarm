import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import useNotification from '../hooks/usePushNotification';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { pathname } = router;
    const noNav = ['/login', '/register', '/add-plant'];

    const [queryClient] = useState(() => new QueryClient());
    const triggerNotif = useNotification('Test Noti', {
        body: 'notification body test',
    });

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
                        <button onClick={triggerNotif}></button>
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
