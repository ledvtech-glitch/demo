import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';

type Product = {
  title: string;
  slug: string;
  price: number;
  images?: string[];
  brand?: string;
  category?: string;
};

export default function Product() {
  const { productId } = useParams();
  const slug = productId as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get(`/api/products/${slug}`);
        if (!mounted) return;
        setProduct(data);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || 'Failed to load product');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div className="animate-pulse">Loading product...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img
        src={product.images?.[0] || 'https://via.placeholder.com/800x800?text=No+Image'}
        alt={product.title}
        className="w-full max-h-[480px] object-cover rounded"
      />
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        {product.brand && <div className="text-gray-600">{product.brand}</div>}
        <div className="mt-4 text-xl">${'{'}product.price.toFixed(2){'}'}</div>
        {product.category && <div className="mt-2 text-sm">Category: {product.category}</div>}
      </div>
    </div>
  );
}
