import React, { useEffect, useState } from 'react';
import './Accessoires.css'
import Footer from '../../components/Footer/Footer';
import AccessoireCardsGallery from '../../components/Cards-gallery/Accessoire_Cards_gallery';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar";
import { getFullApiUrl } from '../../utils/apiUtils';
let imagesArray = [];

function Accessoires() {
  const [accessoiresData, setAccessoiresData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    axios.get('http://localhost:5000/accessoires') // Make a GET request to '/accessoires'
      .then((response) => {
        // Handle the response data
        setAccessoiresData(response.data);        // Update imagesArray
        imagesArray = response.data.map((accessory) => ({
          id: accessory.accessoire_id,
          src: accessory.images && accessory.images.length > 0 ? getFullApiUrl(accessory.images[0].imageUrl) : '',
          title: accessory.name,
          alt: accessory.name,
          description: accessory.description,
          carouselImages: accessory.images ? accessory.images.map((image) => getFullApiUrl(image.imageUrl)) : [],
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
                <h2>Accessoires</h2>
                <p>Découvrez nos accessoires élégant et traditionnelles</p>
        </div>
        <AccessoireCardsGallery images={imagesArray}/>
        <Footer />
    </div>
  )
}

export default Accessoires