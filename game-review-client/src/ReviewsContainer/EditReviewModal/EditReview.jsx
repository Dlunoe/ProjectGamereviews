import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class EditReview extends Component{
    constructor(props){
        super(props);
        this.state ={
            id: this.props.review.id,
            title: this.props.review.title,
            description: this.props.review.description,
            review: this.props.review.review,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState(prevState=>({
            modal: !prevState.modal
        }))
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.toggle()
        console.log(this.state)
    }
    render(){
        return(
            <div>
                <Button color="primary" onClick={this.toggle} size="sm">Edit</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.classNAme}>
                    <ModalHeader toggle={this.toggle}>Edit {this.props.review.title}</ModalHeader>
                    <ModalBody>
                        <form>
                            Title:<input type="text" name="title" onChange={this.handleChange} placeholder={this.state.title}/><br/>
                            Description:<input type="text" name="description" onChange={this.handleChange} placeholder={this.state.description}/><br/>
                            Review:<input type="text" name="review" onChange={this.handleChange} placeholder={this.state.review}/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EditReview;