const cheerio = require('cheerio');
const axios = require('axios')


function getSocialURLs (req,res){
    const URLs = {
        facebook: '',
        instagram: '',
        twitter: '',
        pintrist: ''
    }

    axios.get(req.body.url)
    .then( (htmlData)=>{
        const $ = cheerio.load(htmlData.data)
        $('a').each((index, elem)=>{
        //console.log(`Index:${index} starting at ${Date.now().toString()}`)
        const link = $(elem).attr('href')
        if (link)
            {if (link.includes('https://twitter.com')) {
                URLs.twitter = link
                
            } else if (link.includes('https://www.facebook.com')) {
                URLs.facebook = link
            } else if (link.includes('https://www.instagram.com')) {
                URLs.instagram = link
            }
        }
        //console.log(`Index:${index} ENDING at ${Date.now()}`)
      })
      return res.json(URLs)
    })
    .catch((error)=>{
        console.log(error)
      return res.json({error});
    });



    return URLs;
}

module.exports = {
    getSocialURLs
}