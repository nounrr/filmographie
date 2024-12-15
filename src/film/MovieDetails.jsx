import React from 'react'

function MovieDetails(props) {
  return (
    <div className={props.title} id={props.title}>
        <h4 onClick={props.close}>X</h4>
    <h1>title:{props.title}</h1>
    <h1>director:{props.director}</h1>
    <h3>releaseYear: {props.year} - genre: {props.genre} </h3>
    <h4>rating:{props.rating}</h4>
    </div>
  )
}

export default MovieDetails