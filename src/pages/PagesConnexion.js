import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PagesEmployeur from "./PagesEmployeur";
import Navigateur from "../components/Navigateur";
import "./PageConnexion.css"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PagesConnexion() {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    courriel: "",
    motDePasse: "",
    role: "etudiant",
  });
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleSubmit = async (e) => {
    setLoading(true);
    if (formData.courriel === "" || formData.motDePasse === "") {
      toast.error("Veuillez remplir le formulaire !");
      setLoading(false);
      return;
    }

    else {
      if (formData.role === "etudiant") {
        fetch(process.env.REACT_APP_BACKEND_URL +"/etudiants/" + formData.courriel.trim()).then(response => response.json()).then(etudiant => {
            console.log(etudiant);
            if (etudiant.etu.motDePasse === formData.motDePasse.trim()) {
              navigate('/etudiant');
              setLoading(false);
              
            } else {
              toast.error("Le courriel ou le mot de passe est invalide !");
              setLoading(false);
              return;
            }
           })
          .catch(error => {
            console.log(error);
            toast.error("Le courriel ou le mot de passe est invalide !");
            setLoading(false);
            return;
          });
      } else if (formData.role === "employeur") {
        fetch(process.env.REACT_APP_BACKEND_URL +"/employeurs/" +formData.courriel.trim())
          .then((response) => response.json())
          .then((employeur) => {
            console.log(employeur);
            if (employeur.emp.motDePasse === formData.motDePasse.trim()) {
              navigate("/employeur", { state: { employeur: employeur } });
              setLoading(false);

            } else {
              toast.error("Le courriel ou le mot de passe est invalide !");
              setLoading(false);

              return;
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Le courriel ou le mot de passe est invalide !");
            setLoading(false);

            return;
          });
      }
    }
  };

  return (
    <div>
      <Navigateur />

      <div className="connexion">
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
                checked={formData.role === "etudiant"}
                onChange={handleInputChange}
              />
              Étudiant
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="employeur"
                checked={formData.role === "employeur"}
                onChange={handleInputChange}
              />
              Employeur
            </label>
          </div>
          <button type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? (
              <div className="loader"></div>
            ) : (
              "Connexion"
            )}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default PagesConnexion;
