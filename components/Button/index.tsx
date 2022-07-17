import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

interface IButton {
    name?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width?: string;

    image?: string;
}

const Container = styled.button<IButton>`
    background-color: #64b058;
    color: #fff;
    font-family: Pretendard;
    border: none;
    width: ${(props) => props.width};

    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const Button = ({ name, onClick, width, image }: IButton) => {
    const nameSwitch = () => {
        switch (name) {
            case 'Google':
                return <FontAwesomeIcon icon={faGoogle} size='lg' />;
            case 'Facebook':
                return <FontAwesomeIcon icon={faFacebook} size='lg' />;
            default:
                return name;
        }
    };

    return (
        <Container onClick={onClick} name={name} width={width} image={image}>
            {nameSwitch()}
        </Container>
    );
};

export default Button;
