import React from 'react'
import chefhat from '../pictures/chefhat.jpg';

const Home = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ color: "red" }}>Find That Recipe</h1>
              <img src={chefhat} alt="Landing Page" style={{ maxWidth: "100%", maxHeight: "50vh" }} />
            </div>
          </div>
  )
}

export default Home