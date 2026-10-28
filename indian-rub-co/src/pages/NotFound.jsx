import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <div className="container narrow center empty empty--page">
        <p className="eyebrow">404</p>
        <h1 className="page-title">This page has gone up in smoke</h1>
        <p>We couldn&rsquo;t find what you were looking for.</p>
        <Link to="/" className="btn btn--primary">Back to home</Link>
      </div>
    </div>
  );
}
