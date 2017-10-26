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

class AddRecipeModal extends Component {
	constructor() {
	    super();
	 
	    this.state = {
	      modalIsOpen: false,
        title: "",
        image: "",
        ingredients: [],
        method: ""
	    };
	 
	    this.openModal = this.openModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	}

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveRecipe({
        title: this.state.title,
        user: this.props.user,
        image: this.state.image || "http://cohenwoodworking.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg",
        ingredients: this.state.ingredients.split(', '),
        method: this.state.method
      }, this.props.id)
        .then(res => console.log(res),
          this.closeModal())
        .catch(err => console.log(err));
    }
  };
	 
    openModal() {
      	this.setState({modalIsOpen: true});
    }
	   
    closeModal() {
      	this.setState({modalIsOpen: false});
    }
	   
    render() {
      	return (
      	  <div>
            <br />
      	    <button className="btn btn-primary" id="round" onClick={this.openModal}>+</button>
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
  				          	Submit Recipe
  				        	</h3>
  				      	</div>
  				      	<div className="modal-body">
                    <form>
                      <div className="form-group">
                        <div>
                          <input
                            style={{width:550}}
                            onChange={this.handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                          />
                        </div>
                        <br />
                        <div>
                          <input 
                            style={{width:550}}
                            onChange={this.handleInputChange}
                            name="image"
                            placeholder="Image"
                          />
                        </div>
                        <br />
                        <div>
                          <input 
                            style={{width:550}}
                            onChange={this.handleInputChange}
                            name="ingredients"
                            placeholder="Ingredients"
                          />
                        </div>
                        <br />
                        <div>
                          <textarea
                            rows="5"
                            cols="76" 
                            onChange={this.handleInputChange}
                            name="method"
                            placeholder="Method of Cooking"
                          />
                        </div>
                      </div>
                    </form>
  				      	</div>
  				      	<div className="modal-footer">
  				        	<button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                    <button
                      disabled={!(this.state.title)}
                      onClick={this.handleFormSubmit} 
                      className="btn btn-primary"
                    >
                      Submit Recipe
                    </button>
  				      	</div>
				        </div>
				      </div>
      	    </Modal>
      	  </div>
      );
	  }
}


export default AddRecipeModal;