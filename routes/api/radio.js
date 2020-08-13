let express = require('express')
let router = express.Router()
let Radio = require('../../models').Radio



// add a Radio
router.post('/:id', function (req, res) {
    // validation for the body
    const id = JSON.parse(req.params.id);
    if (!Number.isInteger(id)){
        res.status(400).send('the ID is not integer')
    }
    if (!req.body.alias){
        res.status(400).send('the alias is required !')
    }
    if (!Array.isArray(req.body.allowed_locations)){
        res.status(400).send('the allowed locations is not array !')
    }

    // check if the ID is unique
    Radio.findByPk(id).then(radio => {
        if (radio)
            res.status(400).send({message: "this ID is already exist"})
    })

    // Create a new Radio
    Radio.create({
        id: id,
        alias:req.body.alias,
        allowed_locations:JSON.stringify(req.body.allowed_locations), // I stored the array as string in the database, and when i need it i can parse it again
    }).then(function (result) {
        res.status(200).send()
    })
})


// Set location of Radio by Id
router.post('/:id/location', function (req, res) {
    // validation for the body
    const id = JSON.parse(req.params.id);

    if (!Number.isInteger(id)){
        res.status(400).send('the ID is not integer')
    }
    if (!req.body.location){
        res.status(400).send('the location is required')
    }

    Radio.findByPk(id).then(radio => {
        if (radio){
            // check if the location is allowed
            const allowed_locations = JSON.parse(radio.allowed_locations);
            const allowed = allowed_locations.indexOf(req.body.location);

            if (allowed >= 0){
                radio.update({location: req.body.location}).then(function (result) {
                    if (result)
                        res.status(200).send()
                });
            }else {
                res.status(403).send()
            }
        }else {
            res.status(404).send({message: "this ID is not existed"})
        }
    })
})

// Retrieve location of Radio by Id
router.get('/:id/location', function (req, res) {
    // validation for the body
    const id = JSON.parse(req.params.id);

    if (!Number.isInteger(id)){
        res.send('the ID is not integer').status(400)
    }
    // check if the radio existed
    Radio.findByPk(id).then(radio => {
        if (!radio)
            res.status(404).send({message: "this ID is not existed"})
    })

    Radio.findByPk(id).then(radio => {
        if (radio.location === undefined){
            res.status(404); // undefined/unknown
        }else {
            res.send({location: radio.location}).status(200);
        }
    })
})

module.exports = router
