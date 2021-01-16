const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const genres = await Genre.find({}).sort('name');
    res.send(genres);
});

router.post('/', auth ,async (req, res) =>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save(genre);
    res.send(genre); 
});

router.put('/:id', async (req,res) =>{
    // Validate input that is going to be insert, if invalid return 400 - Bad request
   const { error } = validate(req.body); //SYNTACTIC SUGAR takes the porperites we want
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},
       {new: true}) //new means get the Updated object back
    
    //return 404 if lookup failed
    if (!genre) return res.status(404).send(`Genre with id: ${req.params.id} wasn't found hence wasn't updated`);   
    res.send(genre);
})


router.delete('/:id',[auth,admin] , async (req,res) => {
    //Lookup the element
    //Not existing -> return Error 404.
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send(`Genre with id: ${req.params.id} wasn't found hence wasn't deleted`);
    //Delete
    res.send(genre);
})

router.get('/:id', async (req,res) =>{
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`Genre with id: ${req.params.id} wasn't found`);
    res.send(genre);
 });
 

module.exports = router;