// Option 1a : fetch products on the server side (in getStaticProps)
// dengan menggunakan ini data akan di fetch ketika app di build, dan page akan menjadi static
// ini akan menyebabkan halaman dapat di load secara cepat, dan lebih mudah di index oleh search engines
import Head from "next/head";
import Title from "../components/Title";
import { getProducts } from "../lib/products";

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return { props: { products }};
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
              {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;