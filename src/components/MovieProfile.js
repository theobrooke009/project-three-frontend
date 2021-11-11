import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../config.js'

function MovieProfile() {
  const { movieId } = useParams()
  const [movie, setMovie] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/movies/${movieId}`)
        setMovie(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    

  }, [movieId])


  return (
    <section className= "main uk-height-viewport">
      <div className="uk-container-large uk-height-1-1">
        <div id="movieprofilecard" className= "uk-container uk-column-1-2 uk-position-center">
          {movie && 
          <div>
            <div className= "column is-half">
              <figure className= "image profile-poster">
                <img src={movie.poster}/>
              </figure>
            </div>
            <div id= "movieinfo" className= "column is-half">
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