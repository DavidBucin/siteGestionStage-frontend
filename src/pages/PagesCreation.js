import React, { useState } from 'react';
import { useHttpClient } from "../shared/hooks/http-hook";


function PagesCreation() {
  const {error, sendRequest, clearError } = useHttpClient();
  const [formData, setFormData] = useState({
    courriel: '',
    motDePasse: '',
    prenom: '',
    nom: '',
    telephone: '',
    adresse: '',
    nomEntreprise: '',
    posteTel: ''
  });
  const [role, setRole] = useState(
    'etudiant'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role') {
      setRole(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateEmail = (email) => {
    // Check if email is a valid email address
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const isFormInvalid = () => {
    return (
      formData.courriel.trim() === '' || 
      formData.motDePasse.trim() === '' || 
      formData.prenom.trim() === '' || 
      formData.nom.trim() === '' || 
      formData.telephone.trim() === '' || 
      formData.adresse.trim() === '' ||
      (role === 'employeur' && 
      (formData.nomEntreprise.trim() === '' || 
      formData.posteTel.trim() === ''))
    );
  };

  const handleButtonClick = async (event) =>  {
    event.preventDefault();
    // Check if any inputs are empty
    if (isFormInvalid()) {
      alert('Remplir le formulaire svp');
      return;
    }  
  
    if (role === 'etudiant') {
      try {
        const reponse = await fetch("https://gestion-stage-exe7.onrender.com/api/etudiants/ajouterEtudiant", {
          method: 'POST',                                          
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),

        });
      console.log(reponse);
      } catch (err) {
        console.log(err);
        throw err
      }
    } else if (role === 'employeur') {
      try {
        const reponse = await fetch("https://gestion-stage-exe7.onrender.com/api/employeurs/ajouterEmployeur", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),

        });
      console.log(reponse);
      } catch (err) {
        console.log(err);
        throw err
      }
    }

    window.location.href = '/';

  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <form>
        <input
          type="email"
          name="courriel"
          placeholder="Adresse courriel"
          value={formData.courriel}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="motDePasse"
          placeholder="Mot de passe"
          value={formData.motDePasse}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telephone"
          placeholder="Téléphone"
          value={formData.telephone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="adresse"
          placeholder="Adresse complète"
          value={formData.adresse}
          onChange={handleInputChange}
        />
        {role === 'employeur' && (
          <>
            <input
              type="text"
              name="nomEntreprise"
              placeholder="Nom de l'entreprise"
              value={formData.nomEntreprise}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="posteTel"
              placeholder="Numéro de poste"
              value={formData.posteTel}
              onChange={handleInputChange}
            />
          </>
        )}
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="etudiant"
              checked={role === 'etudiant'}
              onChange={handleInputChange}
            />
            Etudiant
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="employeur"
              checked={role === 'employeur'}
              onChange={handleInputChange}
            />
            Employeur
          </label>
        </div>
        <button type="button" onClick={handleButtonClick}>Soumettre</button>
      </form>
    </div>
  );
}

export default PagesCreation;
