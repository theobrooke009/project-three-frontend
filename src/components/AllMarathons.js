import React from 'react'
import axios from 'axios'

import { titleSelection } from './Marathon.js'

function AllMarathons() {
  const [marathons, setMarathons] = React.useState()
  console.log(marathons)
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/marathons')
      setMarathons(res.data)
    }
    getData()
    
  }, [ ])

  
  console.log('marathons appear', titleSelection)
  return (
    <div>
      {marathons && marathons.map(marathon => {
        <h2 key={marathon._id}>{marathon.muffin}</h2>
      })}
      
    </div>
  )
}

export default AllMarathons