// Option 1b
import Head from "next/head";
import Link from "next/link";
import Title from "../components/Title";
import { getProducts } from "../lib/products";

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return { 
    props: { products },
    // parameter dibawah menggunakan incremental static regeneration
    revalidate: 5 * 60 // in seconds
  };
}

function HomePage({ products }) {
  console.log('[HomePage] render:', products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${products.id}`}>
                  {product.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;