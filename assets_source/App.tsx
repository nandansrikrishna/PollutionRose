import React, { useState } from 'react'
import Header from './components/Header.tsx'
import Inputs from './components/Inputs.tsx'
import Rose from './components/Rose.tsx'
import './App.css'



const App: React.FC = () => {

  const [showRose, setShowRose] = useState(false);

  const handleShowRose = () => {
    setShowRose(true);
  };

  return (
    <>
    <Header />
    <Inputs propState={handleShowRose} />
    {showRose && <Rose />}
    </>
  );
};

export default App