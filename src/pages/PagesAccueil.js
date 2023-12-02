import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const PagesAccueil = () => {
  return (
    <div>
      <h1>Bienvenue dans le site de gestion de stage Montmorency !</h1>
      <div>
        <NavLink to="/connexion"> Connexion</NavLink>
        
                       
                
      </div>
      <div>
        

        <NavLink to="/creation"> Creation</NavLink>        
      </div>
    </div>
  );
};

export default PagesAccueil;