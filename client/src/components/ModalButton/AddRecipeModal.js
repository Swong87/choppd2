import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(000, 000, 000, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '50%',
    left                       : '50%',
    right                      : 'auto',
    bottom                     : 'auto',
    border                     : 'none',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '5px',
    outline                    : 'none',
    transform             		 : 'translate(-50%, -50%)',
    padding                    : '0px'
  }
};

class AddRecipeModal extends Component {
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
      	    <Modal
      	      isOpen={this.state.modalIsOpen}
      	      onRequestClose={this.closeModal}
      	      style={customStyles}
      	      contentLabel="Example Modal"
      	    >
      	    	<div className="modal-dialog" role="document">
				    <div className="modal-content">
				      	<div className="modal-header">
				        	<h3 className="modal-title" id="commentModalLabel">
				          		Submit Recipe
				          		<button type="button" className="close" onClick={this.closeModal} aria-label="Close">
				            		<span aria-hidden="true">&times;</span>
				          		</button>
				        	</h3>
				      	</div>
				      	<div className="modal-body">

				        	

				      	</div>
				      	<div className="modal-footer">

				        	<button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>

				      	</div>
				    </div>
				</div>
      	    </Modal>
      	  </div>
      );
	  }
}


export default AddRecipeModal;