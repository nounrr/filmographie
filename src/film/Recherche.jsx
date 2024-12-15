import { capitalize } from '@mui/material'
import React, { forwardRef } from 'react'

const Recherche = forwardRef((props,ref) => {
  return (
  <div className='filtre'>
    <label>{capitalize(props.filterBy)}</label>
    <input ref={ref} id={props.filterBy} onChange={props.searchBy} type="text"   placeholder={`Rechercher par ${props.filterBy}`}     />
  </div>
  )
})

export default Recherche