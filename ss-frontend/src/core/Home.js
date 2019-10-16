import React, {useState} from "react";
import {Link} from "react-router-dom";

function Home () {

    const [url, setURL] = useState('')

    const handleChange = event => setURL(event.target.value)
    
    return ( <div>
        <div className="jumbotron">
            {/* <h1 className="display4">Home</h2> */}
            <p className="lead">ALL YOUR PROSPECT'S ONLINE STATS....IN ONE PLACE</p>
            <hr className="my-4"></hr>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" placeholder="Start By Typing your Website URL" aria-label="" aria-describedby="basic-addon2" 
                    value ={url} 
                    onChange={handleChange}></input>
                <div className="input-group-append">
                 <Link to={{pathname: "/quickstats", state: {url: url}}}>
                    <button className="btn btn-outline-secondary" type="button">Submit</button>
                </Link>
                </div>
            </div>
            <p>{url}</p>
        </div>
    </div>)
};

export default Home;