import React, { useState, useEffect } from 'react';


import App from '../App';
import ListeStage from '../components/ListeStage';


const PagesEtudiant = () => {

    const [stageList, setStageList] = useState([]);
    useEffect(() => {
        // Fetch the list of stages from the backend when the component mounts
        const fetchStages = async () => {
          try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/stages/listeStage");
            if (response.ok) {
              const data = await response.json();
              setStageList(data.stage);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchStages();
      }, []);
return (
    <ListeStage stage={stageList} />
);
}
export default PagesEtudiant;