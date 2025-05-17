import React, { useState } from 'react';
import './Cards.css';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

function AccessoireCards({id, src, title, alt, description, carouselImages}) {
    const modalId = `Modal${id}`;
    const carouselId = `Carousel${id}`;
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div className='col'>
            <div 
                className={`product-card accessory-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="product-card-image">
                    <a 
                        role="button" 
                        className="lightbox" 
                        data-bs-toggle="modal" 
                        data-bs-target={`#${modalId}`}
                    >
                        <ImageWithFallback src={src} className='card-img-top' alt={alt} />
                        <div className="product-overlay">
                            <span className="view-details">Voir plus</span>
                        </div>
                    </a>
                </div>
                
                <div className="product-card-body">
                    <h3 className="product-title">{title}</h3>
                    {description && <div className="product-description">{description}</div>}
                </div>
            </div>

            {/* Modal with carousel */}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${modalId}Label`}>{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div id={carouselId} className="carousel slide">
                                <div className="carousel-indicators">
                                    {carouselImages.map((_, index) => (
                                        <button 
                                            key={index}
                                            type="button" 
                                            data-bs-target={`#${carouselId}`} 
                                            data-bs-slide-to={index} 
                                            className={index === 0 ? 'active' : ''}
                                            aria-current={index === 0 ? 'true' : 'false'}
                                            aria-label={`Slide ${index + 1}`}>
                                        </button>
                                    ))}
                                </div>
                                <div className="carousel-inner">
                                    {carouselImages.map((carouselImage, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <ImageWithFallback 
                                                src={carouselImage} 
                                                className="carousel_img d-block w-100" 
                                                alt={`${alt} - vue ${index + 1}`} 
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Précédent</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Suivant</span>
                                </button>
                            </div>
                            
                            <div className="product-modal-details">
                                <h4>{title}</h4>
                                {description && <p className="product-description">{description}</p>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" data-bs-dismiss="modal">Fermer</button>
                            <button type="button" className="btn btn-primary">Contacter pour réserver</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccessoireCards;