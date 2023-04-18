// ---------------------------------------------------
// backend server.js
// ---------------------------------------------------
const Joi = require('joi')
const express = require('express')
const app = express()
const fs = require('fs')
const net = require('net')
const cors = require('cors')

app.use(cors())
app.use(express.json())
// ---------------------------------------------------
// joi schemas
// ---------------------------------------------------
const boxCreateSchema = Joi.object({})
const boxUpdatePropertiesSchema = Joi.object({
  articleNumber: Joi.string().required(),
  name: Joi.string().required(),
  weightPerPiece: Joi.number(),
  calVal: Joi.number()
})
const boxUpdateWeightSchema = Joi.object({
  weight: Joi.number().required()
})
const changeLayoutSchema = Joi.object({
  rows: Joi.number().required(),
  columns: Joi.number().required()
})
// ---------------------------------------------------
// read json data
// ---------------------------------------------------
function JsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
// ---------------------------------------------------
// http get requests
// ---------------------------------------------------
app.get('/', (req, res) => {
  res.send("elab-depot: API running")
})

app.get('/api/boxes', (req, res) => {
  // read json file
  JsonReader('./data/boxes.json', (err, boxes) => {
    if (err) {
      return res.status(404).send(err.message);
    }
    res.send(boxes)
  });
})

app.get('/api/boxes/:id', (req, res) => {
  // read json file
  JsonReader('./data/boxes.json', (err, boxes) => {
    if (err) {
      return res.status(404).send(err.message);
    }
    const box = boxes.find(c => c.id === parseInt(req.params.id))
    if(!box) return res.status(404).send("box not found")
    res.send(box)
  });
})

app.get('/api/layout', (req, res) => {
  // read json file
  JsonReader('./data/layout.json', (err, layout) => {
    if (err) {
      return res.status(404).send(err.message);
    }
    res.send(layout)
  });
})
// ---------------------------------------------------
// http post requests
// ---------------------------------------------------
app.post('/api/boxes', (req, res) => {
  // update json file
  JsonReader('./data/boxes.json', (err, boxes) => {
    if (err) {
      return res.status(404).send(err.message)
    }
    // validate request
    const {error, value} = boxCreateSchema.validate(req.body, {abortEarly:false})
    if(error){return res.status(400).send(error.message)}
    // create box object
    const newBox = {
      id: boxes.length + 1,
      articleNumber: "",
      name: "",
      weight: 0,
      weightPerPiece: 0,
      calVal: 0,
    }
    // add newBox to boxes array
    boxes.push(newBox)
    // write data back to file
    fs.writeFile('./data/boxes.json', JSON.stringify(boxes, null, 2), err =>{
      if(err) {
        return res.status(404).send(err.message)
      }
      else {
        res.send(newBox)
      }
    })
  });
})
// ---------------------------------------------------
// http put requests
// ---------------------------------------------------
app.put('/api/boxes/:clientName/:boxId', (req, res) => {
  // read json file
  JsonReader('./data/boxes.json', (err, boxes) => {
    if (err) {
      return res.status(404).send(err.message)
    }
    // find selected box
    const box = boxes.find(c => c.id === parseInt(req.params.boxId))
    if(!box) res.status(404).send("box not found")
    // validate request
    const clientId = req.params.clientName
    const boxUpdateSchema = clientId === 'ESP' ? boxUpdateWeightSchema : boxUpdatePropertiesSchema;
    const {error, value} = boxUpdateSchema.validate(req.body, {abortEarly:false})
    if(error){return res.status(400).send(error.message)}
    // update propertys
    if(clientId == 'ESP'){
      box.weight = req.body.weight
    }
    else{
      if(req.body.articleNumber){
        box.articleNumber = req.body.articleNumber
      }
      else{
        box.articleNumber = box.articleNumber
      }
      if(req.body.name){
        box.name = req.body.name
      }
      else{
        box.name = box.name
      }
      if(req.body.weightPerPiece) {
        box.weightPerPiece = req.body.weightPerPiece
      }
      else{
        box.weightPerPiece = box.weightPerPiece
      }
      if(req.body.calVal){
        box.calVal = req.body.calVal
      }
      else{
        box.calVal = box.calVal
      }

    }
    // return box
    fs.writeFile('./data/boxes.json', JSON.stringify(boxes, null, 2), err =>{
      if(err) {
        return res.status(404).send(err.message)
      }
      else {
        res.send(box)
      }
    })
  });
})

app.put('/api/layout', (req, res) => {
  // read json file
  JsonReader('./data/layout.json', (err, layout) => {
    if (err) {
      return res.status(404).send(err.message)
    }
    // validate request
    const {error, value} = changeLayoutSchema.validate(req.body, {abortEarly:false})
    if(error){return res.status(400).send(error.message)}
    // update propertys
    layout.rows = req.body.rows
    layout.columns = req.body.columns
    // return box
    fs.writeFile('./data/layout.json', JSON.stringify(layout, null, 2), err =>{
      if(err) {
        return res.status(404).send(err.message)
      }
      else {
        res.send(layout)
      }
    })
  });
})
// ---------------------------------------------------
// http delete requests
// ---------------------------------------------------
app.delete('/api/boxes/:id', (req, res) => {
  // read json file
  JsonReader('./data/boxes.json', (err, boxes) => {
    if (err) {
      return res.status(404).send(err.message);
    }
    // find selected box
    const box = boxes.find(c => c.id === parseInt(req.params.id))
    if(!box) return res.status(404).send("box not found")
    const index = boxes.indexOf(box)
    // delete box
    boxes.splice(index, 1)
    // return boxes array
    fs.writeFile('./data/boxes.json', JSON.stringify(boxes, null, 2), err =>{
      if(err) {
        return res.status(404).send(err.message)
      }
      else {
        res.send(box);
      }
    })  
  });
})
app.delete('/api/boxes', (req, res) => {
  // read json file
  JsonReader('./data/boxes.json', (err, boxes) => {
    if (err) {
      return res.status(404).send(err.message);
    }
    // delete boxes
    boxes.splice(0, boxes.length)
    // return boxes array
    fs.writeFile('./data/boxes.json', JSON.stringify(boxes, null, 2), err =>{
      if(err) {
        return res.status(404).send(err.message)
      }
      else {
        res.send(boxes);
      }
    })  
  });
})




// PORT
const port = process.env.PORT || 80;
app.listen(port, () => {console.log("Server started on port" + port)})
