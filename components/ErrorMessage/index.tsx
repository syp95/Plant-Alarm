import styled from 'styled-components';

interface IErrorMessage {
    error?: string;
}

const Container = styled.div`
    color: red;
    font-size: 12px;
`;

const ErrorMessage = ({ error }: IErrorMessage) => {
    return <Container>{error ? error : '⠀'}</Container>;
};

export default ErrorMessage;
