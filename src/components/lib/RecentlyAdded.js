import React from 'react'
import axios from 'axios'


function GetTiles() {
  const [movies, setMovies] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/movies')
      setMovies(res)
      console.log('movies', movies)
    }
    getData()

  }, [])
 
  function getMostRecent() {
    if (movies) {
      const firstIndex = movies.data.length - 1
      const firstFilm = movies.data[firstIndex]
      const secondFilm = movies.data[firstIndex - 1]
      const thirdFilm = movies.data[firstIndex - 2]
      const fourthFilm = movies.data[firstIndex - 3]
      const fifthFilm = movies.data[firstIndex - 4]
      console.log(firstIndex)
      const recentlyAdded = [firstFilm, secondFilm, thirdFilm, fourthFilm, fifthFilm]

      return recentlyAdded
    }
  }
  
  console.log(getMostRecent())
  return (
    <>
      <h1>Recently Added</h1>
      {movies && getMostRecent().map(movie => {
        <div className = "posters" key={movie._id}>
          <h2>{movie.title}</h2>
          <img src={movie.poster}></img>
        </div>
      })}
      
    </>
  )
}

export default GetTiles