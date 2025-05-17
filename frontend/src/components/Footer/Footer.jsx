import React from 'react'
import './Footer.css'
import { CiInstagram, CiFacebook, CiPhone } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png'


function Footer() {
  return (
    <div className='footer_wrapper'>
        <div className="footer_container_haut">
            <div className="footer_socials">
                <a href="https://www.instagram.com/dar_beya_/" target="_blank" rel="noopener noreferrer"><CiInstagram/></a>
                <a href="https://www.facebook.com/Maison.Beya.1" target="_blank" rel="noopener noreferrer"><CiFacebook /></a>
                <a href="https://api.whatsapp.com/send?phone=15149915513" target="_blank" rel="noopener noreferrer"><FaWhatsapp/></a>
                <a href="tel:+15149915513" target='_blank' rel="noopener noreferrer"><CiPhone/></a>
            </div>
            <Link to={"/"} className='footer_logo'><img src={Logo} alt="logo" width="100" height="100"/></Link>
            <div className="permalinks">
                <Link to={"/"} className='footer_link'>Acceuil</Link>
                <Link to={"/robes"} className='footer_link'>Robe</Link>
                <Link to={"/accessoire"} className='footer_link'>Accessoire</Link>
                <Link to={"/contact"} className='footer_link'>Contact</Link>
                <Link to={"/univers"} className='footer_link'>Univers</Link>
            </div>           
        </div>
        <hr className="dropdown-divider" />
        <div className="footer_copyright">
                <small>&copy; DarBeya 2024</small>
        </div>      
    </div>
  )
}

export default Footer