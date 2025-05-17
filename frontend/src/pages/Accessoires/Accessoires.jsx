import React, { useEffect, useState } from 'react';
import './Accessoires.css'
import Footer from '../../components/Footer/Footer';
import AccessoireCardsGallery from '../../components/Cards-gallery/Accessoire_Cards_gallery';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar";
import { getFullApiUrl } from '../../utils/apiUtils';

function Accessoires() {
  const [accessoiresData, setAccessoiresData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all'
  });
  
  useEffect(() => {
    // Fetch data from the server
    setIsLoading(true);
    axios.get('http://localhost:5000/accessoires')
      .then((response) => {
        setAccessoiresData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // Process data for gallery display
  const accessoiresGalleryData = accessoiresData.map((accessory) => ({
    id: accessory.accessoire_id,
    src: accessory.images && accessory.images.length > 0 ? getFullApiUrl(accessory.images[0].imageUrl) : '',
    title: accessory.name,
    alt: accessory.name,
    description: accessory.description,
    carouselImages: accessory.images ? accessory.images.map((image) => getFullApiUrl(image.imageUrl)) : [],
  }));

  // Get unique types for filter
  const types = [...new Set(accessoiresData
    .filter(accessory => accessory.description)
    .map(accessory => accessory.description))];

  // Filter accessories based on selected filters
  const filteredAccessoires = accessoiresGalleryData.filter(accessory => {
    return (filters.type === 'all' || accessory.description === filters.type);
  });

  const handleFilterChange = (value) => {
    setFilters({
      type: value
    });
  };

  return (
    <div className='page-container'>
      <Navbar/>
      <div className="product-page-container">
        <div className="product-hero accessory-hero">
          <div className="product-hero-content">
            <h1>Accessoires Traditionnels</h1>
            <p>Complétez votre tenue avec notre sélection d'accessoires magnifiques et authentiques pour sublimer votre look.</p>
          </div>
        </div>
        
        <div className="container">
          <div className="filter-section">
            <div className="filter-group">
              <label>Type</label>
              <select 
                onChange={(e) => handleFilterChange(e.target.value)}
                value={filters.type}
              >
                <option value="all">Tous les types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Chargement de nos accessoires...</p>
            </div>
          ) : (
            <>
              <p className="results-count">{filteredAccessoires.length} accessoire(s) trouvé(s)</p>
              <AccessoireCardsGallery images={filteredAccessoires} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Accessoires