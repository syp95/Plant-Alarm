const webPush = require('web-push');

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY,
);

const Notification = (req, res) => {
    if (req.method == 'POST') {
        const { subscription, text, userId, time } = req.body;
        //userId 확인 작업
        webPush
            .sendNotification(
                subscription,
                JSON.stringify({
                    title: '식물 알람',
                    message: text,
                    link: 'http://localhost:3000',
                    time,
                }),
                {
                    TTL: 3600 * 12,
                },
            )
            .then((response) => {
                res.writeHead(response.statusCode, response.headers).end(
                    response.body,
                );
            })
            .catch((err) => {
                if ('statusCode' in err) {
                    res.writeHead(err.statusCode, err.headers).end(err.body);
                } else {
                    console.error(err);
                    res.statusCode = 500;
                    res.end();
                }
            });
    } else {
        res.statusCode = 405;
        res.end();
    }
};

export default Notification;
