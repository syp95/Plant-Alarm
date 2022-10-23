// 사용하지 않는 훅.. 공부용으로 남겨둠.

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
