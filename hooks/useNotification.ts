const useNotification = (title: string, options: any) => {
    if (!Notification) {
        return;
    }

    const fireNotif = () => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(title, options);
                } else {
                    return;
                }
            });
        } else {
            new Notification(title, options);
        }
    };
    return fireNotif;
};

export default useNotification;
