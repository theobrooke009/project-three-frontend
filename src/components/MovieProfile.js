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
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Directed by:</strong> {movie.director}</p>
              <p><strong>Actors:</strong> {movie.actors}</p>
              <p><strong>Runtime:</strong> {movie.runtime} mins</p>
              <p><strong>Rated:</strong> {movie.rated}</p>
              <p><strong>IMDB Rating:</strong> {movie.imdbrating}</p>
              <p><i>{movie.plot}</i></p>
            </div>
          </div>
          }
        </div>
      </div>
    </section>
  )
}

export default MovieProfile