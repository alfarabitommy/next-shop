import Head from "next/head";
import Title from "../../components/Title";
import { getProduct, getProducts } from "../../lib/products";

export async function getStaticPaths() {
    const products = await getProducts();
    console.log(products);

    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() },
        })),
        // ketika fallback 'false', maka ketika kita melakukan perubahan di server, maka data baru yang ada di backend tidak akan masuk
        // ke front end, karna itu kita menggunakan 'blocking', karna dengan blocking, ketika user akan klik detail produk,
        // next js akan langsung men-generate product yang sudah kita tambahkan di backend
        // ini sangat diperlukan ketika kita menggunakan incremental static regeneration (ISR) di next js
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params: { id } }) {
    // disini kita mengecek, seandainya kita menembak detail produk yang tidak ada, pertama tama kita akan try untuk catch produk
    // sebelumnya ketika kita try untuk find product, maka akan terjadi error
    // karena itu kita menggunakan catch, jika terjadi error (err), maka kita akan melempar page 404 not found dengan command
    // catch error dibawah
    try {
        const product = await getProduct(id);
        return {
            props: { product },
            revalidate: 30,
        };
    } catch (err) {
        return { notFound: true };
    }
    
}

function ProductPage({ product }) {
    console.log('[ProductPage] render:', product);
    return (
        <>
            <Head>
                <title>Next Shop</title>
            </Head>
            <main className="px-6 py-4">
                <Title>{product.title}</Title>
                <p>
                    {product.description}
                </p>
            </main>
        </>
    );
}

export default ProductPage;