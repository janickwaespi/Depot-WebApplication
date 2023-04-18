import React, {useState} from 'react';
import './styles/editpopup.css';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';

const layout = axios.create({
  baseURL: 'http://localhost:80/api/layout'
})


const EditPopup = ({ trigger, 
                    ClosePopup, 
                    AssignBoxesToLayout
                  }) => {


  const [rows, setRows] = useState()
  const [columns, setColumns] = useState()


  const SubmitEdit = (e) => {
    e.preventDefault()

    layout.put('/', {
      rows: rows,
      columns: columns
    })
    .catch(err => {
      console.log(err)
    })
    AssignBoxesToLayout(rows, columns)
  }





  if(!trigger) return null;
  return(
      <div className='edit-popup' onClick={ClosePopup}>
        <div className='edit-popup-inner' onClick={(event) => {
          event.stopPropagation()
        }}>
          <button className='close-button' onClick={ClosePopup}> <AiOutlineClose className='close-button-img'/> </button>                          


          <h className='title'>Box settings</h>
          <form className='box-settings' onSubmit={SubmitEdit}>

            <label>columns</label>
            <input
              type="text"
              required
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
            />
            <label>rows</label>
            <input
              type="text"
              required
              value={rows}
              onChange={(e) => setRows(e.target.value)}
            />

            <button>save</button>

          </form>
          
        </div>
      </div>
  );
};

export default EditPopup;