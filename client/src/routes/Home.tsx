import { useEffect, useState } from 'react';
import api from '../lib/api';

type Product = {
  title: string;
  slug: string;
  price: number;
  images?: string[];
};

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get('/api/products');
        if (!mounted) return;
        setProducts(data.items ?? []);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || 'Failed to load products');
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!products) return <div className="animate-pulse">Loading products...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <a key={p.slug} href={`/product/${p.slug}`} className="border rounded p-3 hover:shadow">
          <img
            src={p.images?.[0] || 'https://via.placeholder.com/600x600?text=No+Image'}
            alt={p.title}
            className="w-full h-40 object-cover rounded"
          />
          <div className="mt-2 font-medium">{p.title}</div>
          <div className="text-gray-600">${'{'}p.price.toFixed(2){'}'}</div>
        </a>
      ))}
    </div>
  );
}
