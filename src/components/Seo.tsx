import Head from 'next/head';

type Props = {
    title: string;
};

export default function Seo({ title }: Props) {
    const message = `${title} | 식물알람`;
    return (
        <Head>
            <title>{message}</title>
        </Head>
    );
}
