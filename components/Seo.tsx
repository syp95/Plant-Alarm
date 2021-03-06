import Head from 'next/head';

type Props = {
    title: string;
};

export default function Seo({ title }: Props) {
    const message = `${title} | μλ¬Όμλ`;
    return (
        <Head>
            <title>{message}</title>
        </Head>
    );
}
