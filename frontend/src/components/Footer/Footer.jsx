import React from 'react';
import './Footer.css';
import { CiInstagram, CiFacebook, CiPhone, CiLocationOn, CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png';


function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='footer_wrapper'>
      <div className="footer_container_haut">
        {/* Logo et court texte */}
        <div className="footer-brand">
          <Link to={"/"} className='footer_logo'>
            <img src={Logo} alt="DarBeya" />
          </Link>
          <p className="footer-tagline">Élégance traditionnelle pour vos événements spéciaux</p>
        </div>
        
        {/* Liens de navigation */}
        <div className="permalinks">
          <h4>Navigation</h4>
          <Link to={"/"} className='footer_link'>Accueil</Link>
          <Link to={"/robes"} className='footer_link'>Robes</Link>
          <Link to={"/accessoire"} className='footer_link'>Accessoires</Link>
          <Link to={"/contact"} className='footer_link'>Contact</Link>
          <Link to={"/univers"} className='footer_link'>Univers</Link>
        </div>
        
        {/* Coordonnées */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <a href="tel:+15149915513" className="footer_link contact-item" target='_blank' rel="noopener noreferrer">
            <CiPhone /> +1 514 991 5513
          </a>
          <a href="mailto:contact@darbeya.com" className="footer_link contact-item">
            <CiMail /> contact@darbeya.com
          </a>
          <a href="https://goo.gl/maps/YourLocation" className="footer_link contact-item" target="_blank" rel="noopener noreferrer">
            <CiLocationOn /> Montréal, QC, Canada
          </a>
        </div>
        
        {/* Réseaux sociaux */}
        <div className="footer-social">
          <h4>Suivez-nous</h4>
          <div className="footer_socials">
            <a href="https://www.instagram.com/dar_beya_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><CiInstagram /></a>
            <a href="https://www.facebook.com/Maison.Beya.1" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><CiFacebook /></a>
            <a href="https://api.whatsapp.com/send?phone=15149915513" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
      
      <hr className="dropdown-divider" />
      
      <div className="footer_copyright">
        <p>&copy; {currentYear} DarBeya - Tous droits réservés</p>
      </div>      
    </footer>
  );
}

export default Footer