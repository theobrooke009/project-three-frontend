import React from 'react'
import axios from 'axios'
// import { getOneMovie } from '../lib/api'
import { useParams } from 'react-router-dom'



function FilmOne( { marathonOne }) {
  const [movie, setMovie] = React.useState(null)
  const { movieId } = useParams()
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/movies/${movieId}`)
        setMovie(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    

  }, [movieId])


  console.log('card movies', movie)
  
  return (
    <>
      <div key={marathonOne}>
        <h3>{movie.title}</h3>
        <figure>
          <img src={movie.poster}/>
        </figure>
      </div>
    </>
  )
}

export default FilmOne