import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import EditReview from '../EditReviewModal/EditReview';

class Review extends Component {
    constructor(){
        super();
        this.state ={
            thisReview: []
        }
    }
    componentDidMount(){
        //this sets the id variable as an object with id property = to what's typed into the url bar
        const id = this.props.match.params
        //this was meant to convert it into a string, but instead pulls the number out of the "id" key
        const stringId = id.id
        //and finally passes the lone intiger through the function
        this.findReview(stringId);
    }
    findReview = async (id) =>{
        //the function will fetch based on the id passed in the search
        //clicking the links in the parent component still passes the id of the oject through to the url
        //this lets the object in the DB be accessed whether the user clicked through or manually types the id in
        let singleReview = await fetch(`http://localhost:3001/reviews/`+id)
        let objectReview = await singleReview.json(); let thisReview = objectReview.review;
        console.log(thisReview)
        this.setState(prevState => ({
            thisReview
        }))
       
    }
    render(){ 
        //if the user manually types in an id that doesn't exist, this will display on the page
        if(this.state.thisReview.status== 404){
            return (<div>Review not found<br/>
                <Link to="/reviews">Back</Link>
            </div>)
        }
        return(
            <div>
                <h1>{this.state.thisReview.title}</h1>
                <p>{this.state.thisReview.description}</p>
                <p>{this.state.thisReview.review}</p>
                <EditReview review={this.state.thisReview} />
                <Link to="/reviews">Back</Link>
            </div> 
        )
    }
}


export default Review;