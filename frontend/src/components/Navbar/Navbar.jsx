import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../pages/Login/AuthContext';
import Logo from '../../assets/logo.png';
import './Navbar.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Ajouter une classe quand la page défile
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/deconnexion', {}, { withCredentials: true });

      if (response.data.status === 'loggedOut') {
        setIsAuthenticated(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Fermer le menu hamburger après clic sur un lien
  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo pour mobile */}
        <Link to={"/"} className='navbar-logo d-lg-none'>
          <img src={Logo} alt="DarBeya" />
        </Link>
        
        {/* Bouton hamburger */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded={expanded ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenu de la navbar */}
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarSupportedContent">
          {/* Menu principal */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/robes' ? 'active' : ''}`} 
                to="/robes"
                onClick={closeNavbar}
              >
                Robes
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/accessoire' ? 'active' : ''}`} 
                to="/accessoire"
                onClick={closeNavbar}
              >
                Accessoires
              </Link>
            </li>

            {/* Logo centré pour desktop */}
            <li className="nav-item d-none d-lg-block">
              <Link to={"/"} className="navbar-logo">
                <img src={Logo} alt="DarBeya" />
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/univers' ? 'active' : ''}`} 
                to="/univers"
                onClick={closeNavbar}
              >
                Univers
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                to="/contact"
                onClick={closeNavbar}
              >
                Contact
              </Link>
            </li>
          </ul>
          
          {/* Boutons d'authentification */}
          <div className="navbar-auth ms-auto">
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <Link 
                  to="/admin" 
                  className="btn-admin me-2" 
                  onClick={closeNavbar}
                >
                  <i className="fas fa-user-shield me-1"></i>
                  Admin
                </Link>
                <button 
                  className="btn-logout" 
                  onClick={() => {
                    handleLogout();
                    closeNavbar();
                  }}
                >
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn-login" 
                onClick={closeNavbar}
              >
                <i className="fas fa-sign-in-alt me-1"></i>
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
