'use strict';

self.addEventListener('push', function (event) {
    const data = JSON.parse(event.data.text());
    console.log('start');
    setTimeout(() => {
        console.log(`${data.time / 1000}second`);
        event.waitUntil(
            registration.showNotification(data.title, {
                body: data.message,
                icon: '/icons/192logo.png',
            }),
        );
    }, data.time);
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then(function (clientList) {
                if (clientList.length > 0) {
                    let client = clientList[0];
                    for (let i = 0; i < clientList.length; i++) {
                        if (clientList[i].focused) {
                            client = clientList[i];
                        }
                    }
                    return client.focus();
                }
                return clients.openWindow('/');
            }),
    );
});
