import React from 'react'
// comp name Majuscule 
function Header(props) {
  return (
    <nav>
        <a onClick={props.DisplayList}>Accueil</a>
        <a href="#">Services</a>
        <a href="#">Film</a>
        <a onClick={props.DisplayFav}>Les Favoris</a>
    </nav>
  )
}

export default Header


