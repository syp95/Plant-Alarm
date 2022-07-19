import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const NavContainer = styled(motion.div)`
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

const NavButton = styled.button`
    position: absolute;
    width: 20px;
    background-color: transparent;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    border: none;
    border-top: solid 3px #7d7d7d;
    border-bottom: solid 3px #7d7d7d;
`;

export default function NavBar() {
    const router = useRouter();
    const [navOn, setNavOn] = useState(true);
    const onNavToggle = () => {
        setNavOn(!navOn);
    };

    return (
        <>
            <NavButton onClick={onNavToggle}></NavButton>
            <AnimatePresence>
                {navOn && (
                    <NavContainer
                        initial={{ transform: 'translate(-50%,300px)' }}
                        animate={{ transform: 'translate(-50%,000px)' }}
                        exit={{ transform: 'translate(-50%,300px)' }}
                        transition={{ type: 'tween', duration: 0.5 }}
                    >
                        <Link href='/'>
                            <LinkA routing={router.pathname === '/'}>
                                Home
                            </LinkA>
                        </Link>
                        <Link href='/plant-list'>
                            <LinkA routing={router.pathname === '/plant-list'}>
                                List
                            </LinkA>
                        </Link>
                        <Link href='/user'>
                            <LinkA routing={router.pathname === '/user'}>
                                User
                            </LinkA>
                        </Link>
                    </NavContainer>
                )}
            </AnimatePresence>
        </>
    );
}
