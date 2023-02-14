// Option 1b
import { getProducts } from "../lib/products";
import ProductCart from "../components/ProductCart";
import Page from "../components/Page"

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return { 
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS!),
  };
}

function HomePage({ products }) {
  console.log('[HomePage] render:', products);
  return (
    <>
      <Page title="Indoor Plants">
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCart product={product} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
};

export default HomePage;