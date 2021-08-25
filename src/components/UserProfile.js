import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { userId } = useParams()
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/user/${userId}`)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    

  }, [userId])


  return (
    <section className= "section">
      <div id="playerProfileContainer" className= "container">
        <div id="playerProfileColumns" className= "columns">
          {user && 
          <div>
            <div className= "column is-half">
              <figure className= "image">
                <img src={user.avatar}/>
              </figure>
            </div>
            <div className= "column is-half">
              <h2>{user.username}</h2>
              <p><strong>Email:</strong> {user.email}</p>

            </div>
          </div>
          }
        </div>
      </div>
    </section>
  )
}

export default UserProfile