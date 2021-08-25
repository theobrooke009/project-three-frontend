import marathonSelection from './Marathon.js'


function MarathonGenerator() {
  return (
    <div>
      {console.log(marathonSelection)}
      <h1>sup</h1>
      <h2>{marathonSelection}</h2>
    </div>
    /* <div className="movies">
<h1>Marathon Playlist</h1>
{marathonisShown && 
generateMarathon().map(movie =>
  <div key={movie._id}>
    <p>{movie.title}</p>
  </div>
)}
</div> */


  )
}

export default MarathonGenerator

