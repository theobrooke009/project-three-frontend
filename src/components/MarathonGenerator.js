import { titleSelection, posterSelection } from './Marathon.js'
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


function MarathonGenerator() {
  const [playlistData, setPlaylistData] = React.useState(titleSelection)
  // const [newFilm, setNewFilm] = React.useState('')
  const history = useHistory()
  // const [formData, setFormData] = React.useState({
  //   titleone: '',
  //   titletwo: '',
  //   titlethree: '',
  //   titlefour: '',
  //   titlefive: '',
  //   titlesix: '',
  //   titleseven: '',
  //   titleeight: '',
  //   titlenine: '',
  //   titleten: '',
  //   name: '',
  // })
  
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
    <div className="main uk-section uk-height-viewport">
      <div className="uk-container uk-column-1-1 uk-height-1-1">
        <div className="form-section uk-container">
          <div className="form-container">  
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label"></label>
                <div className="control">
                  <div className="marathon uk-text-center">Create Your Marathon Name:</div>
                  <input
                    className="uk-input"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={playlistData.name}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="uk-button uk-button-danger uk-button-large uk-width-1-1 uk-margin-medium-top uk-margin-medium-bottom"
                onSubmit={handleSubmit}>
                    Submit Marathon!
              </button>
              <div className="field">
                <label className="label-movies"></label>
                <div id="hideme" className="control">
                  <input
                    className="uk-input"
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
          </div>
        </div>
      </div>
    </div>
  

  )
}

export default MarathonGenerator