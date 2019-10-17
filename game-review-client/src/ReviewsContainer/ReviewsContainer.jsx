import React, {Component} from 'react';
import ReviewsList from './ReviewsList/ReviewsList';
import ReviewShow from './ReviewShow/ReviewShow';
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import NewReview from './NewReviewModal/NewReviewModal';


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
        // console.log(parsedResponse)
        this.setState({
            reviews: parsedResponse.reviews
        })
    }
    handleClick=(id)=>{
        this.findReview(id);
    }
    findReview = async (id) =>{
        let thisReview = this.state.reviews.filter(review => review.id === id)
        // console.log(thisReview)
        this.setState(prevState => ({
            thisReview
        }))
    }
    createReview = async (review, formData)=>{
        try{
            const newReview = await fetch('http://localhost:3001/reviews',{
                method: 'POST',
                body: JSON.stringify(review),
                credentials: "include",
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const createdJSONReview = await newReview.json();
            console.log(createdJSONReview)
            this.setState({reviews: [...this.state.reviews, createdJSONReview.review]})
            await <Redirect to="reviews/" />
        }catch(err){
            console.log(err)
        }
    }
    render(){
        return(
            <div className="container">
                <h1 className="header"><Link to="/reviews">Everyone's a Critic</Link></h1>
                <Switch>
                    <Route exact path="/reviews" render={(props) => <ReviewsList reviews={this.state.reviews} handleClick={this.handleClick} createReview={this.createReview}/>}/>
                    {/* <Route path='/reviews/:id' render={(props)=> <ReviewShow reviews={this.state.reviews} findReview={this.findReview} reviewInfo={this.state.thisReview[0]}/>}/> */}
                    <Route path ="/reviews/:id" component={ReviewShow} updateReview={this.updateReview} getReviews={this.getReviews} />
                </Switch>
                <NewReview createReview={this.createReview}/>
            </div>
        )
    }
}
export default ReviewContainer;