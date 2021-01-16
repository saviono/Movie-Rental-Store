const {Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    const customer = await Customer.find({}).sort('name');
    res.send(customer);
});

router.post('/', async (req, res) =>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
        });

    customer = await customer.save(customer);
    res.send(customer); 
});

router.put('/:id', async (req,res) =>{
    // Validate input that is going to be insert, if invalid return 400 - Bad request
    const { error } = validate(req.body); //SYNTACTIC SUGAR takes the porperites we want
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    },
       {new: true}) //new means get the Updated object back
    
    //return 404 if lookup failed
    if (!customer) return res.status(404).send(`Genre with id: ${req.params.id} wasn't found hence wasn't updated`);   
    res.send(customer);
})


router.delete('/:id', async (req,res) => {
    //Lookup the element
    //Not existing -> return Error 404.
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(404).send(`Genre with id: ${req.params.id} wasn't found hence wasn't deleted`);
    //Delete
    res.send(customer);
})

router.get('/:id', async (req,res) =>{
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`Genre with id: ${req.params.id} wasn't found`);
    res.send(customer);
 });
 



module.exports = router;
