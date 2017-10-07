import React, { Component } from "react";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ModalButton extends Component {
	constructor() {
	    super();
	 
	    this.state = {
	      modalIsOpen: false
	    };
	 
	    this.openModal = this.openModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	}
	 
    openModal() {
      	this.setState({modalIsOpen: true});
    }
	   
    closeModal() {
      	this.setState({modalIsOpen: false});
    }
	   
    render() {
      	return (
      	  <div>
      	    <button className="btn btn-default" onClick={this.openModal}>Edit Profile</button>
      	    <Modal className="modal-dialog"
      	      isOpen={this.state.modalIsOpen}
      	      onRequestClose={this.closeModal}
      	      style={customStyles}
      	      contentLabel="Example Modal"
      	    >
      	    	
			    <div className="modal-content">
			      	<div className="modal-header">
			        	<h3 className="modal-title" id="commentModalLabel">
			          		Edit Profile
			          		<button type="button" className="close" onClick={this.closeModal} aria-label="Close">
			            		<span aria-hidden="true">&times;</span>
			          		</button>
			        	</h3>
			      	</div>
			      	<div className="modal-body">
						<label>Bio Summary</label>
			        	<form id="commentForm">
						
			          		<textarea rows="5" cols="75" placeholder="Bio Summary" form="commentForm"></textarea>

			          		<input id="comment" name="comment" value="true" type="hidden" />

			        	</form>

			      	</div>
			      	<div className="modal-footer">

			        	<button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>

			        	<button id="savenote" type="button" className="btn btn-primary">Submit</button>

			      	</div>
			    </div>

      	    </Modal>
      	  </div>
      );
	  }
}


export default ModalButton;