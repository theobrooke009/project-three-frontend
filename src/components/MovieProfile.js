import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function MovieProfile() {
  const { movieId } = useParams()
  const [movie, setMovie] = React.useState(null)

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


  return (
    <section className= "section">
      <div id="playerProfileContainer" className= "container">
        <div id="playerProfileColumns" className= "columns">
          {movie && 
          <div>
            <div className= "column is-half">
              <figure className= "image">
                <img src={movie.poster}/>
              </figure>
            </div>
            <div className= "column is-half">
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>
              <p>{movie.rated}</p>
              <p>{movie.genre}</p>
              <p>{movie.director}</p>
              <p>{movie.writer}</p>
              <p>{movie.actors}</p>
              <p>{movie.plot}</p>
              <p>{movie.imdbRating}</p>
            </div>
          </div>
          }
        </div>
      </div>
    </section>
  )
}

export default MovieProfile