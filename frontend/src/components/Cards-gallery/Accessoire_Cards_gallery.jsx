import React from 'react'
import AccessoireCards from '../Cards/AccessoireCards'
import './Cards_gallery.css'
import { getFullApiUrl } from '../../utils/apiUtils'

const AccessoireCardsGallery = ({ images }) => {
  return (
        <>
            <div className="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                {images.map(image => (
                    <AccessoireCards
                        id={image.id}
                        src={image.src}
                        title={image.title}
                        alt={image.alt}
                        description={image.description}
                        carouselImages={image.carouselImages}
                    />

                ))}
            </div>

        </>
  )
}

export default AccessoireCardsGallery

