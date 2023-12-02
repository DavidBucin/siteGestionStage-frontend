import React from "react";
import {useParams} from 'react-router-dom'


function PagesStageEmployeur (props) {

    
const { stageId } = useParams()
    console.log(stageId);
    return(
        <div>
            <button type="button" className="btn btn-danger">Danger</button>
        </div>
    )
}
export default PagesStageEmployeur;