const router =  require('express').Router()
const{ addPet } = require('../controller/petController')

router.post('/addPet', addPet)

module.exports = router