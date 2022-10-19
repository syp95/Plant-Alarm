import styled from 'styled-components';

const LoginContainer = styled.div`
    height: 100%;
    margin-top: 90px;
    position: relative;
    h2 {
        margin-top: 0;
    }
    h5 {
        margin-bottom: 10px;
    }
`;

const LeafContainer = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    right: -10px;
    top: -90px;
    opacity: 0.5;
`;

export { LoginContainer, LeafContainer };
