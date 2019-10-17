import React from 'react';
import {Link} from 'react-router-dom';

const ReviewsList = (props) =>{
    console.log(props.reviews)
    const reviewList = props.reviews.map((review, i)=>{
        return(
            <li key={review.id} onClick = {()=>props.handleClick(review.id)} className="single-li">
                <Link to={`/reviews/${review.id}`}>{review.title}</Link>
                <p>{review.review}</p>
            </li>
        )
    })
    return(
        <ul className="review-list">{reviewList}</ul>
    )
}
       
    

export default ReviewsList;