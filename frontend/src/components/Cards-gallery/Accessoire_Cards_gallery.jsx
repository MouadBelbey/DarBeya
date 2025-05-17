import React from 'react';
import AccessoireCards from '../Cards/AccessoireCards';
import './Cards_gallery.css';

const AccessoireCardsGallery = ({ images }) => {
  // Check if there are no accessories or images is undefined
  if (!images || images.length === 0) {
    return (
      <div className="empty-results">
        <h3>Aucun accessoire trouvé</h3>
        <p>Essayez de modifier vos filtres ou revenez plus tard pour découvrir nos nouvelles collections d'accessoires.</p>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      <div className="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {images.map((image, index) => (
          <div key={image.id} className="fade-in-card" style={{animationDelay: `${index * 0.1}s`}}>
            <AccessoireCards
              id={image.id}
              src={image.src}
              title={image.title}
              alt={image.alt}
              description={image.description}
              carouselImages={image.carouselImages}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoireCardsGallery;

