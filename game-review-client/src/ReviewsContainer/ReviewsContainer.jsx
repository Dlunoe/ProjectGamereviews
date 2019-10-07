import React, {Component} from 'react';
import ReviewsList from './ReviewsList/ReviewsList';


class ReviewContainer extends Component {
    constructor(){
        super();
        this.state = {
            reviews: []
        }
    }
    componentDidMount(){
        this.getReviews();
    }
    getReviews = async () => {
        const reviews = await fetch("http://localhost:3001/reviews")
        const parsedResponse = await reviews.json();
        this.setState({
            reviews: parsedResponse
        })
    }
    render(){
        return(
            <div>
                <h1>weldome to reviews</h1>
                <ReviewsList reviews={this.state.reviews}/>
            </div>
        )
    }
}
export default ReviewContainer;