import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Minimalist Blog
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/manage-post" 
              className={isActive('/manage-post') ? 'active' : ''}
            >
              New Post
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 