import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const CloudAnimation = () => {
    const likecontainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: likecontainer.current!,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./cloudAnimation.json'),
        });
        Lottie.setSpeed(1.5);
    }, []);

    return <div ref={likecontainer}></div>;
};

export default CloudAnimation;
