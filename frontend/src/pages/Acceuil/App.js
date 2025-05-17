import React, { useState } from 'react';
import './App.css';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/Navbar/Navbar';
import ImgAcceuil from '../../assets/image-acceuil.jpeg';
import ImgAcceuil1 from '../../assets/photo_1_acceuil.jpeg';
import ImgAcceuil2 from '../../assets/photo_2_acceuil.jpeg';
import ImgAcceuil3 from '../../assets/photo_3_acceuil.jpeg';
import ImgAcceuil4 from '../../assets/photo_4_acceuil.jpeg';
import { AuthProvider } from '../Login/AuthContext';

function App() {
  // const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  return (
    <AuthProvider>
      <div className='container-fluid'>
        <NavBar />
        <div className='titre-acceuil'>
          <h1>Bienvenue sur notre boutique en ligne !</h1>
          <p>Découvrez nos dernières collections de robes et accessoires</p>
        </div>
        <div className='image-acceuil'>
          <img src={ImgAcceuil} alt="robe d'acceuil" width="100%" height="100%" />
        </div>
        <div className='text-acceuil'>
          <p>Bienvenue chez DarBeya, votre destination ultime pour l'élégance traditionnelle et l'éclat culturel lors
            de vos événements les plus spéciaux. Plongez dans notre vaste collection de tenues traditionnelles
            soigneusement sélectionnées, parfaites pour des mariages, des festivals culturels ou toute occasion où
            vous souhaitez briller avec distinction. </p>
        </div>
        <div className="photos-acceuil-wrapper">
          <div className='photos-acceuil-container'>
            <div className='photo-acceuil'>
              <img src={ImgAcceuil1} alt='robe 1' width="100%" height="100%" />
            </div>
            <div className='photo-acceuil'>
              <img src={ImgAcceuil2} alt='robe 2' width="100%" height="100%" />
            </div>
            <div className='photo-acceuil'>
              <img src={ImgAcceuil3} alt='robe 3' width="100%" height="100%" />
            </div>
            <div className='photo-acceuil'>
              <img src={ImgAcceuil4} alt='robe 4' width="100%" height="100%" />
            </div>
          </div>
        </div>
        <div className='text-acceuil'>
          <p>Que vous recherchiez une robe de mariée exquise, une robe traditionnelle pour une cérémonie religieuse ou
            simplement une tenue éblouissante pour célébrer votre héritage, notre assortiment varié saura répondre à
            tous vos besoins. Chaque pièce est choisie pour sa qualité artisanale, sa beauté intemporelle et sa
            représentation authentique.</p>
        </div>
        <Footer />
      </div>
     </AuthProvider>
  );
}

export default App;
