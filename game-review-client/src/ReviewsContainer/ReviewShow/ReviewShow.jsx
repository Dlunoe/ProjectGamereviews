import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import EditReview from '../EditReviewModal/EditReview';

class Review extends Component {
    constructor(){
        super();
        this.state ={
            thisReview: [],
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState(prevState=>({
            modal: !prevState.modal
        }))
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
        let objectReview = await singleReview.json(); let thisReview = objectReview.review
        console.log(thisReview)
        this.setState(prevState => ({
            thisReview
        }))
       
    }
    updateReview = async (id, formData) =>{
        formData.id = id
        console.log(id, formData)
        const updatedReview = await fetch(`http://localhost:3001/reviews/${id}`,{
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers:{
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await updatedReview.json();
        console.log(parsedResponse)
        if (parsedResponse.status === 200){
            await this.findReview(parsedResponse.review.id)
            return <Redirect to ="/reviews" />
        }
        await this.findReview(parsedResponse.review.id);
    }
    deleteReview = async (id)=>{
       console.log(id)
        try{
            const deletedReview = await fetch(`http://localhost:3001/reviews/${id}`,
            {
                method: 'DELETE',
                credentials: "include"
            })
            console.log(deletedReview)
            window.location.reload();
        }catch(err){
            console.log("ERROR", err)
        }
    }
    render(){ 
        //if the user manually types in an id that doesn't exist, this will display on the page
        if(this.state.thisReview==null){
            return (<div>Review not found<br/>
                
            </div>)
        }
        return(
            <div className="solo-review">
                <h1 className="title">{this.state.thisReview.title}</h1>
                <p className="description">{this.state.thisReview.description}</p>
                <p className="opinion">{this.state.thisReview.opinion}</p>
                <EditReview review={this.state.thisReview} updateReview={this.updateReview} />
                <Button color="danger" onClick={this.toggle} size="sm" className="delete">Delete this review?</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.classNAme}>
                    <ModalHeader toggle={this.toggle}>Delete this review?</ModalHeader>
                    <ModalBody>
                        <p>This action is permanent, are you sure you want to delete this review?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={(e)=>{
                            e.preventDefault();
                            this.deleteReview(this.state.thisReview.id);
                            this.toggle();
                            return <Redirect to="/reviews" />
                        }}>Yes</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div> 
        )
    }
}


export default Review;