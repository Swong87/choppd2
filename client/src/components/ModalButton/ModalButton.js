import React, { Component } from "react";
import Modal from 'react-modal';
import API from "../../utils/API";

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

class ModalButton extends Component {
	constructor() {
    super();
 
    this.state = {
      modalIsOpen: false,
      bio: ""
    };
 
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    API.updateUser({
      bio: this.state.bio
    }, this.props.id)
    .then(res => console.log(res),
      this.closeModal())
    .catch(err => console.log(err));
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
  	    	<div role="document">
				    <div className="wide">
			      	<div className="modal-header">
			        	<h3 className="modal-title" id="commentModalLabel">
		          		Edit Profile
			        	</h3>
			      	</div>
		      	  <div className="modal-body">
								<h3>Bio</h3>
				        <div className="form-group">
							     
                  <textarea
                    rows="5" 
                    cols="76"
                    onChange={this.handleInputChange}
                    name="bio"
                    placeholder="Write something about yourself"
                  />

				        </div>

					    </div>
					    <div className="modal-footer">

					      <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={this.closeModal}
                  >
                  Close
                </button>

                <button
                  type="button"
                  onClick={this.handleSubmit} 
                  className="btn btn-primary"
                >
                  Submit
                </button>

					    </div>
				    </div>
				  </div>
  	    </Modal>
  	  </div>
    );
  }
}


export default ModalButton;