import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from './card/Cards.js'
const Stage = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    navigate('/employeur/' + props.stage.id);
  }

return (
  <li className='cours-item'>
    <Cards className = "cours-item__content">
        <div>
            <h2>{"numero : " + props.stage.numContact}</h2>
            <h2>{"compagnie : " + props.stage.nomEntreprise}</h2>
            <h2>{"nom du poste : " + props.stage.nomPoste}</h2>

            <button type="button" onClick={handleSubmit}>Savoir plus</button>

        </div>

    </Cards>
    
  </li>  
);


};

export default Stage;

