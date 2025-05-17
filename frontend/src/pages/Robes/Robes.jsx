import React, { useEffect, useState } from 'react';
import './Robes.css'
import Footer from '../../components/Footer/Footer';
import Navbar from "../../components/Navbar/Navbar";
import RobeCardsGallery from '../../components/Cards-gallery/Robe_Cards_gallery';
import axios from 'axios';
import { getFullApiUrl } from '../../utils/apiUtils';

function Robes() {
  const [robeData, setRobeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    categorie: 'all',
    couleur: 'all'
  });
  
  useEffect(() => {
    // Fetch data from the server
    setIsLoading(true);
    axios.get('http://localhost:5000/robes')
      .then((response) => {
        // Handle the response data
        setRobeData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // Get unique categories and colors for filters
  const categories = [...new Set(robeData.filter(robe => robe.categorie).map(robe => robe.categorie))];
  const colors = [...new Set(robeData.filter(robe => robe.couleur).map(robe => robe.couleur))];

  // Filter robes based on selected filters
  const filteredRobes = robeData.filter(robe => {
    return (filters.categorie === 'all' || robe.categorie === filters.categorie) &&
           (filters.couleur === 'all' || robe.couleur === filters.couleur);
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className='page-container'>
      <Navbar/>
      <div className="product-page-container">
        <div className="product-hero">
          <div className="product-hero-content">
            <h1>Robes Traditionnelles</h1>
            <p>Découvrez notre collection exclusive de robes traditionnelles maghrebines, alliant élégance et authenticité pour vos événements spéciaux.</p>
          </div>
        </div>
        
        <div className="container">
          <div className="filter-section">
            <div className="filter-group">
              <label>Catégorie</label>
              <select 
                onChange={(e) => handleFilterChange('categorie', e.target.value)}
                value={filters.categorie}
              >
                <option value="all">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Couleur</label>
              <select 
                onChange={(e) => handleFilterChange('couleur', e.target.value)}
                value={filters.couleur}
              >
                <option value="all">Toutes les couleurs</option>
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Chargement de notre collection...</p>
            </div>
          ) : (
            <>
              <p className="results-count">{filteredRobes.length} robe(s) trouvée(s)</p>
              <RobeCardsGallery robes={filteredRobes} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Robes

