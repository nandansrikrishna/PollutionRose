import React, { useState } from 'react'
import Header from './components/Header.tsx'
import Inputs from './components/Inputs.tsx'
import Rose from './components/Rose.tsx'
import './App.css'



const App: React.FC = () => {

  const [showRose, setShowRose] = useState(false);
  const [inputsJSON, setInputsJSON] = useState({})

  const handleShowRose = (updatedJSON : Record<string, unknown>) => {
    setInputsJSON(updatedJSON);
    // GET ROSE IMG FROM BACKEND //

    ///////////////////////////////
    setShowRose(true);
  };


  return (
    <>
    <Header />
    <Inputs propState={handleShowRose} />
    {showRose && <Rose inputsJSON={inputsJSON}/>}
    </>
  );
};

export default App