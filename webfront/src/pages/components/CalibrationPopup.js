import React, {useState, useEffect} from 'react';
import './styles/calibratepopup.css';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';

const boxes = axios.create({
  baseURL: 'http://localhost:80/api/boxes'
})


const CalibrationPopup = ({ trigger, 
                            ClosePopup
                            }) => {

  const[stepOne, setStepOne] = useState(true)



  const calStepOne = () => {
    setStepOne(false);
    boxes.get('/').then((res) => {
      console.log(res);
      updateBoxes(res.data, "one");
    }).catch((err) => {
      console.log(err);
    });
  };

  const calStepTwo = () => {
    setStepOne(true)
    ClosePopup()
    boxes.get('/').then((res) => {
      console.log(res);
      updateBoxes(res.data, "two");
    }).catch((err) => {
      console.log(err);
    });
  };

  const updateBoxes = async (boxList, step) => {
    try {
      for (const box of boxList) {
        if(step == "one"){
          await boxes.put(`/Webpage/${box.id}`, {
            articleNumber: box.articleNumber,
            name: box.name,
            calVal: box.weight
          });
        }
        if(step == "two"){
          await boxes.put(`/Webpage/${box.id}`, {
            articleNumber: box.articleNumber,
            name: box.name,
            weightPerPiece: box.weight - box.calVal
          });
        }
      }
      console.log('all boxes updated successfully');
    } catch (err) {
      console.log(err);
    }
  };






  if(!trigger) return null;
  if(stepOne){
    return(
      <div className='edit-popup' onClick={ClosePopup}>
        <div className='edit-popup-inner' onClick={(event) => {
          event.stopPropagation()
        }}>
          <button className='close-button' onClick={ClosePopup}> <AiOutlineClose className='close-button-img'/> </button>    

          <h className='title'>Box Calibration</h>
          <h className='step'>Step One</h>
          <h className='info'>please empty every box and press next</h>
          
          <button className='start-calibration-button' onClick={calStepOne}>next</button>
        
        </div>
      </div>
    );
  }
  else{
    return(
      <div className='edit-popup' onClick={ClosePopup}>
        <div className='edit-popup-inner' onClick={(event) => {
          event.stopPropagation()
        }}>
          <button className='close-button' onClick={ClosePopup}> <AiOutlineClose className='close-button-img'/> </button>    

          <h className='title'>Box Calibration</h>
          <h className='step'>Step Two</h>
          <h className='info'>please put a single item in each box</h>
    
          <button className='start-calibration-button' onClick={calStepTwo}>finish calibration</button>
          
        </div>
      </div>
    );
  }

};

export default CalibrationPopup;