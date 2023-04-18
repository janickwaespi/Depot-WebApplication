import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from './components/Box.js';
import EditPopup from './components/EditPopup.js';
import Edit from './components/Edit.js';
import BoxPopup from './components/BoxPopup.js';
import './styles/depot.css';

// axios api variables
const boxes = axios.create({
    baseURL: 'http://localhost:80/api/boxes'
})
const layout = axios.create({
    baseURL: 'http://localhost:80/api/layout'
})

const Depot = () => {
    // ------------------------------------------------------------------------
    // useState hooks
    // ------------------------------------------------------------------------
    const [rowBoxes, setRowBoxes] = useState([]);           // array from all rows

    const [selectedBox, setSelectedBox] = useState(1);      // id from selected box

    const [editPopup, setEditPopup] = useState(false);      // editPopup flag
    const [boxPopup, setBoxPopup] = useState(false);        // boxPopup flag

    const [boxList, setBoxList] = useState([])              // list for all boxes
    // ------------------------------------------------------------------------
    // useEffect hooks
    // ------------------------------------------------------------------------
    // loads box data in once
    useEffect(() => {
        boxes.get('/')
        .then(res => {
            console.log(res)
            setBoxList(res.data)
        })
        .catch(err => {
            console.log(err)
        }) 
    },[])
    // loads layout data once the box data is received
    useEffect(() => {
        layout.get('/')
        .then(res => {
            console.log(res)
            AssignBoxesToLayout(res.data.rows, res.data.columns)
        })
        .catch(err => {
            console.log(err)
        }) 
    }, [boxList])
    // ------------------------------------------------------------------------
    // Assigns the boxes to the given layout
    // ------------------------------------------------------------------------
    const AssignBoxesToLayout = (rows, columns) => {
        // create an array like the layout
        let allRows = [];
        for(let r = 0;r<rows;r++){
            let row = [];
            for(let c = 0;c<columns;c++){
                if(!(boxList[(r * parseInt(columns, 10)) + c])) {break}
                row.push(boxList[(r * parseInt(columns, 10)) + c])
            }
            allRows.push(row); 
        }
        // adds box components into the array
        const rowBoxesCopy = allRows.map((row) =>
            <div className='row'>
                {row.map(box =>                 
                    <Box       
                        boxId={box.id}
                        setBoxPopup={setBoxPopup}
                        changeSelectedBox={setSelectedBox}
                    />                  
                ) }
            </div>
        )
        setRowBoxes(rowBoxesCopy);
    } 
    // ------------------------------------------------------------------------
    // return depot page
    // ------------------------------------------------------------------------
    return (
        <div className='depot'>        
            <div className='all-rows'>
                {rowBoxes}
                <div className="edit-button">
                    <Edit TriggerPopup={() => setEditPopup(true)}/>
                </div>          
            </div>
            <EditPopup
                trigger={editPopup}
                ClosePopup={() => setEditPopup(false)}
                AssignBoxesToLayout={AssignBoxesToLayout}
            />
            <BoxPopup 
                trigger={boxPopup}
                ClosePopup={() => setBoxPopup(false)} 
                selectedBox={selectedBox}
            /> 
        </div>
    );
};

export default Depot;