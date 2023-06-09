import React from "react";
import logo from "../../assets/img/LogoBIGEOblanco.png";
import "./footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="footer-contact">
          <p className="contact-info">Dirección: Calle principal, Ciudad</p>
          <p className="contact-info">Teléfono: +1234567890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
