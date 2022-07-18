import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavContainer = styled.div`
    position: absolute;

    bottom: 7%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #64b058;
    padding: 10px;
    border-radius: 50px;
`;

interface IRoute {
    routing: boolean;
}

const LinkA = styled.a<IRoute>`
    padding: 10px;
    cursor: pointer;
    color: ${(props) => (props.routing ? '#345a2e' : '#fff')};

    &:hover {
        color: #192b16;
    }

    &:active {
        color: #192b16;
    }
`;

export default function NavBar() {
    const router = useRouter();

    return (
        <>
            <NavContainer>
                <Link href='/'>
                    <LinkA routing={router.pathname === '/'}>Home</LinkA>
                </Link>
                <Link href='/plant-list'>
                    <LinkA routing={router.pathname === '/plant-list'}>
                        List
                    </LinkA>
                </Link>
                <Link href='/user'>
                    <LinkA routing={router.pathname === '/user'}>User</LinkA>
                </Link>
            </NavContainer>
        </>
    );
}
