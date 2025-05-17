import React, { useState } from 'react';
import axios from 'axios';
import './AjoutAccessoire.css';
import {
  MDBInput,
  MDBBtn,
  MDBFile
}
from 'mdb-react-ui-kit';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

function AjoutAccessoire() {
    const [photos, setPhotos] = useState([]);
    const [accessoireInfo, setAccessoireInfo] = useState({
        nom: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const handlePhotoChange = (event) => {
        setPhotos([...photos, ...event.target.files]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

       
        if (accessoireInfo.nom === '' || accessoireInfo.description === '' || photos.length === 0) {
            setErrorMessage("Veuillez remplir tous les champs du formulaire et sélectionner au moins une photo.");
            setSuccessMessage('');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < photos.length; i++) {
            formData.append('photo', photos[i]);
        }
        formData.append('nomAccessoire', accessoireInfo.nom);
        formData.append('descriptionAccessoire', accessoireInfo.description);

        try {
            const response = await axios.post('http://localhost:5000/upload-accessoires', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setSuccessMessage("L'accessoire et les photos ont été ajoutés avec succès !");
            setErrorMessage('');
            setPhotos([]);
            setAccessoireInfo({
                nom: '',
                description: ''
            });

            navigate('/accessoire');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Une erreur s'est produite lors de l'ajout de l'accessoire et des photos.");
            setSuccessMessage('');
        }
    };

    return (
        <div className="container-fluid">
            <Navbar />
            <div className="form-container">
                <h1 style={{ fontSize: '30px' }}>Ajouter des photos d'accessoire</h1>
                {successMessage && <div className="success-message" style={{ color: 'green' }}>{successMessage}</div>}
                {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="nom">Nom de l'accessoire:</label>
                        <MDBInput type="text" id="nom" label='Nom de l&#39;accessoire' wrapperClass='mb-4' value={accessoireInfo.nom} onChange={(e) => setAccessoireInfo({ ...accessoireInfo, nom: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description de l'accessoire:</label>
                        <MDBInput  wrapperClass='mb-4' textarea id="description" rows={4} label='Description de l&#39;accessoire' value={accessoireInfo.description} onChange={(e) => setAccessoireInfo({ ...accessoireInfo, description: e.target.value })}/>
                    </div>
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
            <Footer />
        </div>
    );
}

export default AjoutAccessoire;
