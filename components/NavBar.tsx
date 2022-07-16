import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavContainer = styled.div`
    position: absolute;

    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #292b37;
    padding: 10px;
    border-radius: 30px;
`;

interface IRoute {
    routing: boolean;
}

const LinkA = styled.a<IRoute>`
    padding: 10px;
    cursor: pointer;
    color: ${(props) => (props.routing ? '#fec200' : '#9d9d9d')};

    &:hover {
        color: white;
    }

    &:active {
        color: white;
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
