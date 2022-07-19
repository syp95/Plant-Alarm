import styled from 'styled-components';

interface ICircleButton {
    name?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width?: string;
}

const Container = styled.button<ICircleButton>`
    background-color: #64b058;
    color: #fff;
    font-family: Pretendard;
    border: none;
    width: ${(props) => props.width};
    height: ${(props) => props.width};
    border-radius: 50%;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
    padding: 10px;
    cursor: pointer;

    :hover {
        background-color: #59994f;
    }
    :active {
        background-color: #4c8144;
    }
`;

const CircleButton = ({ name, onClick, width }: ICircleButton) => {
    return (
        <Container onClick={onClick} width={width}>
            {name}
        </Container>
    );
};

export default CircleButton;
