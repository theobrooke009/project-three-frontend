import React from 'react'
import axios from 'axios'

function AllMarathons() {
  const [marathons, setMarathons] = React.useState()
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/marathons')
      setMarathons(res.data)
    }
    getData()
    
  }, [ ])

  
  console.log('marathons appear', marathons)
  return (
    <div>
      {marathons && marathons.map(marathon => {
        return <h2 key={marathon._id}>{marathon.name}</h2>
      })}

    </div>
  )
}

export default AllMarathons