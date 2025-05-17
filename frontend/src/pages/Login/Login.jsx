import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Make sure to create this context as shown previously
import Logo from '../../assets/logo.png';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // Define isLoginSuccess state here
  const { setIsAuthenticated } = useContext(AuthContext); // Use the context
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/connexion',
        data: formData.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      });
      // Update login status message
      if (response.status === 200) {
        setLoginStatus('Connexion réussie! Redirection...');
        setIsAuthenticated(true); // Set authentication state
        setIsLoginSuccess(true); // Update isLoginSuccess state
        // Redirect to admin page on success
        setTimeout(() => {
          navigate('/admin'); // Change to your admin page path
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      // Update login status message
      setLoginStatus('Échec de la connexion. Veuillez réessayer.');
      setIsAuthenticated(false); // Reset authentication state
      setIsLoginSuccess(false); // Update isLoginSuccess state
    }
  };

  return (
      <div className={"container-fluid"}>
        <Navbar/>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50" id="LoginContainer">
          <div className="text-center">
            <img src={Logo} style={{width: '185px'}} alt="logo"/>
            <h4 className="mt-1 mb-5 pb-1">Admin</h4>
          </div>

          <form onSubmit={handleLogin}>
            <MDBInput
                className="loginInput"
                wrapperClass='mb-4'
                name="username"
                label='Nom d&#39;utilisateur'
                id='form1'
                type='text'
                color='dark'
                onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
                className="loginInput"
                wrapperClass='mb-4'
                name="password"
                label='Mot de passe'
                id='form2'
                color='dark'
                type='password'
                style={{borderColor: '#332D2D'}}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mx-3 mb-4">
              {/*<MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Mémoriser info' color='dark'/>*/}
            </div>

            <MDBBtn className="mb-4" type="submit" color='dark'>Connecter</MDBBtn>
          </form>

          {loginStatus && (
              <div className={`message ${isLoginSuccess ? 'success' : 'error'}`} role="alert">
                {loginStatus}
              </div>
          )}
        </MDBContainer>
        <Footer/>
      </div>
  );
}

export default App;

/*<form onSubmit={handleLogin}>
        <MDBInput
          className="loginInput"
          wrapperClass='mb-4'
          name="username"
          label='Nom d&#39;utilisateur'
          id='form1'
          type='text'
          color='dark'
          onChange={(e) => setUsername(e.target.value)}
        />
        <MDBInput
          className="loginInput"
          wrapperClass='mb-4'
          name="password"
          label='Mot de passe'
          id='form2'
          color='dark'
          type='password'
          style={{ borderColor: '#332D2D' }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Mémoriser info' color='dark' />
        </div>

        <MDBBtn className="mb-4" type="submit" color='dark'>Connecter</MDBBtn>
      </form>*/