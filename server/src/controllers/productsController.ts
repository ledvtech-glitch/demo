import { Request, Response } from 'express';
import Product from '../models/Product';

const mockProducts = [
  {
    title: 'Sample Product 1',
    slug: 'sample-product-1',
    price: 19.99,
    stock: 100,
    category: 'sample',
    brand: 'MegaBrand',
    images: ['https://via.placeholder.com/600x600?text=Product+1'],
  },
  {
    title: 'Sample Product 2',
    slug: 'sample-product-2',
    price: 29.99,
    stock: 50,
    category: 'sample',
    brand: 'MegaBrand',
    images: ['https://via.placeholder.com/600x600?text=Product+2'],
  },
  {
    title: 'Sample Product 3',
    slug: 'sample-product-3',
    price: 39.99,
    stock: 25,
    category: 'sample',
    brand: 'MegaBrand',
    images: ['https://via.placeholder.com/600x600?text=Product+3'],
  },
];

export async function listProducts(req: Request, res: Response) {
  try {
    const {
      q,
      category,
      brand,
      minPrice,
      maxPrice,
      sort = 'createdAt:desc',
      page = '1',
      limit = '12',
    } = req.query as Record<string, string | undefined>;

    const pageNum = Math.max(parseInt(page ?? '1', 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit ?? '12', 10), 1), 100);

    const filter: Record<string, any> = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const [sortField, sortDir] = (sort ?? 'createdAt:desc').split(':');
    const sortSpec: Record<string, 1 | -1> = { [sortField]: sortDir === 'asc' ? 1 : -1 } as any;

    const total = await Product.countDocuments(filter);
    if (total === 0) {
      const items = mockProducts;
      return res.json({ items, total: items.length, page: 1, pages: 1 });
    }

    const items = await Product.find(filter)
      .sort(sortSpec)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    const pages = Math.max(Math.ceil(total / limitNum), 1);
    return res.json({ items, total, page: pageNum, pages });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to list products' });
  }
}

export async function getProductBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      const mock = mockProducts.find((p) => p.slug === slug);
      if (mock) return res.json(mock);
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to get product' });
  }
}
