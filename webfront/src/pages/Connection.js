import React, { useState } from 'react';
import DepotConnection from './components/DepotConnection.js';
import CalibrationPopup from './components/CalibrationPopup.js';

const Connection = () => {

    const [calibratePopup, setCalibratePopup] = useState(false);



    return (
        <div>
            <DepotConnection
                setPopup={() => setCalibratePopup(true)}
            />
            
            <CalibrationPopup
                trigger={calibratePopup}
                ClosePopup={() => setCalibratePopup(false)}
            />
        </div>
    );
};

export default Connection;
