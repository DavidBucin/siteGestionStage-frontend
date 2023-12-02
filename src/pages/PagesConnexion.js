import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PagesEmployeur from './PagesEmployeur';

function PagesConnexion() {
 
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
       courriel: '', 
       motDePasse: '', 
       role:"etudiant"
      });
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      
      if (formData.courriel === '' || formData.motDePasse === '') {
        alert('Remplir le formulaire svp');
        return;
      } 
      else {
          
        if (formData.role === 'etudiant') {
          fetch('https://gestion-stage-exe7.onrender.com/api/etudiants/' + formData.courriel.trim()).then(response => response.json()).then(etudiant => {
            console.log(etudiant);
            if (etudiant.etu.motDePasse === formData.motDePasse.trim()) {
              navigate('/etudiant');
            } else {
              alert("courriel ou mot de passe invalide");
              return;
            }
           })
          .catch(error => {
            console.log(error);
            alert("courriel ou mot de passe invalide");
            return;
          });
        } else if (formData.role === 'employeur') {
          fetch('https://gestion-stage-exe7.onrender.com/api/employeurs/' + formData.courriel.trim()).then(response => response.json()).then(employeur => {
            console.log(employeur);
            if (employeur.emp.motDePasse === formData.motDePasse.trim()) {
              navigate('/employeur', { state: {employeur: employeur} });
            } else {
              alert("courriel ou mot de passe invalide");
              return;
            }
           })
          .catch(error => {
            console.log(error);
            alert("courriel ou mot de passe invalide");
            return;
          });
        }
      }   
    }

  return (
      <div>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="courriel"
            placeholder="Adresse courriel"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="motDePasse"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div>
            <label>
              <input
                
                type="radio"
                name="role"
                value="etudiant"
                checked={formData.role === 'etudiant'}
                onChange={handleInputChange}
              />
              Etudiant
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="employeur"
                checked={formData.role === 'employeur'}
                onChange={handleInputChange}
              />
              Employeur
            </label>
          </div>
          <button type="button" onClick={handleSubmit}>Connexion</button>
        </form>
      </div>
  );
}
    
    
  

export default PagesConnexion;
