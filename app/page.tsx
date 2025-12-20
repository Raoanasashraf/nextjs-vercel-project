import Hero from './components/Hero';
import Feature from './components/Feature';
import StoreProduct from './components/StoreProduct';
import Newsletter from './components/Newsletter';
import { products, gases } from '@/data/products';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <section id="product1" className="section-p1">
        <h2 style={{ paddingTop: '10px' }}>Feature Products</h2>
        <p>All Gas Appliances </p>
        <div
          className="pro-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '20px',
            flexWrap: 'wrap',
          }}
        >
          {products.map((product) => (
            <StoreProduct key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        id="banner"
        className="section-m1 section-p1"
        style={{ paddingBottom: '20px' }}
      >
        <h4>Repairing Services</h4>
        <h2>Exclusive Deals on Accessories</h2>
        <Link href="/shop">
          <button className="normal">Explore More</button>
        </Link>
      </section>

      <section id="product1">
        <div>
          <h2 style={{ fontWeight: 500 }}>Available Gases</h2>
        </div>
        <div
          className="pro-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '20px',
            flexWrap: 'wrap',
          }}
        >
          {gases.map((product) => (
            <StoreProduct key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
}
