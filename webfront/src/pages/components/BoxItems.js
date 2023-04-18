import React, {useState} from 'react';
import './styles/boxitems.css';


const BoxItems = ({boxItems}) => {

  



    console.log(boxItems);

    return (
        <div className='box-items'>

        <ul>
            {
              boxItems.map((box) =>
                <box/>
              )             
            }
        </ul>


 
        </div>

    );
};

export default BoxItems;