import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class NewReview extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            description:'',
            opinion:'',
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    updateReview = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggle(){
        this.setState(prevState=>({
            modal: !prevState.modal
        }))
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.toggle();
        this.props.createReview(this.state)
    }
    render(){
        return(
            <div>
                <Button color="primary" onClick={this.toggle}>Add a new game review</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add a review</ModalHeader>
                    <ModalBody>
                        <form>
                        Title:<input type="text" name="title" onChange={this.updateReview}/><br/>
                        A description of the game:<br/><textarea name="description" onChange={this.updateReview}/><br/>
                        Your overall review of the game:<br/><textarea name="opinion" onChange={this.updateReview}/><br/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                        <Button color="seconday" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default NewReview;