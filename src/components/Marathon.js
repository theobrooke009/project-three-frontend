import React from 'react'
import Select from 'react-select'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../config'
 
const genreOptions = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Biography', label: 'Biography' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Family', label: 'Family' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'History', label: 'History' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Music', label: 'Music' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
  { value: 'Short', label: 'Short' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'War', label: 'War' }
]
 
export const titleSelection = []
export const runtimeSelection = []
export const posterSelection = []
 
function Marathon() {
  const history = useHistory()
  const [movies, setMovies] = React.useState(null)
  const [genreValue, setGenreValue] = React.useState(null)
  const [formData, setFormData] = React.useState({
    genres: [],
    runtime: 1,
    breaks: '',
  
  })
 
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${baseUrl}/movies`)
      setMovies(res.data)
    }
    getData()
 
  }, [ ])

  
  
  const handleGenreChange = (selected, name) => {
    const selectedGenres = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: selectedGenres })
    setGenreValue(selectedGenres)
  }
  const filterGenresOne = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[0])
      })
    }
  }
 
  const filterGenresTwo = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[1])
      })
    }
  }
 
  const filterGenresThree = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[2])
      })
    }
  }
  const generateMarathon = () => {
    history.push('/marathongenerator')
  }

  console.log('right here', movies)
  
  const addMovieToMarathon = (e) => {
    if (titleSelection.includes(e.target.id) &&
      (titleSelection.includes(e.target.id)) && 
      (posterSelection.includes(e.target.value))) {
      const titleIndex = titleSelection.indexOf(e.target.id)
      const posterIndex = titleSelection.indexOf(e.target.value)
      titleSelection.splice(titleIndex, 1)
      posterSelection.splice(posterIndex, 1)
      console.log('removed', titleSelection, posterSelection)
      e.target.textContent = 'Add To Marathon'
    } else {
      titleSelection.push(e.target.id) 
      posterSelection.push(e.target.value)
       
      console.log('added', titleSelection, runtimeSelection, posterSelection)
      e.target.textContent = 'ADDED!'
    }
    // marathonOfMovies.push(e.target.className)
  }  
  return (
    <div className="main uk-section uk-height-viewport uk-background-cover">
      <div className="uk-container uk-column-1-1 uk-height-1-1">
        <div className="topten-container uk-position-center">
          {/* <div className="topten uk-text-center">Binge: Top 10</div> */}
          {/* <div className="topten-movies uk-grid uk-grid-medium">
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
            <div className="uk-card uk-card-default uk-card-body">Item</div>
          </div> */}
        </div>
        <div className="form-section uk-container">
          <div className="tophalf">
            <div className="marathon uk-text-center">Choose Your Marathon Or Create Your Own!</div>
            <div className="marathon-info uk-text-center">Plan your perfect movie night in with our marathon creator! Browse through marathons users have already created or choose your own!</div>
          </div>
          <form>
            <div className="form-container">
              <div className="searchbar">
                <div className="field">
                  <label className="label-movies">Pick Your Genres!</label>
                  <div className="control">
                    <Select
                      options={genreOptions}
                      isMulti
                      onChange={selected =>
                        handleGenreChange(selected, 'genres')
                      }
                      value={formData.genres.map(item => ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="field">
                <label className="label">Pick The Amount Of Breaks!</label>
                <div className="select">
                  <select
                    name="breaks"
                    onChange={handleBreaksChange}
                    value={formData.breaks}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div> */}
              <button className="uk-button-secondary uk-button-large" onClick={generateMarathon}>
              Generate Marathon!
              </button>
            </div>
          </form>
        </div>
        <div className="topten-movies">
          <div className="movie uk-grid uk-grid-medium">
            {genreValue &&
                movies &&
                filterGenresOne().map(movie =>
                  <>
                    <div 
                      className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                      <div className="movie-cards">
                        {/* <h2 className="title">{movie.title}</h2> */}
                        {/* <p>:star:{movie.imdbrating}</p> */}
                        <img className="showing" src={movie.poster}/>
                        <div className="hiding uk-button-group">
                          <Link to={`/movies/${movie._id}`} key={movie._id}>
                            <button className="uk-button uk-button-secondary uk-button-small">
                          Info
                            </button>
                          </Link>
                          <button 
                            className="uk-button uk-button-secondary uk-button-small"
                            id={movie.title} 
                            value={movie.poster}
                            onClick={addMovieToMarathon}>
                          Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            {genreValue &&
                movies &&
                filterGenresTwo().map(movie =>
                  <>
                    <div 
                      className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                      <div className="movie-cards">
                        {/* <h2 className="title">{movie.title}</h2> */}
                        {/* <p>:star:{movie.imdbrating}</p> */}
                        <img className="showing" src={movie.poster}/>
                        <div className="hiding uk-button-group">
                          <Link to={`/movies/${movie._id}`} key={movie._id}>
                            <button className="uk-button uk-button-secondary uk-button-small">
                          Info
                            </button>
                          </Link>
                          <button 
                            className="uk-button uk-button-secondary uk-button-small"
                            id={movie.title} 
                            value={movie.poster}
                            onClick={addMovieToMarathon}>
                          Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            {genreValue &&
                movies &&
                filterGenresThree().map(movie =>
                  <>
                    <div 
                      className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                      <div className="movie-cards">
                        {/* <h2 className="title">{movie.title}</h2> */}
                        {/* <p>:star:{movie.imdbrating}</p> */}
                        <img className="showing" src={movie.poster}/>
                        <div className="hiding uk-button-group">
                          <Link to={`/movies/${movie._id}`} key={movie._id}>
                            <button className="uk-button uk-button-secondary uk-button-small">
                          Info
                            </button>
                          </Link>
                          <button 
                            className="uk-button uk-button-secondary uk-button-small"
                            id={movie.title} 
                            value={movie.poster}
                            onClick={addMovieToMarathon}>
                          Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
          </div>
        </div>
      </div>
    </div>
  
  )
}
 
export default Marathon