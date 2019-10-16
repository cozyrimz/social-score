const { parse } = require('node-html-parser');

const data = {
    name: 'facebookname',
    followers: 30
}

function getfbData (req,res){
    console.log(req.body)
    return res.json({
        data
    })
}

module.exports = {
    getfbData
}