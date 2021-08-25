import React, { useState } from 'react'
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
 
const marathonSelection = []
 
function Marathon() {
  // const isLoading = !movies
  // const [marathons, setMarathons] = React.useState(null)

  const [movies, setMovies] = React.useState(null)
  const [genreValue, setGenreValue] = React.useState(null)
  const [runTimeValue, setRunTimeValue] = React.useState(null)
  const [marathonisShown, setMarathonIsShown] = useState(false)
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

  const handleBreaksChange = (event) => {
    const numberBreaks = event.target.value
    setFormData({ ...formData, [event.target.name]: numberBreaks })
    console.log(numberBreaks)
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

  
  //! Stretch goal below!

  // function movieHoverOn(e) {
  //   e.target.classList.add('hovered')
  //   console.log('hover on movie')
  // }

  // function movieHoverOff(e) {
  //   console.log('hover on movie')
  //   e.target.classList.remove('hovered')
  // }

  const addMovieToMarathon = (e) => {
    setMarathonIsShown(true)
    if (marathonSelection.includes(e.target.id)) {
      const index = marathonSelection.indexOf(e.target.id)
      marathonSelection.splice(index, 1)
      console.log('removed', marathonSelection)
      e.target.textContent = 'Add To Marathon'
    } else {
      marathonSelection.push(e.target.id)
      console.log('added', marathonSelection)
      e.target.textContent = 'ADDED!'
    }
  }


  return (
    <section>
      <div className="topten">
        <h2>Top 10</h2>
      </div>
      <div className="container">
        <div className="tophalf">
          <div className="title">
            <h2>Choose Your Marathon Or Create Your Own!</h2>
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
              <label className="label">Pick Your Binge Time! (Minutes)</label>
              <div className="control">
                <input
                  className="input"
                  name="runtime"
                  type="number"
                  onChange={handleTimeChange}
                  value={formData.runtime}
                />
              </div>
            </div>
            <div className="field">
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
            </div>
          </form>
        </div>
        <div className="bottomhalf">
          <div className="movie">
            <h2>Binge Info!</h2>
            {genreValue &&
              movies &&
             filterGenresOne().map(movie =>
               <>
                 <div 
                   //  onMouseEnter={movieHoverOn} 
                   //    onMouseLeave={movieHoverOff}
                   className="posters" key={movie._id} {...movie}>
                   <div>
                     <h2>{movie.title}</h2>
                     <img className="showing" src={movie.poster}/>
                     <div className="hiding">
                       <Link to={`/movies/${movie._id}`} key={movie._id}>
                         <button>
                        Movie Info
                         </button>
                       </Link>
                       <button id={movie._id} onClick={addMovieToMarathon}>
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
                 <img src={movie.poster}/>
               </div>
             )}
            {genreValue &&
              movies &&
             filterGenresThree().map(movie =>
               <div className="posters" key={movie._id} {...movie}>
                 <h2>{movie.title}</h2>
                 <img src={movie.poster}/>
               </div>
             )}
          </div>
          <div className="movies">
            <h1>Marathon Playlist</h1>
            {marathonisShown && 
            marathonSelection.map(marathon =>
              <div key={marathon}>
                <p>{marathon}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
 
export default Marathon

