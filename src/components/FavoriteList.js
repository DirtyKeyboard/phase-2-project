import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from './LoadingBar';
import RecipeCard from './RecipeCard';

const FavoriteList = () => {
  /*
    RecipeCard takes handleClick prop, that describes click action
    RecipeDetails takes goBack prop, goBack = navigate('/favorites')
  */
  const navigate = useNavigate() 
  const DB = "http://localhost:4000/favorites"
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData()
    {
      const raw = await fetch(DB)
      const data = await raw.json()
      setData(data)
      setLoading(false)
    }
    fetchData()
  },[])
  return (
    <>
      <h1>Favorites</h1>
      {loading ? <LoadingBar /> : 
      <h1>loaded</h1>
      }
    </>
  )
}

export default FavoriteList