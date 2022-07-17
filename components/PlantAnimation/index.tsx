import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const PlantAnimation = () => {
    const likecontainer = useRef<LottieView>(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: likecontainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../lottie/plantAnimation.json'),
        });
    });

    return <LottieView ref={likecontainer}></LottieView>;
};
