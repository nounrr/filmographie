import React from 'react'
import Card from './Card'

function MovieList (props) {
  return (
    <div className="group">
{
      props.list.map((film,index)=>(
        <Card fClicked={()=>props.fClicked(film)} addFav={()=>props.addFav(film)} key={index} title={film.title}  year={film.releaseYear} genre={film.genre} rating={film.rating} />
    ))}
    </div>
  )
}

export default MovieList 