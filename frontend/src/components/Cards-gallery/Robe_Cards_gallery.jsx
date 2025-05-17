import React from 'react';
import RobeCards from '../Cards/RobeCards';
import './Cards_gallery.css';
import { getFullApiUrl } from '../../utils/apiUtils';

const RobeCardsGallery = ({ robes }) => {
  // Check if there are no robes or robes is undefined
  if (!robes || robes.length === 0) {
    return (
      <div className="empty-results">
        <h3>Aucune robe trouvée</h3>
        <p>Essayez de modifier vos filtres ou revenez plus tard pour découvrir nos nouvelles collections.</p>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      <div className="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {robes.map((robe, index) => (
          <div key={robe.robe_id} className="fade-in-card" style={{animationDelay: `${index * 0.1}s`}}>
            <RobeCards
              id={robe.robe_id}
              src={robe.images && robe.images.length > 0 ? getFullApiUrl(robe.images[0].imageUrl) : ''}
              title={robe.nom}
              alt={robe.nom}
              couleur={robe.couleur}
              categorie={robe.categorie}
              carouselImages={robe.images ? robe.images.map((image) => getFullApiUrl(image.imageUrl)) : []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RobeCardsGallery;

/*
{robes.map(robe => (
    <Cards
        id={robe.robe_id}
        src={robe.images[0].imageUrl}
        title={robe.nom}
        alt={robe.nom}
        couleur = {robe.couleur}
        categorie={robe.categorie}
        carouselImages={robe.images.map((image) => image.imageUrl)}
    />

))}
*/
