import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const RainAnimation = () => {
    const likecontainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: likecontainer.current!,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./rainAnimation.json'),
        });
        Lottie.setSpeed(1.5);
    }, []);

    return <div ref={likecontainer}></div>;
};

export default RainAnimation;
