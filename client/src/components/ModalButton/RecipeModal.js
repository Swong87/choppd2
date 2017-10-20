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

// <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
//   <span aria-hidden="true">&times;</span>
// </button>

class RecipeModal extends Component {
	constructor() {
	    super();
	 
	    this.state = {
	      modalIsOpen: false,
        recipe: [],
        ingredients: []
	    };
	 
	    this.openModal = this.openModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	}

    loadRecipe() {
      API.getRecipe(this.props.id)
      .then(res => {
        this.setState({
          recipe: res.data.results,
          ingredients: res.data.results.ingredients
        })
      })
      .catch(err => console.log(err));
    }
	 
    openModal() {
      this.loadRecipe();
      this.setState({modalIsOpen: true});
    }
	   
    closeModal() {
      this.setState({modalIsOpen: false});
    }


	   
    render() {
      	return (
      	  <div>
      	    <img className="imgBlock" src={this.props.src} onClick={this.openModal} alt='recipe' />
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
    				          		{this.state.recipe.title}
    				        	</h3>
    				      	</div>
    				      	<div className="modal-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="crop">
                            <img className="imgBlock" src={this.state.recipe.image} alt='recipe' />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <h5>Ingredients</h5>
                          {this.state.ingredients.map((item, index) => (
                            <div key={index}> {item} </div>
                          ))}
                          <hr />
                          <h5>How to Cook It</h5>
                          <div>{this.state.recipe.method}</div>
                        </div>
                      </div>
                      

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


export default RecipeModal;