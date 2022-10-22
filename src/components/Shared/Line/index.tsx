import styled from 'styled-components';

interface ILine {
    color?: string;
}

const Container = styled.div`
    width: 100%;
    height: 1px;
    margin-top: 40px;
    margin-bottom: 15px;
    background-color: ${(props) => (props.color ? props.color : '#aaaaaa')};
`;

const Line = ({ color }: ILine) => {
    return <Container />;
};

export default Line;
