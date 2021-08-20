import React from 'react'
import Select from 'react-select'
// import axios from 'axios'

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
  // const [data, setData] = React.useState(null)
  const [bingeInfoIsShown, setBingeInfoIsShown] = React.useState(false)
  const [formData, setFormData] = React.useState({
    genres: [],
    runtime: 1,
    quantity: 1,
    breaks: '',
  })

  //! NEED TO ADD FUNTIONALITY SO ZERO CANNOT BE SELECTED ON RUNTIME AND QUANTITY

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get('/api/movies')
  //     const movies = res.data
  //     setData(movies)
  //   }
  //   getData()
    
  // }, [ ])

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

  //! NEED TO STOP TOGGLE OF SHOWING BINGE INFO

  const handleSubmit = (event) => {
    event.preventDefault()
    setBingeInfoIsShown(!bingeInfoIsShown)
    // window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)


  }
  
  return (
    <section>
      <div className="topten">
        <h2>Top 10</h2>
      </div>
      <div className="container">
        <div className="tophalf">
          <div className="title">
            <h2>Welcome to Binge!</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="searchbar">
              <div className="field">
                <label className="label">Pick Your Genres!</label>
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
              <label className="label">Pick Your Binge Time! (Minutes)</label>
              <div className="control">
                <input
                  className="input"
                  name="runtime"
                  type="number"
                  onChange={handleChange}
                  value={formData.runtime}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Pick Your Quantity Of Movies!</label>
              <div className="control">
                <input
                  className="input"
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                  value={formData.quantity}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Pick The Amount Of Breaks!</label>
              <div className="control">
                <input
                  className="input"
                  name="breaks"
                  type="number"
                  onChange={handleChange}
                  value={formData.breaks}
                />
              </div>
              <div className="field">
                <button className="button" type="submit">
                Binge It!
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bottomhalf">
          {bingeInfoIsShown && 
          <div className="bingeinfo">
            <h2>This is the binge info</h2>
          </div>
          }
          <div className="movies">
            <h2>This is Movie Index</h2>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Movies 