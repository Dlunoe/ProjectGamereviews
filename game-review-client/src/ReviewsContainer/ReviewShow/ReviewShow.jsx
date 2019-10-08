import React from 'react';
import {Link} from 'react-router-dom';

function Review(props) {
    console.log('props from show', props.reviewInfo)
    if(!props.reviewInfo){
        return (<div>Review not found<br/>
            <Link to="/reviews">Back</Link>
        </div>)
    }
    return(
        <div>
            <h1>{props.reviewInfo.title}</h1>
            <p>{props.reviewInfo.description}</p>
            <p>{props.reviewInfo.review}</p>
            <Link to="/reviews">Back</Link>
        </div> 
    )
}

export default Review;