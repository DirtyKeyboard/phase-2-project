import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from './LoadingBar';
import RecipeCard from './RecipeCard';
import {v4 as uuidv4} from 'uuid';
import { Card } from 'semantic-ui-react';

const FavoriteList = () => {
  /*
    RecipeCard takes handleClick prop, that describes click action
    RecipeDetails takes goBack prop, goBack = navigate('/favorites')
  */
  //const API =  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data[index].foodId}`
  
  const API =  'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
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
    <Card.Group>
      {loading ? <LoadingBar /> :
      data.map(el => (<RecipeCard key={el.id} recipe={el}
      handleClick={() => navigate(`/favorites/${el.idMeal}`)}/>))
      }
    </Card.Group>
    </>
  )
}

export default FavoriteList