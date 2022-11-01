import { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import axios from 'axios';

const base64ToUint8Array = (base64: any) => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

declare global {
    interface Window {
        workbox: any;
    }
}

const Notification: NextPage = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState<any>(null);
    const [registration, setRegistration] = useState<any>(null);

    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            'serviceWorker' in navigator &&
            window.workbox !== undefined
        ) {
            // run only in browser
            navigator.serviceWorker.ready.then((reg: any) => {
                reg.pushManager.getSubscription().then((sub: any) => {
                    if (
                        sub &&
                        !(
                            sub.expirationTime &&
                            Date.now() > sub.expirationTime - 5 * 60 * 1000
                        )
                    ) {
                        setSubscription(sub);
                        setIsSubscribed(true);
                    }
                });
                setRegistration(reg);
            });
        }
    }, []);

    const subscribeButtonOnClick = async (event: any) => {
        event.preventDefault();
        if (!registration) {
            alert('subscribe - service worker is not registered');
            return;
        }

        const vapidkey = await axios.get('/plantapi/api/notification/vapid');

        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(String(vapidkey)),
        });

        if (sub) {
            await axios.post('/plantapi/api/notification/subscription', {
                userid: localStorage.getItem('userId'),
                subscription: sub,
            });
            setSubscription(sub);
            setIsSubscribed(true);
            console.log('web push subscribed!');
        }
    };

    const unsubscribeButtonOnClick = async (event: any) => {
        event.preventDefault();
        if (!subscription) {
            alert('unsubscribe - push subscription not exist');
            return;
        }

        const userId = localStorage.getItem('userId');

        await subscription.unsubscribe();
        await axios.delete(`/plantapi/api/notification/subscription/${userId}`);
        setSubscription(null);
        setIsSubscribed(false);
        console.log('web push unsubscribed!');
    };

    const sendNotificationButtonOnClick = async (event: any) => {
        event.preventDefault();
        if (subscription == null) {
            console.error('web push not subscribed');
            return;
        }

        await fetch('/plantapi/api/notification/send-push-notification', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                message: 'hi',
                targetId: localStorage.getItem('userId'),
                date: '22/11/01',
            }),
        });
    };

    return (
        <>
            <Head>
                <title>next-pwa example</title>
            </Head>
            <h1>Next.js + PWA = AWESOME!</h1>
            <button onClick={subscribeButtonOnClick} disabled={isSubscribed}>
                Subscribe
            </button>
            <button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
                Unsubscribe
            </button>
            <button
                onClick={sendNotificationButtonOnClick}
                disabled={!isSubscribed}
            >
                Send Notification
            </button>
        </>
    );
};

export default Notification;
