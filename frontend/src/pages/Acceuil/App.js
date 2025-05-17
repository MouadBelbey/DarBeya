import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import ImgAcceuil from '../../assets/image-acceuil.jpeg';
import ImgAcceuil1 from '../../assets/photo_1_acceuil.jpeg';
import ImgAcceuil2 from '../../assets/photo_2_acceuil.jpeg';
import ImgAcceuil3 from '../../assets/photo_3_acceuil.jpeg';
import ImgAcceuil4 from '../../assets/photo_4_acceuil.jpeg';
import { AuthProvider } from '../Login/AuthContext';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation au chargement
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AuthProvider>
      <div className='container-fluid'>
        <NavBar />
        
        {/* Hero section */}
        <section className='hero-section'>
          <div className='hero-content'>
            <h1 className={`fade-in ${isVisible ? 'visible' : ''}`}>
              Élégance Traditionnelle Maghrebine
            </h1>
            <p className={`subtitle fade-in ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.3s'}}>
              Découvrez notre collection exclusive de robes et accessoires pour vos événements spéciaux
            </p>
            <div className={`hero-buttons fade-in ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.6s'}}>
              <Link to="/robes" className="btn-primary">Voir les Robes</Link>
              <Link to="/accessoire" className="btn-outline">Découvrir les Accessoires</Link>
            </div>
          </div>
          <div className='hero-image'>
            <img src={ImgAcceuil} alt="Robe traditionnelle maghrebine" />
          </div>
        </section>
        
        {/* Introduction section */}
        <section className='intro-section'>
          <div className='container'>
            <div className='section-header'>
              <h2>Bienvenue chez DarBeya</h2>
              <div className="decorative-line"></div>
            </div>
            <p className='intro-text'>
              Votre destination ultime pour l'élégance traditionnelle et l'éclat culturel lors
              de vos événements les plus spéciaux. Plongez dans notre vaste collection de tenues traditionnelles
              soigneusement sélectionnées, parfaites pour des mariages, des festivals culturels ou toute occasion où
              vous souhaitez briller avec distinction.
            </p>
          </div>
        </section>
        
        {/* Gallery section */}
        <section className='gallery-section'>
          <div className='container'>
            <div className='gallery-grid'>
              <div className='gallery-item item-1'>
                <img src={ImgAcceuil1} alt='Robe traditionnelle 1' />
                <div className='gallery-overlay'>
                  <h3>Collection Mariage</h3>
                </div>
              </div>
              <div className='gallery-item item-2'>
                <img src={ImgAcceuil2} alt='Robe traditionnelle 2' />
                <div className='gallery-overlay'>
                  <h3>Collection Soirée</h3>
                </div>
              </div>
              <div className='gallery-item item-3'>
                <img src={ImgAcceuil3} alt='Robe traditionnelle 3' />
                <div className='gallery-overlay'>
                  <h3>Collection Henné</h3>
                </div>
              </div>
              <div className='gallery-item item-4'>
                <img src={ImgAcceuil4} alt='Robe traditionnelle 4' />
                <div className='gallery-overlay'>
                  <h3>Collection Cérémonie</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className='cta-section'>
          <div className='container'>
            <h2>Une Expérience Unique Pour Vos Événements</h2>
            <p>
              Que vous recherchiez une robe de mariée exquise, une tenue traditionnelle pour une cérémonie religieuse ou
              simplement une robe éblouissante pour célébrer votre héritage, notre assortiment varié saura répondre à
              tous vos besoins. Chaque pièce est choisie pour sa qualité artisanale, sa beauté intemporelle et sa
              représentation authentique.
            </p>
            <Link to="/contact" className="btn-primary">Contactez-nous</Link>
          </div>
        </section>
        
        <Footer />
      </div>
     </AuthProvider>
  );
}

export default App;
