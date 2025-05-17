import React, { useState } from 'react';
import axios from 'axios';
import './AjoutRobe.css';
import {
  MDBInput,
  MDBBtn,
  MDBFile
}
from 'mdb-react-ui-kit';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';
import {useNavigate} from "react-router-dom";

function App() {
    const [photos, setPhotos] = useState([]);
    const [robeInfo, setRobeInfo] = useState({
        nom: '',
        couleur: '',
        categorie: ''
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePhotoChange = (event) => {
        setPhotos([...photos, ...event.target.files]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (robeInfo.nom === '' || robeInfo.couleur === '' || robeInfo.categorie === '' || photos.length === 0) {
            setErrorMessage("Veuillez remplir tous les champs du formulaire et sélectionner au moins une photo.");
            setSuccessMessage('');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < photos.length; i++) {
            formData.append('photo', photos[i]);
        }
        formData.append('nomRobe', robeInfo.nom);
        formData.append('couleurRobe', robeInfo.couleur);
        formData.append('categorieRobe', robeInfo.categorie);

        try {
            const response = await axios.post('http://localhost:5000/upload-robes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            
            setSuccessMessage("La robe et les photos ont été ajoutées avec succès !");
            setErrorMessage('');
            
            setPhotos([]);
            setRobeInfo({
                nom: '',
                couleur: '',
                categorie: ''
            });

            navigate('/robes');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Une erreur s'est produite lors de l'ajout de la robe et des photos.");
            setSuccessMessage('');
        }
    };

    return (
        <div className="container-fluid form-page-container">
            <Navbar/>
            <div className="form-outline">
                <div className="form-container">
                    <h1 style={{ fontSize: '30px' }}>Ajouter des photos de robe</h1>
                    {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="nom">Nom de la robe:</label>
                            <MDBInput type="text" id="nom" label='Nom de la robe' wrapperClass='mb-4' className="form-control" value={robeInfo.nom}
                                   onChange={(e) => setRobeInfo({...robeInfo, nom: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="couleur">Couleur de la robe:</label>
                            <MDBInput type="text" id="couleur" label='Couleur de la robe' wrapperClass='mb-4' className="form-control" value={robeInfo.couleur}
                                   onChange={(e) => setRobeInfo({...robeInfo, couleur: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categorie">Catégorie de la robe:</label>
                            <MDBInput id='categorie' className="form-control" wrapperClass='mb-4' label='Catégorie de la robe' value={robeInfo.categorie}
                                   onChange={(e) => setRobeInfo({...robeInfo, categorie: e.target.value})}/>
                        </div>
                        {/*<input type="file" name="photo" onChange={handlePhotoChange} accept="image/*" multiple/>*/}
                        <MDBFile label='Default file input example' id='formFileMultiple' onChange={handlePhotoChange} accept="image/*" multiple />
                        <MDBBtn className="mb-4" type="submit" color='dark'>Envoyer</MDBBtn>
                    </form>
                    {photos.length > 0 && (
                        <div>
                        <h2>Prévisualisation des photos sélectionnées :</h2>
                            {Array.from(photos).map((photo, index) => (
                                <img key={index} src={URL.createObjectURL(photo)} alt={`Prévisualisation ${index + 1}`}
                                     height={150} width={150}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
    <Footer/>
</div>
)
    ;
}

export default App;
