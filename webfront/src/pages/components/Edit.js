import React from 'react';
import './styles/edit.css';
import { FiEdit3 } from 'react-icons/fi';

const Edit = ({TriggerPopup}) => {
    return (
      <div className='edit-margin'>
        <div className='edit' onClick={TriggerPopup}>
          <FiEdit3 className='edit-icon'/>
        </div>
      </div>

    );
};

export default Edit;