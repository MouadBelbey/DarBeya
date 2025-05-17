import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import './Admin.css'
import axios from 'axios';
import NavBar from "../../components/Navbar/Navbar";
import {AuthContext, AuthProvider} from '../Login/AuthContext'; // Make sure to import the AuthContext
import {useNavigate} from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import Swal from 'sweetalert2'

function AdminPage() {
  const { isAuthenticated } = useContext(AuthContext); // Use the context to get the authentication state
  const [adminInfo, setAdminInfo] = useState({});
  const [robeData, setRobeData] = useState([]);
  const [accessoiresData, setAccessoiresData] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) { // Only fetch data if the user is authenticated
      // Fetch the actual admin info from the server
      axios.get('http://localhost:5000/session-info', { withCredentials: true })
        .then((response) => {
          setAdminInfo(response.data.user);
        })
        .catch((error) => {
          console.error('Error fetching admin info:', error);
        });

      // Fetch robe data
      axios.get('http://localhost:5000/robes')
        .then((response) => {setRobeData(response.data);})
        .catch((error) => {console.error('Error fetching data:', error);});

      // Fetch accessoire data
      axios.get('http://localhost:5000/accessoires')
        .then((response) => {setAccessoiresData(response.data);})
        .catch((error) => {console.error('Error fetching data:', error);});
    }
  }, [isAuthenticated]); // Add isAuthenticated as a dependency

const handleDeleteRobe = async (robeId) => {
  Swal.fire({
    title: 'Voulez-vous supprimer cette robe ?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Oui',
    denyButtonText: 'Non',
    customClass: {
      actions: 'my-actions',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire('Supprimé!', '', 'success')
      try {
        // Envoyer une requête DELETE au serveur pour supprimer la robe
        const response = await axios.delete(`http://localhost:5000/robe/${robeId}`);
        console.log(response.data); // Afficher la réponse du serveur
        // Mettre à jour l'état local des robes après la suppression
        setRobeData(robeData.filter((robe) => robe.robe_id !== robeId));
      } catch (error) {
        console.error('Erreur lors de la suppression de la robe:', error);
      }

    } else if (result.isDenied) {
      Swal.fire("La robe n'a pas étè supprimé", '', 'info')
    }
  })
};
  const handleDeleteAccessoire = async (accessoireId) => {
    Swal.fire({
      title: 'Voulez-vous supprimer cet accessoire ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Oui',
      denyButtonText: 'Non',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Supprimé!', '', 'success')
        try {
          // Envoyer une requête DELETE au serveur pour supprimer l'accessoire
          const response = await axios.delete(`http://localhost:5000/accessoire/${accessoireId}`);
          console.log(response.data); // Afficher la réponse du serveur
          // Mettre à jour l'état local des robes après la suppression
          setAccessoiresData(accessoiresData.filter((accessoire) => accessoire.accessoire_id !== accessoireId));
        } catch (error) {
          console.error("Erreur lors de la suppression l'accessoire:", error);
        }

      } else if (result.isDenied) {
        Swal.fire("L'accessoire n'a pas étè supprimé", '', 'info')
      }
    })
 };
  const handleModifyRobe = (robe) => {
    navigate(`/modification-robe/${robe.robe_id}`, { state: { robeData: robe, robeImages: robe.images }});
};

const handleModifyAccessoire = (accessoire) => {
    navigate(`/modification-accessoire/${accessoire.accessoire_id}`); // Redirect to the modify page with the accessoire id
};


  return (
      <AuthProvider>
        <div className={"container-fluid"}>
          <NavBar/>
        <div className="p-5 content">
          <div className="h1"><h1>Bienvenue !</h1></div>
          <br></br>
          <h2 className="robe-titre">Robes</h2>

          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">Nom de la robe</th>
              <th scope="col">Couleur</th>
              <th scope="col">Catégorie</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {robeData.map((robe) => (
                <tr key={robe.robe_id}>
                  <td>{robe.nom}</td>
                  <td>{robe.couleur}</td>
                  <td>{robe.categorie}</td>
                  <td>
                    <div className="button-action">
                      <div className="supprimer">
                        <button type="button" className="btn btn-dark" onClick={() => handleDeleteRobe(robe.robe_id)}>Supprimer
                        </button>
                      </div>
                      <div className="modifier">
                        <button type="button" className="btn btn-dark" onClick={() => handleModifyRobe(robe)}>Modifier
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          <div className="button-robe">
            <Link to="/upload-robes">
              <button type="button" className="btn btn-dark">Ajouter une robe</button>
            </Link>
          </div>
          <hr></hr>
          <div className="accessoire">
            <h2 className="accessoire-titre">Accessoire</h2>
            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">Nom de l'accessoire</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              {accessoiresData.map((accessoire) => (
                  <tr key={accessoire.accessoire_id}>
                    <td>{accessoire.name}</td>
                    <td>{accessoire.description}</td>
                    <td>
                      <div className="action-accessoire">
                        <div className="supprimer-accessoire">
                          <button type="button" className="btn btn-dark"
                                  onClick={() => handleDeleteAccessoire(accessoire.accessoire_id)}>Supprimer
                          </button>
                        </div>
                        <div className="modifier-accessoire">
                          <button type="button" className="btn btn-dark"
                                  onClick={() => handleModifyAccessoire(accessoire)}>Modifier
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
            <hr></hr>
            <div className="button-accessoire">
              <Link to="/upload-accessoires">
                <button type="button" className="btn btn-dark">Ajouter un Accessoire</button>
              </Link>
            </div>
          </div>
        </div>
          <Footer/>
      </div>
      </AuthProvider>
  );
}

export default AdminPage;
