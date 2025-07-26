function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Minimalist Blog</h3>
            <p>
              A home for intentional thought. Not built for clicks. Not built for outrage.
            </p>
          </div>
          
          <div className="footer-section">  
            <h3>Navigation</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Explore</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} Minimalist Blog. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <a href="/">Privacy</a>
            <a href="/">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 