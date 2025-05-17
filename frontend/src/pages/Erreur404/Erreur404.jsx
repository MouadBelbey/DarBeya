import React from 'react'
import { Link } from "react-router-dom";
import './Erreur404.css';
import Footer from '../../components/Footer/Footer';
import NavBar from "../../components/Navbar/Navbar";

export default function Erreur404() {
    return(
        <div className="container-fluid404">
            <div className="NavBar-container404"><NavBar/></div>
            <div className="messageErreur">
                <h1>Erreur 404</h1>
                <h2>Page introuvable</h2>
                <p>Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Veuillez vérifier l'URL ou
                    retourner à la page d'accueil.</p>
                <br/>
                <Link to={"/"}>
                    <button type="button" className="btn btn-outline-dark">Retourner à la page d'acceuil</button>
                </Link>
            </div>
            <div className="Footer-container404"><Footer/></div>
        </div>
    );
}
