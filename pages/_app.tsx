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

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { pathname } = router;
    const noNav = ['/login', '/register', '/add-plant'];

    const [queryClient] = useState(() => new QueryClient());

    //파이어 베이스 fcm 백그라운드 알림 .. 추후 express api 서버 만들어서 구현.
    // const dbTokenData = collection(fbDb, 'tokens');

    // const initTokenWrapper = async () => {
    //     let mytoken = await initToken();
    //     const docprofile = doc(dbTokenData, 'my');
    //     const data = await getDoc(docprofile);

    //     if (data.exists()) {
    //         updateDoc(doc(dbTokenData, 'my'), {
    //             token: mytoken,
    //             timestamp: Date.now(),
    //         });
    //     } else {
    //         setDoc(doc(dbTokenData, 'my'), {
    //             token: mytoken,
    //             timestamp: Date.now(),
    //         });
    //     }
    // };
    // useEffect(()=>{initTokenWrapper()},[]);

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
