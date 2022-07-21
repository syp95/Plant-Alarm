import axios from 'axios';

export interface IWeather {
    main: { temp: number };
    weather: INowWeather[];
    clouds: { all: number };
}

export interface INowWeather {
    main: string;
}

const API_KEY = 'cc8b2aa8b51dd230c2f3376c835e9ca5';

export const getWeather = async () => {
    const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric`,
    );

    return data;
};
