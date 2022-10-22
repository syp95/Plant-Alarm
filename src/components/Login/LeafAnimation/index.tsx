import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const LeafAnimation = () => {
    const likecontainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: likecontainer.current!,
            renderer: 'svg',
            loop: true,
            autoplay: true,

            animationData: require('./leafAnimation.json'),
        });
        Lottie.setSpeed(1);
    }, []);

    return <div ref={likecontainer}></div>;
};

export default LeafAnimation;
