import React, {Component} from 'react';

const ReviewsList = (props) =>{
    console.log(props.reviews)
    const reviewList = props.reviews.map((review, i)=>{
        return(
            <li key={review.id}>
                <h3>{review.title}</h3>
                <p>{review.description}</p>
                <p>{review.review}</p>
            </li>
        )
    })
    return(
        <ul>{reviewList}</ul>
    )
}
       
    

export default ReviewsList;