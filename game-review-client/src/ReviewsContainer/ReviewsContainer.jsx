import React, {Component} from 'react';
import ReviewsList from './ReviewsList/ReviewsList';
import ReviewShow from './ReviewShow/ReviewShow';
import {Route, Switch} from 'react-router-dom';


class ReviewContainer extends Component {
    constructor(){
        super();
        this.state = {
            reviews: [],
            thisReview: []
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
    handleClick=(id)=>{
        this.findReview(id);
    }
    findReview = async (id) =>{
        let thisReview = this.state.reviews.filter(review => review.id === id)
        console.log(thisReview)
        this.setState(prevState => ({
            thisReview
        }))
    }
    render(){
        return(
            <div>
                <h1>welcome to reviews</h1>
                <Switch>
                    <Route exact path="/reviews" render={(props) => <ReviewsList reviews={this.state.reviews} handleClick={this.handleClick}/>}/>
                    {/* <Route path='/reviews/:id' render={(props)=> <ReviewShow reviews={this.state.reviews} findReview={this.findReview} reviewInfo={this.state.thisReview[0]}/>}/> */}
                    <Route path ="/reviews/:id" component={ReviewShow}/>
                </Switch>
                
            </div>
        )
    }
}
export default ReviewContainer;