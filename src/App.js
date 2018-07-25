import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';


class App extends Component {

    // Render : componentWillMount() -> render() -> componentDidMount()
    // Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> component


    state = {

    }

    componentDidMount(){ // api upload in json.
        this._getMovies(); 
    }
  

   _getMovies = async ()  => {
    const movies = await this._callApi() // function _callApi() is not finish  , waiting _callApi , not success
    this.setState({
      movies
    })

  } 
  
  _callApi = () => {
     return fetch('https://yts.ag/api/v2/list_movies.json?sort_by=rating') // data upload
    .then(response => response.json())                                     // check with response , change json and output console
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }




  _renderMoives = () => { //my function start _ 
    const movies = this.state.movies.map(movie => {
        console.log(movie)
        return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        />
      })
      return movies
  } 

  
 // data exist ? is it true execute _renderMovies() is it false output Loading
  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading" }> 
          {this.state.movies ? this._renderMoives() : 'Loading'}  
      </div>
    );
  }
}

export default App;
