import React from "react";
import Cards from "./card/Cards";
import Stage from "./Stage";

const ListeStage = (props) => {
    if (props.stage.length === 0) {
        return (
          <div className="stage-list aucun">
            <Cards>
              <h1>Aucun Stage pour l'instant</h1>
            </Cards>
          </div>
        );

    }else{
        return (
            <ul className="stage-list">
              {props.stage.map((stage) => (
                <Stage key={stage.compagnie} stage={stage} />
              ))}
            </ul>
          );

    }
}
export default ListeStage;