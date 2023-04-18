import React, {useState, useEffect} from 'react';
import './styles/boxpopup.css';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:80/api/boxes'
})




const BoxPopup = ({ trigger, 
                    ClosePopup, 
                    selectedBox
                  }) => {
          

  const [articleNumber, setArticleNumber] = useState();
  const [name, setName] = useState();
  const [weightPerPiece, setWeightPerPiece] = useState();
  const [weight, setWeight] = useState();


  useEffect(() => {
    api.get('/' + selectedBox.toString())
    .then(res => {
      setArticleNumber(res.data.articleNumber)
      setName(res.data.name)
      setWeight(res.data.weight)
    })
    .catch(err => {
      console.log(err)
    })   
  }, [trigger, selectedBox])

  

  const Submit = (e) => {
    e.preventDefault()

    api.put('/Webpage/' + selectedBox.toString(), {
      articleNumber: articleNumber,
      name: name,
    })
  }




  if(!trigger) return null;
  return(
      <div className='box-popup' onClick={ClosePopup}>
        <div className='box-popup-inner' onClick={(event) => {
          event.stopPropagation()
        }}>
          <button className='close-button' onClick={ClosePopup}> <AiOutlineClose className='close-button-img'/> </button>                          


          <h className='title'>Box settings</h>
          <form className='box-settings' onSubmit={Submit}>

            <label>article number</label>
            <input
              type="text"
              required
              value={articleNumber}
              onChange={(e) => setArticleNumber(e.target.value)}
            />
            <label>name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>weight</label>
            <input
              className='weight'
              type="text"
              required
              value={weight}
            />
            <label>pieces</label>
            <input
              className='pieces'
              type="text"
              required
              value={weightPerPiece * weight}
            />

            <button>save</button>

          </form>         
        </div>
      </div>
  );
};

export default BoxPopup;