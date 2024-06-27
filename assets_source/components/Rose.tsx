import React, { useEffect, useState } from 'react';

interface Sensor {
  id: number;
  name: string;
}

interface Pollutant {
  name: string;
}

interface RoseProps {
  inputsJSON: Record<string, unknown>;
  fetchResponse: Record<string, unknown>;
}

const Rose: React.FC<RoseProps> = ({ inputsJSON, fetchResponse }) => {
  
  // State variables
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [sensorPollutants, setSensorPollutants] = useState<Pollutant[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<number>(-1);
  const [showPollution, setShowPollution] = useState(false);

  // Fetch the list of sensors
  const getSensorList = async () => {
    
    // Replace with actual API call !!! //
    const sensorList: Sensor[] = [
      { id: 1, name: 'Sensor A' },
      { id: 2, name: 'Sensor B' },
    ];
    //////////////////////////////////////

    setSensors(sensorList);
  };

  // Fetch the list of pollutants for a given sensor
  const getPollutantList = async (sensorID: number) => {
    
    // Replace with actual API call //////
    var pollutantList: Pollutant[];
    if(selectedSensor === 2){
      pollutantList = [
        { name: 'Pollutant 2' },
        { name: 'Pollutant 3' },
        { name: 'Pollutant 4' }
      ];
    }
    else {
      pollutantList = [
        { name: 'Pollutant 1' },
        { name: 'Pollutant 2' },
      ];
    }
    //////////////////////////////////////

    setSensorPollutants(pollutantList);
  };

  const handleShowPollution = () => {
    setShowPollution(!showPollution);
  }
  

  // Fetch sensor info when Rose is first loaded
  useEffect(() => {
    getSensorList();
    getPollutantList(selectedSensor);
  }, []);

  // Fetch pollutants whenever a new Sensor is selected 
  useEffect(() => {
    if (selectedSensor !== -1) {
      getPollutantList(selectedSensor);
    }
  }, [selectedSensor]);

  return (
    <>
      <div id="chartDiv" className="rose">
        <div className='infobar'>
          <ul>
            <li>
                <input type="checkbox" id='toggle_switch' onChange={handleShowPollution}/>
                <label htmlFor='toggle_switch'></label>
                <span className='toggle-text'>Rose Type</span>
            </li>
            {showPollution && (            
              <li>
                <h4>Select Sensor</h4>
                <select onChange={(e) => setSelectedSensor(Number(e.target.value))}>
                  {sensors.map(sensor => (
                    <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
                  ))}
                </select>
              </li>
            )}
            {showPollution && (
              <li>
                <h4>Select Pollutant</h4>
                <select>
                  {sensorPollutants.map((pollutant, index) => (
                    <option key={index} value={pollutant.name}>{pollutant.name}</option>
                  ))}
                </select>
              </li>
            )}
            <li><h4>{showPollution ? "Displaying Pollution Rose" : "Displaying Wind Rose"}</h4></li>
          </ul>
        </div>
        <div className='container'>
          {JSON.stringify(fetchResponse, null, 2)}
        </div>
      </div>
    </>
  );
}

export default Rose;



////////////////////////////////////////////////////




/*import React, { useState } from 'react'

const Rose: React.FC<{inputsJSON: Record<string, unknown>}> = ({inputsJSON}) => {

  const [sensors, setSensors] = useState({});
  const [sensorPollutants, setSensorPollutants] = useState({});
  
  // Ask backend for the list of sensors and their corresponding pollutant options
  const getSensorList = () => {

  };

  const getPollutantList = (sensorID: Number) => {

  };

    return (
      <>
        <div id="chartDiv" className="rose">
          <div className='infobar'>
            <ul>
              <li>Selected Sensor: 
                <select>
                  {sensors.map(sensor => (
                    <option value={sensor.id}>{sensor.name}</option>
                  )) }
                </select>
              </li>
              <li>Selected Pollutant: 
                <select>
                  {sensorPollutants.map(pollutant => (
                    <option value={pollutant.name}>{pollutant.name}</option>
                  )) }
              </select></li>
            </ul>
          </div>
          <div className='container'>
            {JSON.stringify(inputsJSON)}
          </div>
        </div>
      </>
    )
  }
  
  export default Rose
  */