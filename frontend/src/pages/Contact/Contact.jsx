import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { isValid, isAfter, parse } from 'date-fns';
import './Contact.css';
import Footer from '../../components/Footer/Footer';
import emailjs from '@emailjs/browser';
import Navbar from "../../components/Navbar/Navbar";
import {
  MDBInput,
  MDBBtn,
  MDBFile
}
from 'mdb-react-ui-kit';

function Contact() {
  const { handleSubmit, control, formState: { errors, isSubmitSuccessful }, reset, getValues } = useForm();

  const onSubmit = (data) => {
    

    const templateParams = {
      nom: data.nom,
      prenom: data.prenom,
      event_date: `${data.année}-${data.mois}-${data.jour}`, 
      to_email: data.email,
      to_numero: data.to_numero,
      to_disponibilite: data.to_disponibilite,
      to_nom_tenue: data.to_nom_tenue,
      
    };

    emailjs.send('service_ce02kgt', 'template_bdq57zo', templateParams, '1VpDW5WrlXanKo1uN')
      .then((response) => {
        console.log('E-mail envoyé avec succès !', response);
        reset();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      });
  }

  return (
    <div className="container-fluid">
        <Navbar/>
      <div className="container">
        <div className="message">
          <h3>Prendre RDV pour un essayage sur place</h3>
          <p>Merci de renseigner le formulaire ci-dessous. Nous prendrons contact avec vous dans les prochaines 24 heures afin de convenir d'un rendez-vous.</p>
          {isSubmitSuccessful && <p className="success-message error-message">Formulaire soumis avec succès ! Nous vous contacterons bientôt.</p>}
        </div>
        <form id='contactForm' onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <Controller
                name="nom"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Nom est obligatoire',
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                    message: 'Le nom ne doit pas contenir de chiffres ou de caractères spéciaux, et doit être inférieur à 30 lettres.',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Le nom ne doit pas dépasser 30 lettres.',
                  },
                }}
                render={({ field }) => (
                  <div>
                    <MDBInput type="text"
                      {...field}
                      type="text"
                      wrapperClass='mb-4'
                      className={`form-control ${errors.to_name ? 'is-invalid' : ''}`}
                      label="Nom"
                      onChange={field.onChange}
                    />
                    {errors.to_name && <span className="invalid-feedback">{errors.to_name.message}</span>}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Controller
                name="prenom"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Prénom est obligatoire',
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                    message: 'Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux, et doit être inférieur à 30 lettres.',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Le prénom ne doit pas dépasser 30 lettres.',
                  },
                }}
                render={({ field }) => (
                  <div>
                    <MDBInput
                      {...field}
                      type="text"
                      wrapperClass='mb-4'
                      className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                      label="Prénom"
                      onChange={field.onChange}
                    />
                    {errors.prenom && <span className="invalid-feedback">{errors.prenom.message}</span>}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Adresse e-mail est obligatoire',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Entrez une adresse e-mail valide.',
                  },
                }}
                render={({ field }) => (
                  <div>
                    <MDBInput
                      {...field}
                      wrapperClass='mb-4'
                      type="text"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      label="Adresse e-mail"
                    />
                    {errors.email && <span className="invalid-feedback">{errors.email.message}</span>}
                  </div>
                )}
              />
            </div>
            <div className="col">
              <Controller
                name="to_numero"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Numéro de téléphone est obligatoire',
                  pattern: {
                    value: /^[+]?(1-|1\s|1|\(\d{3}\)-|\(\d{3}\)\s|\d{3}-|\d{3}\s)?(\(\d{3}\)|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/,
                    message: 'Entrez un numéro de téléphone valide.',
                  },
                }}
                render={({ field }) => (
                  <div>
                    <MDBInput
                      wrapperClass='mb-4'
                      {...field}
                      type="tel"
                      className={`form-control ${errors.numero ? 'is-invalid' : ''}`}
                      label="Numéro de téléphone"
                    />
                    {errors.numero && <span className="invalid-feedback">{errors.numero.message}</span>}
                  </div>
                )}
              />
            </div>
          </div>
        
          <div className="row">
            <p>Date de l'événement</p>
            <div className="col">
              <Controller
                name="jour"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Jour est obligatoire',
                  pattern: {
                    value:/^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/,
                    message: 'Entrez une journée valide (1 à 31)',
                  },
                  maxLength: {
                    value: 2,
                    message: 'Le jour ne doit pas dépasser 2 chiffres.',
                  },
                }}
                render={({ field }) => (
                  <div>
                    <MDBInput
                      wrapperClass='mb-4'
                      {...field}
                      type="number"
                      className={`form-control ${errors.jour ? 'is-invalid' : ''}`}
                      label="JJ"
                    />
                    {errors.jour && <span className="invalid-feedback">{errors.jour.message}</span>}
                  </div>
                )}
              />
            </div>
            <div className="col">
              <Controller
                name="mois"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Mois est obligatoire',
                  pattern: {
                    value: /^(0[1-9]|1[0-2]|[1-9]|1[0-2])$/,
                    message: 'Entrez un mois valide (1 à 12)',
                  },
                  maxLength: {
                    value: 2,
                    message: 'Le mois ne doit pas dépasser 2 chiffres.',
                  },
                }}
                render={({ field }) => (
                  <div>
                    <MDBInput
                      wrapperClass='mb-4'
                      {...field}
                      type="number"
                      className={`form-control ${errors.mois ? 'is-invalid' : ''}`}
                      label="MM"
                    />
                    {errors.mois && <span className="invalid-feedback">{errors.mois.message}</span>}
                  </div>
                )}
              />
            </div>
            <div className="col">
              <Controller
                name="année"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Année est obligatoire',
                  pattern: {
                    value: /\b(20[2-9][0-9]|2100)\b/,
                    message: 'Entrez une année valide (AAAA)',
                  },
                  maxLength: {
                    value: 4,
                    message: 'L\'année ne doit pas dépasser 4 chiffres.',
                  },
                  validate: (value) => {
                    const day = Number(getValues('jour'));
                    const month = Number(getValues('mois'));
                    const year = Number(value);

                    const currentDate = new Date();
                    const selectedDate = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());

                    return (
                      isValid(selectedDate) &&
                      isAfter(selectedDate, currentDate)
                    );
                  },
                }}
                render={({ field }) => (
                  <div>
                    <MDBInput
                      wrapperClass='mb-4'
                      {...field}
                      type="number"
                      className={`form-control ${errors.année ? 'is-invalid' : ''}`}
                      label="AAAA"
                    />
                    {errors.année && <span className="invalid-feedback">{errors.année.message}</span>}
                    {errors.année && errors.année.type === 'validate' && (
                      <span className="invalid-feedback">Veuillez vérifier la validité de la date.</span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <label className="form-check-label" htmlFor="exampleRadios1">
            Essayage
          </label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Mariée" checked />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Mariée
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Invitée" />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Invitée
            </label>
          </div>
          <div className="form-group">
            <Controller
              name="to_nom_tenue"
              control={control}
              defaultValue=""
              rules={{ required: 'Ce champ est obligatoire' }} // Ajoutez cette ligne
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`form-control custom-textarea ${errors.to_nom_tenue ? 'is-invalid' : ''}`}
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Veuillez prendre note des noms des tenues et des bijoux que vous aimeriez porter, en fournissant des détails supplémentaires au besoin pour garantir une expérience vestimentaire parfaitement adaptée à vos préférences."
                />
              )}
            />
            {errors.to_nom_tenue && (
              <span className="invalid-feedback">{errors.to_nom_tenue.message}</span>
            )}
            <Controller
              name="to_disponibilite"
              control={control}
              defaultValue=""
              rules={{ required: 'Ce champ est obligatoire' }} // Ajoutez cette ligne
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`form-control custom-textarea ${errors.to_disponibilite ? 'is-invalid' : ''}`}
                  id="exampleFormControlTextarea2"
                  rows="3"
                  placeholder="Indiquez vos disponibilités (dates et heures)."
                />
              )}
            />
            {errors.to_disponibilite && (
              <span className="invalid-feedback">{errors.to_disponibilite.message}</span>
            )}
          </div>


          <button type="submit" className="btn btn-primary btn-lg btn-block">Confirmer</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
