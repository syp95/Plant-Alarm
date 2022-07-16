import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface IButton {
    name?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width?: string;
    className?: string;
    image?: string;
}

const Container = styled.button<IButton>`
    background-color: #64b058;
    color: #fff;
    font-family: Pretendard;
    border: none;
    width: ${(props) => props.width};
    background-image: ${(props) => (props.image ? `url${props.image}` : '')};
    background-size: ${(props) => (props.image ? 'cover' : '')};
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const Button = ({ name, onClick, width, className, image }: IButton) => {
    return (
        <Container
            type='button'
            onClick={onClick}
            width={width}
            className={className}
            image={image}
        >
            {className === 'Google' ? (
                <FontAwesomeIcon icon={faGoogle} size='lg' />
            ) : (
                ''
            )}
            {className === 'Facebook' ? (
                <FontAwesomeIcon icon={faFacebook} size='lg' />
            ) : (
                ''
            )}
            {name}
        </Container>
    );
};

export default Button;
