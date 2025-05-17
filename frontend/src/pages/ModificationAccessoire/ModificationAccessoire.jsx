import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import './ModificationAccessoire.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Swal from 'sweetalert2'

const ModificationAccessoire = () => {
    const { id } = useParams();
    const [nomAccessoire, setNomAccessoire] = useState('');
    const [descriptionAccessoire, setDescriptionAccessoire] = useState('');
    const [imageAccessoire, setImageAccessoire] = useState([]);
    const [imagesExistantes, setImagesExistantes] = useState([]);
    const [nouvellesImages, setNouvellesImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessoire = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/accessoire/${id}`);
                const { name, description, images } = response.data;
                setNomAccessoire(name);
                setDescriptionAccessoire(description);
                setImagesExistantes(images.map(image => ({ imageUrl: image.imageUrl, imageId: image.image_id, isVisible: true }))); // Add isVisible property
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de l\'accessoire:', error);
            }
        };

        fetchAccessoire();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nomAccessoire', nomAccessoire);
        formData.append('descriptionAccessoire', descriptionAccessoire);

        for (let i = 0; i < imageAccessoire.length; i++) {
            formData.append('photo', imageAccessoire[i]);
        }

        try {
            await axios.put(`http://localhost:5000/accessoire/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('L\'accessoire a été mis à jour avec succès.');
            setErrorMessage('');
            navigate('/accessoire');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'accessoire:', error);
            setErrorMessage('Erreur lors de la mise à jour de l\'accessoire.');
            setSuccessMessage('');
        }
    };

    const handleAddImage = (e) => {
        const newImages = Array.from(e.target.files);
        setNouvellesImages((prevImages) => [...prevImages, ...newImages]);
        setImageAccessoire((prevImages) => [...prevImages, ...newImages]);
    };

    const handleDeleteImage = async (index, imageId) => {
        Swal.fire({
            title: 'Voulez-vous supprimer cet image?',
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
                const updatedImagesExistantes = [...imagesExistantes];
                updatedImagesExistantes[index].isVisible = false; // Hide the image
                setImagesExistantes(updatedImagesExistantes);

                try {
                    await axios.delete(`http://localhost:5000/image/${imageId}`);
                    console.log('Image supprimée avec succès');
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'image:', error);
                }
              Swal.fire('Supprimé!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire("L'image n'a pas étè supprimé", '', 'info')
            }
        })
    };

    return (
      <div className="big-div">
        <Navbar/>
        <MDBContainer className="p-3 my-5 d-flex flex-column justify-content-center align-items-center" id="ModificationRobeContainer">
          <h1 className="h1 mb-5">Modification de la robe</h1>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="w-75 ">
            <MDBInput
              className="mb-4"
              label="Nom de l'accessoire"
              value={nomAccessoire}
              onChange={(e) => setNomAccessoire(e.target.value)}
            />
            <MDBInput
              className="mb-4"
              label="Description de l'accessoire"
              value={descriptionAccessoire}
              onChange={(e) => setDescriptionAccessoire(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleAddImage} multiple />

            {/* Prévisualisation des nouvelles images */}
            <div className="images-existantes" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {nouvellesImages.map((image, index) => (
                <div key={index} style={{ margin: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={URL.createObjectURL(image)} alt={`Nouvelle image ${index}`} style={{ width: '10rem', height: '10rem', objectFit: 'cover', marginBottom: '0.5rem' }} />
                  </div>
                </div>
              ))}
            </div>

            <MDBBtn type="submit" color="dark" className="mb-4">Changer</MDBBtn>
          </form>

          <div className="images-existantes" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {imagesExistantes.map((image, index) => (
              image.isVisible && ( // Only render the image if isVisible is true
                <div key={index} style={{ margin: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={image.imageUrl} alt={`Image existante ${index}`} style={{ width: '10rem', height: '10rem', objectFit: 'cover', marginBottom: '0.5rem' }} />
                    <MDBBtn color="danger" size="sm" onClick={() => handleDeleteImage(index, image.imageId)}>Supprimer</MDBBtn>
                  </div>
                </div>
              )
            ))}
          </div>
        </MDBContainer>
        <Footer />
      </div>
    );
};

export default ModificationAccessoire;
