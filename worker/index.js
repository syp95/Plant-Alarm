'use strict';

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

self.addEventListener('push', function (event) {
    const data = JSON.parse(event.data.text());
    console.log('start');

    event.waitUntil(
        wait(data.time).then(() => {
            console.log(`${data.time / 1000}second`);
            registration.showNotification(data.title, {
                body: data.message,
                icon: '/icons/192logo.png',
            });
        }),
    );
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
