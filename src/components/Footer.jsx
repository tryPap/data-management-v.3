import React from 'react';
function Footer() {
    return (
        <footer>
        <div id="footer">&copy; Data Management {new Date().toLocaleDateString()}</div>
      </footer>
    );
}
export default Footer;