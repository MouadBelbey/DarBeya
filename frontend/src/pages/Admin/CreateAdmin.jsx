import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBSpinner
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { encryptPassword } from '../../utils/cryptoUtils';
import './CreateAdmin.css';

const CreateAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation de base
    if (!username || !password || !confirmPassword) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    try {
      setLoading(true);
      // Chiffrer le mot de passe avant de l'envoyer
      const encryptedPassword = encryptPassword(password);
        await axios({
        method: 'post',
        url: 'http://localhost:5000/inscription',
        data: {
          username,
          password: encryptedPassword
        },
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      setSuccess('Administrateur créé avec succès!');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      // Redirection vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Erreur lors de la création du compte.');
      } else {
        setError('Erreur de connexion au serveur.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="create-admin-container">
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol col='12' md='6'>
          <MDBCard className='create-admin-card'>
            <MDBCardBody className='card-body p-5'>
              <h2 className="text-center mb-5">Création d'un compte administrateur</h2>

              {error && (
                <div className="alert alert-danger mb-4" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success mb-4" role="alert">
                  {success}
                </div>
              )}

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

                <div className="d-flex justify-content-between">
                  <Link to="/admin" className="btn btn-secondary">
                    Retour
                  </Link>
                  <MDBBtn
                    type="submit"
                    className="btn btn-dark"
                    disabled={loading}
                  >
                    {loading ? <MDBSpinner size='sm' role='status' tag='span' /> : 'Créer le compte'}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CreateAdmin;
