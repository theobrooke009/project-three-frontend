import { titleSelection, posterSelection } from './Marathon.js'
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


function MarathonGenerator() {
  const [playlistData, setPlaylistData] = React.useState(titleSelection)
  // const [newFilm, setNewFilm] = React.useState('')
  const history = useHistory()
 
  
  const handleChange = e => {
    // console.log(playlistData.name)
    console.log('value', playlistData)

    setPlaylistData({ ...playlistData, [e.target.name]: e.target.value })
    // setPlaylistData([ ...playlistData ])
    console.log('here 18', playlistData)
  } 

  // const handleFilm = e => {
  //   setNewFilm({ ...newFilm, [e.target.name]: e.target.value })
  //   console.log(e.target.name)
  // } 

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(playlistData)
    playlistData.push(titleSelection)
    try {
      const { data } = await axios.post('/api/marathons', playlistData)
      console.log(titleSelection)
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
              onChange={handleChange}
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

