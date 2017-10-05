import React, { Component } from "react";
import API from "../../utils/API";
import ModalButton from "../../components/ModalButton/ModalButton.js";


class Profile extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  // componentDidMount() {
  //   API.getBaseBreedsList()
  //     .then(res => this.setState({ breeds: res.data.message }))
  //     .catch(err => console.log(err));
  // }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getDogsOfBreed(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="text-center col-sm-3">
              <img src="/profilePic.JPG" width="200px" alt="pic" />
            </div>
            <div className="text-center col-sm-9">

                <h1 className="display">Stephen Wong</h1>
                <ModalButton />
                
                <span><a href="/search">Posts</a> | <a href="/search">Followers</a> | <a href="/search">Following</a></span>
                <p>Bio goes here</p>

            </div>
          </div>
        </div>

        <div className="container">
          
        </div>
      </div>
    );
  }
}




export default Profile;
