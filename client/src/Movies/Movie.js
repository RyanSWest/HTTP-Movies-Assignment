import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateForm from './update';
import {Link} from 'react-router-dom';
import history from './history';
 export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }
   componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  deleteMovie =e=> {
    console.log("DELETE", this.props.match.params.id)

  	  e.preventDefault();
 	  axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
	  .then(res=> {console.log(res);
	   this.props.history.push('/') })
	  .catch(err=> console.log(err))
  }
 
  fetchMovie = id => {
     axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };


  
  editMovie = id => {
   	   history.push(`update-movie/${id}`)
  }



  render() {
 
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>


	 <button   > 
		 <Link to={`/update-movie/${this.state.movie.id}`}>
		 EDIT
     </Link> </button> 
		<button onClick ={this.deleteMovie}> DELETE</button>
		 
      </div>
    );
 
  }
}
