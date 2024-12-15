import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
function Btn(props) {
  return (
    <div className='filtre'>
    <label>{props.text}</label>
    <select id={props.name}  onClick={props.triage} >
      <option  value="">Trier en ordre:</option>
      <option  value="croissant">Croissant</option>
      <option value="decroissant">Decroissant</option>
    </select>
    </div>
  )
}

export default Btn