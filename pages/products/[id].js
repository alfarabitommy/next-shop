import Page from "../../components/Page";
import { getProduct, getProducts } from "../../lib/products";
import { ApiError } from "../api/api";
import Image from "next/image";

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
            revalidate: parseInt(process.env.REVALIDATE_SECONDS),
        };
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
            return { notFound: true };
        }
        throw err;
    }
    
}

function ProductPage({ product }) {
    console.log('[ProductPage] render:', product);
    return (
        <>
            <Page title={product.title}>
                {/* show image 640 x 480 */}
                <div className="flex flex-col lg:flex-row">
                    <div>
                        <Image src={product.pictureUrl} alt="" width={640} height={480} />
                    </div>
                    <div className="flex-1 lg:ml-4">
                        <p className="text-sm">
                            {product.description}
                        </p>
                        <p className="text-lg font-bold mt-2">
                            {product.price}
                        </p>
                    </div>
                </div>
            </Page>
        </>
    );
}

export default ProductPage;