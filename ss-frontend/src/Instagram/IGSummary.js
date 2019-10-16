import React , {useEffect, useState} from 'react'
const axios = require('axios');
import SocialCard from '../core/SocialCard'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, CircularProgress} from '@material-ui/core/';

function IGSummary({igURL}) {

    const db = process.env.SERVER
    const [igData,setIGData] = useState({})

    useEffect(() => {
        axios.post((db + 'insta'), {
            url: igURL
        }).then((res)=>{
            setIGData(res.data.igData)
        }).catch((err)=> console.log('Error with Insta Retrieval',err))
        return ()=> {
            console.log('cleanup for IG Summary')}
    },[igURL])
    
    let igProps = {
        title : igData.fullname, 
        mainText : `${igData.followers} Followers`,
        subText : `Posts: ${igData.numPosts}`,
        description: igData.biography
    }
    return (
        <>
        <Grid container spacing={2} style={{padding:20}}> 
            <Grid item md={4}>
                
                <Paper style={{marginTop:10, marginBottom:10}}>
                {(igData.followers) ? <SocialCard {...igProps}/>
                :<CircularProgress style={{margin: 20}} />}
                </Paper>
            </Grid>
            <Grid item md={4}>
                <Paper style={{marginTop:10, marginBottom:10}}>
                    <h3 style={{padding:15}}>second grid item</h3>
                </Paper>
                
            </Grid>
            <Grid item md={4}>
                <Paper style={{marginTop:10, marginBottom:10}}>
                    <h3 style={{padding:15}}>third grid item</h3>
                </Paper>
                
            </Grid>
        </Grid>
        </>
    )
}

export default IGSummary
