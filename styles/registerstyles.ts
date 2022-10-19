import styled from 'styled-components';

const RegisterContainer = styled.div`
    h5 {
        margin-bottom: 10px;
    }
`;

const PlantAnimationContainer = styled.div`
    position: absolute;
    opacity: 0.5;
    width: 150px;
    height: 150px;
    left: 50%;
    transform: translate(-50%, 30%);

    @media (max-width: 450px) {
        width: 90px;
        height: 90px;
        transform: translate(-50%, 0%);
    }
`;

export { RegisterContainer, PlantAnimationContainer };
