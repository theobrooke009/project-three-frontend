import { marathonSelection } from './Marathon.js'


function MarathonGenerator() {
  console.log(marathonSelection[0])
  

  return (
    <div>
      {marathonSelection.map(item =>
        <img key={item} src={item}/>

      )}
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

