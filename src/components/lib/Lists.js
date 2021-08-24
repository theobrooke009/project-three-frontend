import React from 'react'
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

function getGenreOne(){
  const randomNumber = Math.floor(Math.random() * genreOptions.length)
  return genreOptions[randomNumber].label
}

function getGenreTwo(){
  const randomNumber = Math.floor(Math.random() * genreOptions.length)
  return genreOptions[randomNumber].label
}

function Lists() {
  const [movies, setMovies] = React.useState(null)
  const [genre] = React.useState(getGenreOne())
  const [genreTwo] = React.useState(getGenreTwo())

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/movies')
      setMovies(res)
     
    }
    getData()
 
  }, [ ])
  console.log('genre', genre)
  console.log('genre two', genreTwo)

  function filteredMovies() {
    const newMovies = movies.data.filter(movie => {
      return movie.genre.includes(genre)
    })
    return newMovies
  }

  function filteredMoviesTwo() {
    const newMovies = movies.data.filter(movie => {
      return movie.genre.includes(genreTwo)
    })
    return newMovies
  }

  function topFiveListOne() {
    if (movies && genre) {
      const topFive = filteredMovies()
      topFive.sort((a, b) => b.imdbRating - a.imdbRating)
      return topFive.slice(0, 5)
    }
  }
 
  function topFiveListTwo(){
    if (movies && genre) {
      const topFiveTwo = filteredMoviesTwo()
      topFiveTwo.sort((a, b) => b.imdbRating - a.imdbRating)
      return topFiveTwo.slice(0, 5)
    }
  }
  console.log('top five one here', topFiveListOne())
  console.log('top five two here', topFiveListTwo())
  
  
  return (
    <>
      <div>
        <h3>Top 5 {genre}</h3>
        {movies && genre && topFiveListOne().map(movie => {
          <div className = "posters" key={movie._id}>
            <h2>{movie.title}</h2>
            <img src={movie.poster}></img>
          </div>
        })}
      </div>
      <div>
        <h3>Top 5 {genreTwo}</h3>
        {movies && genre && topFiveListTwo().map(movie => {
          <div className = "posters" key={movie._id}>
            <h2>{movie.title}</h2>
            <img src={movie.poster}></img>
          </div>
        })}
      </div>
    </>

  )
  

}

export default Lists
