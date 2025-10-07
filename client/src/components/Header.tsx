import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">MegaMart</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/cart">Cart</Link>
          <Link to="/account">Account</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/vendor">Vendor</Link>
        </nav>
      </div>
    </header>
  );
}
