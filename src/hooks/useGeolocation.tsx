//훅은 바디 안에서만 사용 가능.. 공부용으로 남겨두기.

import { useState, useEffect } from 'react';

interface ILocationType {
    loaded: boolean;
    coordinates?: { lat: number; lng: number };
    error?: { code: number; message: string };
}

const useGeolocation = () => {
    const [location, setLocation] = useState<ILocationType>({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    });

    const onSuccess = (location: {
        coords: { latitude: number; longitude: number };
    }) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error: { code: number; message: string }) => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            onError({
                code: 0,
                message: 'Geolocation not supported',
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeolocation;
