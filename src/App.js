import React from 'react';
import './App.css';
import PagesAccueil from './pages/PagesAccueil';
import PagesConnexion from "./pages/PagesConnexion";
import PagesCreation from './pages/PagesCreation';
import PagesEtudiant from './pages/PagesEtudiant';
import PagesEmployeur from "./pages/PagesEmployeur";
import PagesStageEmployeur from "./pages/PagesStageEmployeur"
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom"
function App() {
  
  return (
    <div className="App">
      <Router>
        
          <main>
            <Routes>
              <Route path='/' element={<PagesAccueil />} />
                
              <Route path="/etudiant" element={<PagesEtudiant />} />
              <Route path="/employeur" element={<PagesEmployeur />} />
              <Route path='/connexion' element={<PagesConnexion />} />
              <Route path='/creation' element={<PagesCreation />} />
              <Route path='/employeur/:stageId' element={<PagesStageEmployeur />} />
            </Routes>


          </main>
          

      </Router>
    </div>
  );
}

export default App;
