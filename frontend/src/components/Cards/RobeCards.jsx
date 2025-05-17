import React from 'react'
import './Cards.css'
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback'

function Cards({id, src, title, alt, description, couleur, categorie, carouselImages}) {
    const modalId = `Modal${id}`;
    const carouselId = `Carousel${id}`;
  return (
    <div className='col'>
            <div className="card border-0 transform-on-hover">
                <a role="button" className="lightbox" data-bs-toggle="modal" data-bs-target={`#${modalId}`}><ImageWithFallback src={src} className='card-img-top' alt={alt} /></a>
                <div className="card-body">
                    <h6>{title}</h6>
                    <p className="text-muted card-text">{description}</p>
                    <div class="affichage-robe">
                        <p className="text-muted card-text">Couleur: {couleur}</p>
                        <p className="text-muted card-text">Catégorie: {categorie}</p>
                   </div>

                </div>
            </div>
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header" data-bs-theme="dark">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={carouselId} className="carousel slide">
                    <div className="carousel-inner">                    {carouselImages.map((carouselImage, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <ImageWithFallback src={carouselImage} className="carousel_img d-block w-100" alt={alt} />
                  </div>
                ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Cards