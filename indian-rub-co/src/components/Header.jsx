import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from './Icons';

const NAV = [
  { to: '/shop', label: 'Shop' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/about', label: 'Our Story' },
  { to: '/orders', label: 'My Orders' },
];

export default function Header() {
  const { totals } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setQuery('');
    setOpen(false);
  };

  return (
    <>
      <div className="demo-bar" role="note">
        <strong>College demo store</strong> · No real orders or payments · Cart &amp; orders are saved only in this browser
      </div>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <Link to="/" onClick={() => setOpen(false)} className="brand" aria-label="The Indian Rub Co. home">
            <img src="/images/logo-mark.webp" alt="" width="44" height="44" />
            <span className="brand__text">
              <span className="brand__the">The</span> Indian Rub Co.
            </span>
          </Link>

          <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} onClick={() => setOpen(false)}>{n.label}</NavLink>
                </li>
              ))}
            </ul>
            <form className="search search--header" role="search" onSubmit={submitSearch}>
              <label htmlFor="header-search" className="sr-only">Search rubs</label>
              <input id="header-search" type="search" placeholder="Search rubs…" value={query} onChange={(e) => setQuery(e.target.value)} />
              <button type="submit" aria-label="Search"><SearchIcon width={18} height={18} /></button>
            </form>
          </nav>

          <div className="header__actions">
            <Link to="/cart" onClick={() => setOpen(false)} className="cart-link" aria-label={`Cart, ${totals.itemCount} item${totals.itemCount === 1 ? '' : 's'}`}>
              <BagIcon />
              {totals.itemCount > 0 && <span className="cart-link__count" key={totals.itemCount}>{totals.itemCount}</span>}
            </Link>
            <button type="button" className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
