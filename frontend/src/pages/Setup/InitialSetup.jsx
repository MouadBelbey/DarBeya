import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { encryptPassword } from '../../utils/cryptoUtils';
import './InitialSetup.css';

const InitialSetup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [canSetup, setCanSetup] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const navigate = useNavigate();

  // Vérifier s'il existe déjà des administrateurs dans le système
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-admin-exists');
        // Si des administrateurs existent déjà, la configuration initiale n'est pas autorisée
        setCanSetup(!response.data.adminExists);
      } catch (err) {
        // En cas d'erreur, on suppose qu'aucun administrateur n'existe
        setCanSetup(true);
        console.error("Erreur lors de la vérification des administrateurs:", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkAdminStatus();
  }, []);

  const handleSetup = async (e) => {
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
        url: 'http://localhost:5000/setup-initial-admin',
        data: {
          username,
          password: encryptedPassword
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Administrateur initial créé avec succès! Vous allez être redirigé vers la page de connexion.');

      // Redirection vers la page de connexion après 3 secondes
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Des administrateurs existent déjà. Cette page n\'est plus accessible.');
      } else if (err.response && err.response.data) {
        setError(err.response.data.error || 'Erreur lors de la création du compte administrateur initial.');
      } else {
        setError('Erreur de connexion au serveur.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <MDBContainer fluid className="setup-container d-flex justify-content-center align-items-center">
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Chargement...</span>
        </MDBSpinner>
      </MDBContainer>
    );
  }

  if (!canSetup) {
    return (
      <MDBContainer fluid className="setup-container">
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12' md='6'>
            <MDBCard className='setup-card text-center'>
              <MDBCardBody>
                <h2 className="mb-4">Configuration non disponible</h2>
                <p>Il existe déjà un compte administrateur dans le système.</p>
                <p>Veuillez vous connecter avec un compte administrateur existant.</p>
                <MDBBtn className="mt-3" onClick={() => navigate('/login')}>
                  Aller à la page de connexion
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer fluid className="setup-container">
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12' md='6'>
          <MDBCard className='setup-card'>
            <MDBCardBody className='card-body p-5'>
              <h2 className="text-center mb-5">Configuration initiale de l'application</h2>
              <p className="text-muted mb-4">
                Bienvenue dans la configuration initiale de darBeya. Veuillez créer un premier compte administrateur
                pour commencer à utiliser l'application.
              </p>

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

              <form onSubmit={handleSetup}>
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

                <div className="text-center">
                  <MDBBtn
                    type="submit"
                    className="btn-dark btn-block mb-4"
                    disabled={loading}
                  >
                    {loading ? <MDBSpinner size='sm' role='status' tag='span' /> : 'Créer le compte administrateur'}
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

export default InitialSetup;
