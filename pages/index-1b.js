// Option 1b : fetch products on the server side 
// But with incremental Static Regeneration (in getStaticProps)
// 1b ini mirip dengan option 1a, namun dengan ISR (incremental static regeneration), halaman akan di regenerate secara
// berkala agar data yg terbaru bisa ter-update, jadi ketika data di backend berubah, ini akan mengikuti perubahan data secara dinamis
// kekurangannya adalah kita tidak bisa 'export' page ini secara static
import Head from "next/head";
import Title from "../components/Title";
import { getProducts } from "../lib/products";

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return { 
    props: { products },
    // parameter dibawah menggunakan incremental static regeneration
    revalidate: 30 // in seconds
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
              {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;