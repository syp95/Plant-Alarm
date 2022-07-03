import Link from 'next/link';

export default function NavBar() {
    return (
        <>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <Link href='/plant-list'>
                <a>List</a>
            </Link>
            <Link href='/user'>
                <a>User</a>
            </Link>
        </>
    );
}
