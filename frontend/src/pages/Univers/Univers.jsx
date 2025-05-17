import React from "react";
import './Univers.css';
import Footer from "../../components/Footer/Footer";
import ImgHistoire from '../../assets/photo_1_acceuil.jpeg';
import ImgMission from '../../assets/photo_2_acceuil.jpeg';
import Navbar from "../../components/Navbar/Navbar";


function Univers() {
    return (
        <div className="container-fluid">
            <Navbar/>
            <div className="notre-mission">
                <div className="image-mission">
                    <img src={ImgMission} alt="robe d'acceuil" />
                </div>
                <div className="texte-mission">
                    <h1>Notre mission</h1>
                    <p>Notre maison de location de robes traditionnelles a pour mission de célébrer et préserver la richesse culturelle à travers des tenues élégantes. Nous offrons une expérience authentique en mettant à disposition une collection variée de robes traditionnelles, des tenues ancestrales aux costumes régionaux. Notre objectif est de permettre à chacun de revêtir 
                        les splendeurs du patrimoine, créant ainsi des moments inoubliables et encourageant la fierté des traditions culturelles. En embrassant l'élégance intemporelle, nous créons une passerelle entre le passé et le présent.</p>
                </div>
            </div>
            <div className="notre-histoire">
            <div className="texte-histoire">
                    <h1>Notre histoire</h1>
                    <p>Le nom "Dar Beya" tire son inspiration de l'héritage précieux de ma grand-mère, Beya. Durant mon enfance, lors de mes visites chez elle, j'étais émerveillée par la splendeur de ses nombreuses robes traditionnelles, véritables œuvres d'art. Ces moments passés à contempler ses tenues exquises ont laissé une empreinte profonde en moi, imprégnant l'idée que la beauté et la richesse culturelle peuvent être transmises à travers les générations. Ainsi, en honorant le nom "Dar Beya," nous rendons hommage à ma grand-mère et à sa maison où j'ai découvert la fascination pour la diversité des robes traditionnelles. "Dar," signifiant maison, incarne l'idée que notre espace est dédié à la préservation et à la célébration de ces trésors culturels, perpétuant l'héritage de beauté et d'élégance.</p>
                </div>
                <div className="image-histoire">
                    <img src={ImgHistoire} alt="robe d'acceuil" />
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default Univers;
