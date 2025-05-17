import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import './Registration.css';
import axios from 'axios';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/inscription',
        data: formData.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setRegistrationStatus('Inscription réussie! Vous pouvez maintenant vous connecter.');
    } catch (error) {
      setRegistrationStatus('Échec de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50" id="RegistrationContainer">
      <div className="text-center">
        <img src={Logo} style={{ width: '185px' }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">Inscription Admin</h4>
      </div>

      <form onSubmit={handleRegistration}>
        <MDBInput
          className="mb-4"
          name="username"
          label='Nom d&#39;utilisateur'
          id='username'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <MDBInput
          className="mb-4"
          name="password"
          label='Mot de passe'
          id='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <MDBBtn className="mb-4" type="submit">S'inscrire</MDBBtn>
      </form>

      {registrationStatus && (
        <div className={`message ${registrationStatus.includes('réussie') ? 'success' : 'error'}`}>
          {registrationStatus}
        </div>
      )}
    </MDBContainer>
  );
}

export default Registration;
