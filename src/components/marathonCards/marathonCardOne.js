import React from 'react'

function filmOne( { film }) {
  return (
    <>
      <div key={film.id}>
        <h3>{film.title}</h3>
        <figure>
          <img src={film.poster}/>
        </figure>
        <p>{film.plot}</p>
      </div>
    </>
  )
}

export default filmOne