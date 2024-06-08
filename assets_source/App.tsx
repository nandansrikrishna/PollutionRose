import React, { useState } from 'react'
import Header from './components/Header.tsx'
import Inputs from './components/Inputs.tsx'
import Rose from './components/Rose.tsx'
import './App.css'



const App: React.FC = () => {
  const ENDPOINT_URL = "";

  interface BackendResponse {
    success: boolean;
    message: Record<string, unknown>;
  }

  const requestFromBackend = async (jsonData: Record<string, unknown>) : Promise<BackendResponse> => {
    try {
      const msg = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //other headers
        },
        body: JSON.stringify(jsonData),
      }
      const response = await fetch(ENDPOINT_URL, msg);
      if (!response.ok){
        throw new Error('Failed to send data to the backend');
      }

      // handle response
      const responseData = await response.json();
      return responseData as BackendResponse;

    } catch (error) {
      alert("error sending data to backend");
      return { success: false, message: {} };
    }
  };

  const [showRose, setShowRose] = useState(false);
  const [inputsJSON, setInputsJSON] = useState({})

  const handleShowRose = (updatedJSON : Record<string, unknown>) => {
    setInputsJSON(updatedJSON);
    // GET ROSE IMG FROM BACKEND //
    const response = requestFromBackend(inputsJSON);
    
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