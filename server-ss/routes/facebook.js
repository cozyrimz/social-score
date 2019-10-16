const express = require('express')
const {getfbData} = require('../controllers/facebook.js')

const router = express.Router()

router.post('/fb', getfbData)
//router.post('/post', postController.createPost)

module.exports = router