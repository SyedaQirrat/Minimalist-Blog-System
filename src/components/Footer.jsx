function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About</h3>
            <p>
              A minimalist blog platform focused on clean design and great content. 
              Built with React and inspired by modern web design principles.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Features</h3>
            <p>
              • Clean, minimalist design<br/>
              • Responsive layout<br/>
              • Category filtering<br/>
              • Tag-based navigation<br/>
              • Image support
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>    
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Minimalist Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 