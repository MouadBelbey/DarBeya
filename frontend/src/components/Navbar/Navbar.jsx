import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../pages/Login/AuthContext'; // Make sure to create and import this context
import Logo from '../../assets/logo.png';
import './Navbar.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NavBar() {
const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/deconnexion', {}, { withCredentials: true });

      if (response.data.status === 'loggedOut') {
        setIsAuthenticated(false); // Update state
        navigate('/'); // Redirect to home page after logout
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to={"/"} className='navbar_logo d-lg-none'>
  <img src={Logo} alt="logo" width="110" height="110" />
</Link>


      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link" href="/robes">Robe</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/accessoire">Accessoire</a>
          </li>


            <Link to={"/"} className="navbar-logo d-none d-lg-block"><img src={Logo} alt="logo" width="110" height="110" /></Link>


          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/univers">Univers</a>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item">
                <a className="nav-link btn-admin" href="/admin">Admin</a>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-admin" onClick={handleLogout} >Logout</button>
              </li>
            </>
          )}

          {/* {isAuthenticated && (
            <li className="nav-item">
            <a className="nav-link" href="/">Se deconnecter</a>
            </li>
          )} */}

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
