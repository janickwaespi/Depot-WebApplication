import React, {useState, useEffect} from 'react';
import './styles/box.css';
import axios from 'axios';

import { BsInbox } from 'react-icons/bs';


const boxes = axios.create({
    baseURL: 'http://localhost:80/api/boxes'
})

const Box = ({boxId, setBoxPopup, changeSelectedBox}) => {

    const [box, setBox] = useState()
    const [id, setId] = useState()
    const [articleNumber, setArticleNumber] = useState()
    const [pieces, setPieces] = useState()

    useEffect(() => {
        boxes.get('/' + boxId.toString())
        .then(res => {
            console.log(res)
            setBox(res.data)   
            setId(res.data.id)
            setArticleNumber(res.data.articleNumber)
            setPieces(CalcPieces(res.data))       
        })
        .catch(err => {
            console.log(err)
        })
    },)

    const CalcPieces = (box) => {
        return RoundPieces((box.weight - box.calVal) / box.weightPerPiece)
    }
    const RoundPieces = (number) => {
        const decimal = Math.floor(number)
        const afterComa = number - decimal

        if(afterComa >= 0.5) {
            return Math.ceil(number)
        }
        if(afterComa < 0.5) {
            return Math.floor(number)
        }
    }

    

    const handleBoxClick = () =>{
        setBoxPopup(true);
        changeSelectedBox(boxId)
    }

    return (
        <div className={'box'} onClick={handleBoxClick}>
            <h className="id">{id}</h>
            <BsInbox className='box-icon'/>
            <h className='article'>{articleNumber}</h>
            <h className='pieces'>{pieces}</h>
        </div>
    );
};

export default Box;