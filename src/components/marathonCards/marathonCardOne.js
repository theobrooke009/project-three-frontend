import React from 'react'
import axios from 'axios'



function FilmOne( { marathonOne }) {
  const [movie, setMovie] = React.useState(null)
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/movies')
      setMovie(res.data)
      console.log('get object function', res)
    }
    getData()
    
  }, [ ])

  console.log('movie card one', movie)
  function getObject() {
    console.log('movies', movie)
    if (movie){
      const movieObject = movie.id.includes(marathonOne)
      
      return movieObject
    }
  }

  return (
    <>
      <div key={marathonOne}>
        <h3>{getObject().title}</h3>
        <figure>
          <img src={getObject().poster}/>
        </figure>
      </div>
    </>
  )
}

export default FilmOne