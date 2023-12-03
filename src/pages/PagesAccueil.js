import React, { useEffect, useState } from "react";
import "./PageAccueil.css";
import video from "../videos/video.mp4";
import Navigateur from "../components/Navigateur";

const PagesAccueil = () => {
  

  return (
    <div>
      <body>
        <video src={video} autoPlay loop playsInline muted></video>

        <Navigateur />

        <header>
          <h1>Bienvenue dans le site de gestion de stage Montmorency !</h1>
        </header>
        <div className="description">
          <p>
            Voici mon site de gestion de stage. <br />
            J'espère que vous l'appréciez
          </p>
          <p className="copyright">Fait par David Bucin <br />Lien de la <a href="https://youtu.be/rDxmdKWxf2E?si=YZF2xq8Kbp1P6NOo">video</a></p>
          
        </div>
      </body>
    </div>
  );
};

export default PagesAccueil;
