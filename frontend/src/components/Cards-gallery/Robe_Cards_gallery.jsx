import React from 'react'
import RobeCards from '../Cards/RobeCards'
import './Cards_gallery.css'
import { getFullApiUrl } from '../../utils/apiUtils'


const Robe_Cards_gallery = ({ robes }) => {
  return (
        <>
            <div className="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">               {robes.map(robe => (
                    <RobeCards
                        key={robe.robe_id}
                        id={robe.robe_id}
                        src={robe.images && robe.images.length > 0 ? getFullApiUrl(robe.images[0].imageUrl) : ''}
                        title={robe.nom}
                        alt={robe.nom}
                        couleur = {robe.couleur}
                        categorie={robe.categorie}
                        carouselImages={robe.images ? robe.images.map((image) => getFullApiUrl(image.imageUrl)) : []}
                    />
               ))}
        </div>
      </>
  )
}

export default Robe_Cards_gallery

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
