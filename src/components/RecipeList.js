import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import RecipeCard from './RecipeCard';
import { Card } from 'semantic-ui-react'
import LoadingBar from './LoadingBar'

const RecipeList = () => {
  
  const {categoryId} = useParams()
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true);
  const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`;
  useEffect(() => {
    async function fetchData()
    {
      const raw = await fetch(API)
      const data = await raw.json()
      setFoods(data.meals)
      setLoading(false)
    }
    fetchData()
  },[])

  return (
    <>
    
    <h1>Browsing All: {categoryId}</h1>
    {loading ? <LoadingBar />:
    <Card.Group>
      {foods.map(el => (<RecipeCard key={el.idMeal} recipe={el}/>))}
    </Card.Group>
    }
    </>
  )
}

export default RecipeList