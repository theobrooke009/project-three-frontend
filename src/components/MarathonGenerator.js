import { titleSelection, posterSelection } from './Marathon.js'
import React from 'react'
// import axios from 'axios'

// const initialState = {
//   'name': 'hi',
// }

console.log(titleSelection)

function MarathonGenerator() {
  const [playlistData, setPlaylistData] = React.useState(titleSelection)

  
  const handleChange = e => {
    setPlaylistData({ ...playlistData, [e.target.name]: e.target.value })
    console.log(playlistData)
  } 

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(playlistData)
    // try {
    //   const { data } = await axios.post('/api/players', playlistData)
    //   history.push(`/players/${data._id}`)
    //   console.log(data._id)
    // } catch (err) {
    //   console.log(err)
    // }
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
          <div className="control">
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

