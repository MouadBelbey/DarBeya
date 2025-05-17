import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo.png';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import './Registration.css';
import axios from 'axios';
import { encryptPassword } from '../../utils/cryptoUtils';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();  const handleRegistration = async (e) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    // Vérifier la complexité du mot de passe
    if (password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setPasswordError('');

    try {
      // Chiffrement du mot de passe avant envoi
      const encryptedPassword = encryptPassword(password);

      await axios({
        method: 'post',
        url: 'http://localhost:5000/inscription',
        data: { username, password: encryptedPassword },
        headers: { 'Content-Type': 'application/json' }
      });

      setRegistrationStatus('Inscription réussie! Vous pouvez maintenant vous connecter.');

      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setRegistrationStatus('Cet identifiant est déjà utilisé. Veuillez en choisir un autre.');
      } else {
        setRegistrationStatus('Échec de l\'inscription. Veuillez réessayer.');
      }
    }
  };
  return (
    <div className="container-fluid">
      <Navbar />
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50" id="RegistrationContainer">
        <div className="text-center">
          <img src={Logo} style={{ width: '185px' }} alt="logo" />
          <h4 className="mt-1 mb-5 pb-1">Création d'un Compte Administrateur</h4>
        </div>

        <MDBCard>
          <MDBCardBody className="p-4">
            <form onSubmit={handleRegistration}>
              <MDBInput
                className="mb-4"
                name="username"
                label='Nom d&#39;utilisateur'
                id='username'
                type='text'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                className="mb-4"
                name="password"
                label='Mot de passe'
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MDBInput
                className="mb-4"
                name="confirmPassword"
                label='Confirmez le mot de passe'
                id='confirmPassword'
                type='password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {passwordError && (
                <div className="alert alert-danger mb-3" role="alert">
                  {passwordError}
                </div>
              )}

              <div className="d-grid">
                <MDBBtn className="mb-4" type="submit" color='dark'>Créer un compte administrateur</MDBBtn>
              </div>

              <div className="text-center mt-3">
                <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>

        {registrationStatus && (
          <div className={`alert mt-4 ${registrationStatus.includes('réussie') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {registrationStatus}
          </div>
        )}
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default Registration;
