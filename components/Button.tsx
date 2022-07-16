import styled from 'styled-components';

interface IButton {
    name?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width: string;
}

const Container = styled.button<IButton>`
    background-color: #64b058;
    color: #fff;
    font-family: Pretendard;
    border: none;
    width: ${(props) => props.width};
    padding: 10px;
    border-radius: 5px;
`;

const Button = ({ name, onClick, width }: IButton) => {
    return (
        <Container type='button' onClick={onClick} width={width}>
            {name}
        </Container>
    );
};

export default Button;
