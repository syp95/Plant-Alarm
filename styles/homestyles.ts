import Slider from 'react-slick';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

const StyledSlider = styled(Slider)`
    .slick-list {
        width: 440px;
        margin: 0;
    }
    .slick-slide div {
    }
    .slicks-dots {
        bottom: -50px;
        margin-top: 200px;
    }
    .slick-track {
        overflow-x: hidden;
    }
`;

const StyledToastContainer = styled(ToastContainer)`
    top: 40px;

    .Toastify__toast {
        color: #fff;
        background: #4c8144;
        font-family: Pretendard;
        box-shadow: none;
        min-height: 10px;
    }
    .Toastify__toast-body {
        padding: 0;
        margin: 0;
    }
    .Toastify__toast-icon svg {
        fill: #ffffff;
    }
    .Toastify__close-button > svg {
        fill: #ebebeb;
    }
`;

const AddBtnContainer = styled.div`
    position: absolute;

    bottom: 6%;
`;

const SliderContainer = styled.div``;

const SliderMoveBtnContainer = styled.div`
    transform: translateY(-290px);
    button {
        position: absolute;
        width: 3px;
        height: 100px;
        border: none;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);

        cursor: pointer;
    }
    button:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
    button:first-child {
        left: -10px;
    }
    button:last-child {
        right: -10px;
    }
`;
const NoPlantContainer = styled.div`
    background-color: white;
    margin-top: 40px;
    width: 100%;
    height: 300px;
    border: 2px solid #ebebeb;
    border-radius: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const WeatherContainer = styled.div`
    position: relative;
    font-size: 12px;
    background-color: #73cc65;
    color: white;
    margin-top: 40px;
    width: 100%;
    height: 130px;
    border: 2px solid #ebebeb;
    border-radius: 20px;
    display: flex;
    justify-content: right;
    align-items: center;
    overflow: hidden;
    h2 {
        margin-top: 0;
        margin-bottom: 0;
    }
    h2:last-child {
        margin-right: 15px;
    }
    @media (max-width: 440px) {
        font-size: 10px;
    }
`;

export {
    StyledSlider,
    StyledToastContainer,
    SliderContainer,
    SliderMoveBtnContainer,
    AddBtnContainer,
    NoPlantContainer,
    WeatherContainer,
};
