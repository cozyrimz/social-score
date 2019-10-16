import React , {useEffect, useState} from 'react'
const axios = require('axios');
import IGSummary from "../Instagram/IGSummary";
import {Paper, Container} from '@material-ui/core/';

function QuickStats(props) {
    const db = process.env.SERVER
    //const instaURLRef = useRef();
    const [instaurl, setinstaurl] = useState()
    const {url} = props.location.state
    console.log('rendering')

    useEffect(() => {

        async function parseHomepage () {
        const socials = await axios.post(db+'homepage',{
            url
        }).catch((err)=> console.log('error retrieving social information from homepage'))
       
            await setinstaurl(socials.data.instagram)
            console.log(instaurl)
        }

        parseHomepage();
        
        return () => {
            console.log('cleaning up initial social parse')
        }
    }, [url, instaurl]);

   return( 
    <>
        <Paper style={{padding: 40, marginBototm: 0}}>
            <>
            <h2 className="display4">Quick Stats Page</h2>
            <p className="lead">All Stats Below</p>
            <hr className="my-4"></hr>
            </>
        </Paper>
        {(instaurl) ? <IGSummary igURL={instaurl}/>: null}
    </>)
};

export default QuickStats;