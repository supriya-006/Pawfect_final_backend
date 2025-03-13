const PetModel = require('../models/petModel')
const fs = require('fs')

//add pet
exports.addPet = async (req, res) => {
   let petToAdd = await PetModel.create({
      pet_name: req.body.pet_name,
      pet_species: req.body.pet_species,
      pet_breed: req.body.pet_breed,
      pet_age: req.body.pet_age,
      pet_gender: req.body.pet_gender,
      pet_size: req.body.pet_size,
      pet_description: req.body.pet_description,
      pet_adoption_status: req.body.pet_adoption_status,
      pet_image: req.file?.path
   })
   if (!petToAdd) {
      return res.status(400).json({ error: "somethimg went wrong" })
   }
   res.send(petToAdd)
}