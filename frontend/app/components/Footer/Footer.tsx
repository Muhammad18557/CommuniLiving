import React from 'react';
import Link from 'next/link'; 
import './Footer.css';

function Footer() {


  return (
    <div className="footer">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>© 2023 CommuniLiving Pte Ltd</div>
        <div>
          <Link href="/help">Support</Link>
          <Link href="/help">Support</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
