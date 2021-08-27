import React from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
 
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
 
 
function Movies() {
  // const isLoading = !movies
  // const [marathons, setMarathons] = React.useState(null)
  const [movies, setMovies] = React.useState(null)
  const [genreValue, setGenreValue] = React.useState(null)
  const [runTimeValue, setRunTimeValue] = React.useState(null)
  const [formData, setFormData] = React.useState({
    genres: [],
    runtime: 1,
    breaks: '',
  
  })
 
  // React.useEffect(() => {
  //   const getMarathons = async () => {
  //     const res = await axios.get('/api/marathons')
  //     const movies = res.marathons
  //     setMarathons(res.data)
  //   }
  //   getMarathons()
  // console.log(marathons)
  // }, [ ])
 
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
 
  const handleTimeChange = (event) => {
    const bingeTime = event.target.value
    setFormData({ ...formData, [event.target.name]: bingeTime })
    setRunTimeValue(bingeTime)
  }


  const filterGenresOne = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[0]) && movie.runtime < runTimeValue
      })
    }
  }
 
  const filterGenresTwo = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[1]) && movie.runtime < runTimeValue
      })
    }
  }
 
  const filterGenresThree = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[2]) && movie.runtime < runTimeValue
      })
    }
  }
  
 
  return (
    <div className="main uk-section">
      <div className="sidebar uk-width-2-5">
        <div className="topten uk-text-center">Top 10</div>
      </div>
      <div className="container">
        <div className="tophalf">
          <div className="title">
            <h2>Choose Your Sprint!</h2>
            <p>In a rush with nothing to watch? Pick your genres and time below to help choose your perfect movie!</p>
          </div>
          <form>
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
            <div className="field">
              <label className="label-movies">Choose Your Maximum Time! (Mins)</label>
              <div className="control">
                <input
                  className="uk-input"
                  name="runtime"
                  type="number"
                  onChange={handleTimeChange}
                  value={formData.runtime}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="bottomhalf">
          <div className="movie">
            {genreValue &&
              movies &&
             filterGenresOne().map(movie =>
               <Link to={`/movies/${movie._id}`} key={movie._id}>
                 <div className="posters" key={movie._id} {...movie}>
                   <h2>{movie.title}</h2>
                   <p>⭐{movie.imdbrating}</p>
                   <img src={movie.poster}/>
                 </div>
               </Link>
             )}
            {genreValue &&
              movies &&
             filterGenresTwo().map(movie =>
               <Link to={`/movies/${movie._id}`} key={movie._id}>
                 <div className="posters" key={movie._id} {...movie}>
                   <h2>{movie.title}</h2>
                   <p>⭐{movie.imdbrating}</p>
                   <img src={movie.poster}/>
                 </div>
               </Link>
             )}
            {genreValue &&
              movies &&
             filterGenresThree().map(movie =>
               <Link to={`/movies/${movie._id}`} key={movie._id}>
                 <div className="posters" key={movie._id} {...movie}>
                   <h2>{movie.title}</h2>
                   <p>⭐{movie.imdbrating}</p>
                   <img src={movie.poster}/>
                 </div>
               </Link>
             )}
          </div>
        </div>
      </div>
    </div>
    
  )
}
 
export default Movies

