const express = require('express')
const {getIgData} = require('../controllers/instagram.js')

const router = express.Router()

router.post('/insta', getIgData)

//router.post('/post', postController.createPost)

module.exports = router