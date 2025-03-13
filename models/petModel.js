const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema

const petSchema = new mongoose.Schema({
   pet_name:{
      type: String,
      required: true,
      trim: true
   },
   pet_species: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"], // Restrict to certain values
  },
  pet_breed: {
      type: String,
      trim: true
  },
  pet_age: {
      type: Number,
      required: true,
      min: 0  // Age cannot be negative
  },
  pet_gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"]
  },
  pet_size: {
      type: String,
      enum: ["Small", "Medium", "Large"]
  },
  pet_description: {
      type: String,
      trim: true
  },
  pet_adoption_status: {
      type: String,
      enum: ["Available", "Adopted", "Pending"],
      default: "Available"
  },
  pet_image: {
      type: String
  }
},{timmestamps: true})

module.exports = mongoose.model("Pet",petSchema)