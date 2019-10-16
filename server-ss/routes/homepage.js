const express = require('express')
const {getSocialURLs} = require('../controllers/homepage.js')

const router = express.Router()

router.post('/homepage', getSocialURLs)
//router.post('/post', postController.createPost)

module.exports = router