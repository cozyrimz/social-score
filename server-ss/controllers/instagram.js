const cheerio = require('cheerio');
const axios = require('axios');
 
const igData = {
    username: "",
    followers: "",
    biography: "",
    following: "",
    fullname: "",
    website: "",
    numPosts: "",
    highlightreels: 0,
    lastTen: [],
    comments: [],
    score: ""

}

async function metricCalculation (){
    //create point system for metrics
    let {biography, followers, website, numPosts, lastTen, highlightreels, comments} = igData
    //followers
    let count = 0 
    if(biography.length > 20 ) {
        count = count + 5
    } else if (biography) {
        count = count + 2
        comments.push({biography: 'Too Short'})
    } else comments.push ({biography: 'No Bio'})

    //website
    if (website) {
        count = count + 5
    } else comments.push({website: 'Should have external link to website'})


    //followers
    if (followers > 10000) {
        count = count + 50
    } else if (followers > 5000) {
        count = count + 30
        comments.push({followers: 'below 10000'})
    } else if (followers > 1000) {
        count = count +  15
        comments.push ({followers: 'Count Use Improvment, below 5000'})
    } else if (followers > 300) {
        count = count + 5
        comments.push ({followers: 'Count Use Improvment, below 1000'})
    } else comments.push ({followers: 'Not Enough Followers'})

    //highlights
    if (highlightreels > 2) {
        count = count + 10
    } else {
        comments.push({highlights: 'Need more highlight stories'})
    }

    //number of Posts
    if (numPosts > 300 ) {
        count = count + 20
    } else if (numPosts > 100) {
        counst = count + 10
    } else {
        comments.push ({Posts: 'Need to post more Content'})
    }

    //post engagement

    //post frequency

    pct = count/150

    if (pct> 0.9) {
        score = "A"
    } else if (pct>=0.8) {
        score = "B"
    } else if (pct>=0.7) {
        score = "C"
    } else if (pct>=0.6) {
        score = "D"
    } else {
        score = "LOW"
    }

    igData.comments = comments
    igData.score = score
    console.log(comments)
    console.log(count, '|',pct, '\%')

}



async function postEngagement (postArray){

}

async function timeBetweenPosts (postArray) {

}

async function getPostData (post) {
    //console.log(post)
    let postMetrics = {}
    postMetrics.caption = post.edge_media_to_caption.edges[0].node.text
    postMetrics.numComments = post.edge_media_to_comment.count
    postMetrics.numLikes = post.edge_media_preview_like.count
    postMetrics.timePosted = new Date(post.taken_at_timestamp*1000)

    if (post.is_video) {
        postMetrics.type = 'Video'
        postMetrics.videoViews = post.video_view_count
    } else postMetrics.type = 'Image'

    //console.log('Prewview Like', post.edge_media_preview_like)
    //console.log(postMetrics)
    igData.lastTen.push(postMetrics)
    //console.log (igData.lastTen)
    return
}

async function getIgData (req,res){
   console.log (req.body.url, "<-this is a URL")

    axios.get(req.body.url)
    .then(async (htmlData)=>{
        //initial request to the gram all homepage data
        let $ = cheerio.load(htmlData.data)
        //console.log(htmlData.data)
        
        await $('script').each((i,elm)=>{
            //find json object which has all data for the webpage
            if ($(elm).html().startsWith('window._sharedData')) {
                //console.log($(elm).html())
                //conver string to javascript Object
                let tempString = $(elm).html().substr(21,$(elm).html().length);
                let jsonObject = tempString.substr(0,tempString.lastIndexOf(';')).trim()
                let jObj = JSON.parse(jsonObject)

                //narrow down relevent data
                let userData = jObj.entry_data.ProfilePage[0].graphql.user

                //fill data 

                igData.username = userData.username
                igData.highlightreels = userData.highlight_reel_count
                igData.website = userData.external_url
                igData.numPosts = userData.edge_owner_to_timeline_media.count
                igData.followers = userData.edge_followed_by.count
                igData.fullname = userData.full_name
                igData.biography = userData.biography

                //console.log (userData)

                //store last 10 postsd and get metrics
                let posts = userData.edge_owner_to_timeline_media.edges
                posts.forEach((post) => {
                    getPostData(post.node)
                    
                });
                //console.log(edges)
                //console.log(userData)

            }
        })
        //get link to webiste or not
        //get all posts visible
        //class for post = v1Nh3 kIKUG _bz0w, a href under each of these
        //getPostData('sampleurl')
        await metricCalculation()

        return res.json({message: 'successful data return - social', igData})
      })
    .catch((error)=>{
        console.log('ERRRRROR ',error)
      return res.json({error});
    });
    }
   

module.exports = {
    getIgData
}