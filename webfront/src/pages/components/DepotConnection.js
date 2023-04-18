import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import './styles/depotconnection.css';



const boxes = axios.create({
    baseURL: 'http://localhost:80/api/boxes'
})

const DepotConnection = ({setPopup}) => {

    const [amountOfBoxes, setAmountOfBoxes] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        boxes.get('/')
        .then(res => {
            console.log(res)
            setAmountOfBoxes(res.data.length)
            setStatus("running")
        })
        .catch(err => {
            console.log(err)
            setStatus("error")
        })
    },[])


    return (
      <div className='depot-connection'>
        <div className='title-div'>
            <h>Elab</h>
        </div>
        <div className='status-div'>
            <h>Status: {status}</h>
        </div>
        <div className='info-div'>
            <h>Boxes Detected: {amountOfBoxes}</h>
            <button className='calibrate-button' onClick={setPopup}>calibrate</button>
        </div>     
      </div>

    );
};

export default DepotConnection;