import React from 'react'
import Select from 'react-select'
import { Link, useHistory } from 'react-router-dom'
 
import axios from 'axios'
 
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
      const res = await axios.get('/api/movies')
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
  

  const addMovieToMarathon = (e) => {
    if (titleSelection.includes(e.target.className) &&
      (runtimeSelection.includes(e.target.id)) && 
      (posterSelection.includes(e.target.value))) {
      const titleIndex = titleSelection.indexOf(e.target.className)
      const runtimeIndex = runtimeSelection.indexOf(e.target.id)
      const posterIndex = posterSelection.indexOf(e.target.value)
      titleSelection.splice(titleIndex, 1)
      runtimeSelection.splice(runtimeIndex, 1)
      posterSelection.splice(posterIndex, 1)
      console.log('removed', titleSelection, runtimeSelection, posterSelection)
      e.target.textContent = 'Add To Marathon'
    } else {
      titleSelection.push(e.target.className) 
      runtimeSelection.push(e.target.id)
      posterSelection.push(e.target.value)
       
      console.log('added', titleSelection, runtimeSelection, posterSelection)
      e.target.textContent = 'ADDED!'
    }
    // marathonOfMovies.push(e.target.className)
  }  

  return (
    <div className="main uk-section uk-height-viewport">
      <div className="uk-container uk-column-1-1 uk-height-1-1">
        <div className="topten-container uk-position-center">
          <div className="topten uk-text-center">Binge: Top 10</div>
          <div className="topten-movies uk-grid uk-grid-medium">
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
          </div>
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
                  <label className="label">Pick Your Genres!</label>
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
              <button onClick={generateMarathon}>
              Generate Marathon!
              </button>
            </div>
          </form>
        </div>
        <div className="bottomhalf">
          <div className="movie">
            {genreValue &&
                movies &&
                filterGenresOne().map(movie =>
                  <>
                    <div 
                      className="posters" key={movie._id} {...movie}>
                      <div>
                        <h2>{movie.title}</h2>
                        <p>⭐{movie.imdbrating}</p>
                        <img className="showing" src={movie.poster}/>
                        <div className="hiding">
                          <Link to={`/movies/${movie._id}`} key={movie._id}>
                            <button>
                          Movie Info
                            </button>
                          </Link>
                          <button 
                            className={movie.title}
                            id={movie.runtime} 
                            value={movie.poster}
                            onClick={addMovieToMarathon}>
                          Add To Marathon
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            {genreValue &&
                movies &&
                filterGenresTwo().map(movie =>
                  <div className="posters" key={movie._id} {...movie}>
                    <h2>{movie.title}</h2>
                    <p>⭐{movie.imdbrating}</p>
                    <img src={movie.poster}/>
                  </div>
                )}
            {genreValue &&
                movies &&
                filterGenresThree().map(movie =>
                  <div className="posters" key={movie._id} {...movie}>
                    <h2>{movie.title}</h2>
                    <p>⭐{movie.imdbrating}</p>
                    <img src={movie.poster}/>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  
  )
}
 
export default Marathon

