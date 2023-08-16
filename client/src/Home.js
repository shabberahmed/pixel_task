import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='home'>
        <div>
        <button><Link style={{textDecoration:'none'}} to='/node'>Node task</Link></button>
        </div>
      <div>
      <button><Link style={{textDecoration:'none'}} to='/react'>React task</Link></button>
      </div>
    </div>
  )
}

export default Home