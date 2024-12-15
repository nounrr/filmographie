import logo from './logo.svg';
import './App.css';
import Header from './film/Header';
import Recherche from './film/Recherche';
import MovieList  from './film/MovieList ';
import Btn from './film/Btn';
import { useState, useEffect, useRef } from 'react';
import MovieDetails from './film/MovieDetails';
import { use } from 'react';
import AddFilmForm from './film/AddFilmForm';


function App() {
 const [films,setFilms] = useState([])
 const [filmDetails,setfilmDetails] = useState([])
 const [filmFav,setfilmFav] = useState([])
 const [show,setShow] = useState(false)
 const [filmsFiltré, setfilmsFiltré] = useState([])
 const [filmShow, setFilmShow] = useState([])
 const [genreFilm, setGenreFilm] = useState([])
 const [nbrPage, setnbrPage] = useState([0])
 const [favShow, setFavShow] = useState(false)
 
// api to get films
 useEffect (()=>{
  fetch("/db.json")
  .then((res)=>{return res.json()})
  .then((data)=>(
    setFilms(data)))
},[])
// get the value for filmFiltré for first time 
useEffect(()=>{
  setfilmsFiltré(films)
  setGenreFilm([...new Set(films.map(film => film.genre))]);
},[films])
//  run pagination function when every changes in filmFiltr
useEffect(()=>{
  pagination(1)
  
},[filmsFiltré])
 // display details function
  const displayDetails = (data)=>{
    setShow(true)
    setfilmDetails( data) 
  }
  //add to favoris function
  const addToFav = (data) =>{
  setfilmFav((prev)=> [...prev, data])
  }
// pagination function
const pagination = (pageCurr)=>{
  setnbrPage(Math.ceil(filmsFiltré.length/5))
  setFilmShow(filmsFiltré.slice((5*(pageCurr-1)),5*pageCurr))

}
const titleInp = useRef();
const genreInp  = useRef();
//searchr by title or genre
const searchFilms = () => {
  if (genreInp.current.value === "" && titleInp.current.value === "") {
    setfilmsFiltré(films);
  } else if (genreInp.current.value === "") {
    setfilmsFiltré(
      films.filter((elt) => elt.title.toLowerCase().includes(titleInp.current.value.toLowerCase()))
    );
  } else if (titleInp.current.value === "") {
    setfilmsFiltré(
      films.filter((elt) => elt.genre.toLowerCase().includes(genreInp.current.value.toLowerCase()))
    );
  } else {
    setfilmsFiltré(
      films.filter(
        (elt) =>
          elt.title.toLowerCase().includes(titleInp.current.value.toLowerCase()) &&
          elt.genre.toLowerCase().includes(genreInp.current.value.toLowerCase())
      )
    );
  }
};
const triBy = (e)=>{
if(e.target.value==="croissant"){
  setfilmsFiltré([...filmsFiltré].sort((a,b)=>a[e.target.id]-b[e.target.id]))
}
else if(e.target.value==="decroissant"){
  setfilmsFiltré([...filmsFiltré].sort((a,b)=>b[e.target.id]-a[e.target.id]))
}
}
 
//display favoris
const DisplayFav = () =>{
  setFavShow(true)
}
//display list films
const DisplayList = () =>{
  setFavShow(false)
}


//form

const handleFilmData = (data) => {
  setFilms((prev)=>[data, ...prev ])
};
  return (
    <div className="App">
      <Header DisplayList={DisplayList} DisplayFav={DisplayFav} />
      <div className="filtrage"> 
         <Recherche ref={titleInp} filterBy={"title"} searchBy={searchFilms} placeHolder="Rechrcher par titre"/>
         <Recherche ref={genreInp} filterBy={"genre"} searchBy={searchFilms} placeHolder="Rechrcher par genre"/>
         <Btn triage={triBy} name={"rating"} text="Tri par note"/>
         <Btn triage={triBy} name={"releaseYear"} text="Tri par anné"/>
      </div>
      {favShow? <MovieList  fClicked={displayDetails} addFav={addToFav} list={filmFav}  /> : <MovieList  fClicked={displayDetails} addFav={addToFav} list={filmShow}  />}
      
      {show ? <MovieDetails close={()=>(setShow(false))}  title={filmDetails.title}  year={filmDetails.releaseYear} genre={filmDetails.genre} rating={filmDetails.rating} director={filmDetails.director} /> : <div></div> }
      {nbrPage > 0 && (
  <ul>
    {[...Array(nbrPage)].map((elt, index) => (
      <li onClick={() => pagination(index + 1)} key={index}>
        {index + 1}
      </li>
    ))}
  </ul>
)}

      <AddFilmForm list={genreFilm} onFilmSubmit={handleFilmData}  />
    </div>
  );
}

export default App;
