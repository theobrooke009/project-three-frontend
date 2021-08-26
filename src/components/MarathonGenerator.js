import { titleSelection, posterSelection } from './Marathon.js'
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


// const initialState = {
//   'name': 'hi',
// }


function MarathonGenerator() {
  const [playlistData, setPlaylistData] = React.useState(titleSelection)
  const [newFilm, setNewFilm] = React.useState('')
  const history = useHistory()

  
  const handleChange = e => {
    setPlaylistData({ ...playlistData, [e.target.name]: e.target.value })
    console.log('here 18', playlistData)
  } 

  const handleFilm = e => {
    setNewFilm({ ...newFilm, [e.target.name]: e.target.value })
    console.log(newFilm)
  } 

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(playlistData)
    try {
      const { data } = await axios.post('/api/marathons', newFilm)
      history.push('/marathons')
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label"></label>
          <div className="control">
            <h2>Create Your Marathon Name:</h2>
            <input
              className="input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={playlistData.name}
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="button is-black is-fullwidth"
          onSubmit={handleSubmit}>
              Submit Marathon!
        </button>
        <div className="field">
          <label className="label"></label>
          <div id="hideme" className="control">
            <input
              className="input"
              placeholder=""
              name="title"
              onChange={handleFilm}
              value={titleSelection}
            />
          </div>
        </div>
        <div>
        </div>
        <div>
          {posterSelection.map(poster =>
            <img key={poster} value={playlistData.poster} src={poster}/>
          )}
        </div>
      </form>
    </section>
  

  )
}

export default MarathonGenerator

