import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="empty-state">
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '700' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
