
import React, { useEffect, useState } from 'react';
import './Robes.css'
import Footer from '../../components/Footer/Footer';
import Navbar from "../../components/Navbar/Navbar";
import Robe_Cards_gallery from '../../components/Cards-gallery/Robe_Cards_gallery';
import axios from 'axios';
import { getFullApiUrl } from '../../utils/apiUtils';
let imagesArray = [];



function Robes() {
  const [robeData, setRobeData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    axios.get('http://localhost:5000/robes') // Make a GET request to '/robes'
      .then((response) => {
        // Handle the response data
        setRobeData(response.data);        // Update imagesArray
        imagesArray = response.data.map((robe) => ({
          id: robe.robe_id,
          src: robe.images && robe.images.length > 0 ? getFullApiUrl(robe.images[0].imageUrl) : '',
          title: robe.nom,
          alt: robe.nom,
          couleur: robe.couleur,
          categorie: robe.categorie,

          carouselImages: robe.images ? robe.images.map((image) => getFullApiUrl(image.imageUrl)) : [],
        }));
      })

      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className='container-fluid'>
      <Navbar/>
      <div className="heading text-center">
                <h2>Robes</h2>
                <p>Découvrez nos magnifiques robes élégantes et traditionnelles</p>
        </div>
        <Robe_Cards_gallery robes={robeData}/>
        <Footer />
    </div>
  )
}

export default Robes

