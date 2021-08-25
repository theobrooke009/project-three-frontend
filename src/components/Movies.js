import React from 'react'
import Select from 'react-select'
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios'


const genreOptions = [
  { value: 'action', label: 'Action' },
  { value: 'animation', label: 'Animation' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Horror' },
  { value: 'romance', label: 'Romance' },
  { value: 'scifi', label: 'Sci-Fi' },
  { value: 'thriller', label: 'Thriller' }
]

function Movies() {
  const history = useHistory()
  const [data, setData] = React.useState(null)
  const [formData, setFormData] = React.useState({
    genres: [],
    runtime: 1,
    quantity: 1,
    breaks: '',
  })

  //! NEED TO ADD FUNTIONALITY SO ZERO CANNOT BE SELECTED ON RUNTIME AND QUANTITY

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/movies')
      const movies = res.data
      setData(movies)
    }
    getData()
    
  }, [ ])

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: selectedItems })
    console.log(selectedItems)
  }

  const handleChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, [event.target.name]: value })
    console.log(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // window.alert(`Submitting ${JSON.stringify(formData, null, 2)}
    history.push('/marathon')


  }
  
  return (
    <div className="main uk-section">
      <div className="sidebar uk-width-2-5">
        <div className="topten uk-text-center">Top 10</div>
      </div>
      <div className="form-section uk-width-3-5">
        <div className="create">Create Your Binge Session</div>
        <form onSubmit={handleSubmit}>
          <div className="searchbar">
            <div className="field">
              <label className="label-movies">Pick Your Genres!</label>
              <div className="control">
                <Select
                  options={genreOptions}
                  isMulti
                  onChange={selected =>
                    handleMultiSelectChange(selected, 'genres')
                  }
                  value={formData.genres.map(item => ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label-movies">Pick Your Binge Time! (Minutes)</label>
            <div className="control">
              <input
                className="uk-input"
                name="runtime"
                type="number"
                onChange={handleChange}
                value={formData.runtime}
              />
            </div>
          </div>
          <div className="field">
            <label className="label-movies">Pick Your Quantity Of Movies!</label>
            <div className="control">
              <input
                className="uk-input"
                name="quantity"
                type="number"
                onChange={handleChange}
                value={formData.quantity}
              />
            </div>
          </div>
          <div className="field">
            <label className="label-movies">Pick The Amount Of Breaks!</label>
            <div className="control">
              <input
                className="uk-input"
                name="breaks"
                type="number"
                onChange={handleChange}
                value={formData.breaks}
              />
            </div>
            <div className="field">
              <button type="submit" className="create-binge uk-button uk-button-danger uk-button-large uk-width-1-1 uk-margin-small-top">
                  Create your Binge!
              </button>
            </div>
          </div>
        </form> 
        <div className="index uk-section">
          <div className="movie-index">This is Movie Index</div>
          <div className="uk-child-width-1-2@m" uk-grid>
            <div>
              <div className="uk-card uk-card-default">
                <div classN="uk-card-media-top">
                  {/* <img src={movie.poster} alt={movie.title} /> */}
                </div>
                <div className="uk-card-body">
                  <h3 className="uk-card-title">Media Top</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                </div>
              </div>
            </div>
            {data && data.map(movie => (
              <Link to={`/movies/${movie._id}`} key={movie._id}>
                <div className="movie">
                  <img className="posters" src={movie.poster}></img>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Movies 