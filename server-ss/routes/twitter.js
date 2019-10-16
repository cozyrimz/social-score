const express = require('express')
const {getTwitterData} = require('../controllers/twitter.js')

const router = express.Router()

router.post('/twitter', getTwitterData)
//router.post('/post', postController.createPost)

module.exports = router