import React, { useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import Navigateur from "../components/Navigateur";




import "./PageCreation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PagesCreation() {
  const { error, sendRequest, clearError } = useHttpClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    courriel: "",
    motDePasse: "",
    prenom: "",
    nom: "",
    telephone: "",
    adresse: "",
    nomEntreprise: "",
    posteTel: "",
  });
  const [role, setRole] = useState("etudiant");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setRole(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isEmailValid = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const isPhoneValid = (telephone) => {
    return /^[0-9]{10}$/.test(telephone);
  };

  const isFormInvalid = () => {
    return (
      formData.courriel.trim() === "" ||
      formData.motDePasse.trim() === "" ||
      formData.prenom.trim() === "" ||
      formData.nom.trim() === "" ||
      formData.telephone.trim() === "" ||
      formData.adresse.trim() === "" ||
      (role === "employeur" &&
        (formData.nomEntreprise.trim() === "" ||
          formData.posteTel.trim() === ""))
    );
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/auth/checkAccount",
        {
          
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courriel: formData.courriel, role: role }),
        }
      );

      const result = await response.json();

      if (result.accountExists) {
        toast.error("Un compte avec cet email existe déjà !");
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false); // Reset loading on error
      console.error("Error checking account existence:", error);
      toast.error("Erreur lors de la vérification du compte !");
      return;
    }

    if (isFormInvalid()) {
      toast.error("Veuillez remplir le formulaire !");
      setLoading(false);
      return;
    }

    if (!isEmailValid(formData.courriel)) {
      toast.error("Veuillez entrer une adresse courriel valide !");
      setLoading(false);
      return;
    }

    if (!isPasswordValid(formData.motDePasse)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères !");
      setLoading(false);
      return;
    }

    if (!isPhoneValid(formData.telephone)) {
      toast.error("Veuillez entrer un numéro de téléphone valide !");
      setLoading(false);
      return;
    } else {
      if (role === "etudiant") {
        try {
          const reponse = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/etudiants/ajouterEtudiant",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          console.log(reponse);
        } catch (err) {
          setLoading(false); // Reset loading on error
          console.log("BIG" + err);
          throw err;
        }
      } else if (role === "employeur") {
        try {
          const reponse = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/employeurs/ajouterEmployeur",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          console.log(reponse);
        } catch (err) {
          setLoading(false); // Reset loading on error
          console.log(err);
          throw err;
        }
      }
    }

    setLoading(false); // Reset loading after successful account creation
    

    window.location.href = "/";
  };

  return (
    <div className="scrollable-page">
      <Navigateur />

      <div className="inscription">
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
          {role === "employeur" && (
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
                checked={role === "etudiant"}
                onChange={handleInputChange}
              />
              Étudiant
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="employeur"
                checked={role === "employeur"}
                onChange={handleInputChange}
              />
              Employeur
            </label>
          </div>
          <button type="button" onClick={handleButtonClick} disabled={loading}>
          {loading ? (
              <div className="loader"></div>
            ) : (
              "Créer le compte"
            )}
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
}

export default PagesCreation;
