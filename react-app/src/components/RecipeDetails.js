import React, {useState, useEffect} from 'react'
import {Button} from 'semantic-ui-react'
import {useNavigate, useParams} from 'react-router-dom'
import LoadingBar from './LoadingBar'

const RecipeDetails = ({recipeId}) => {
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const params = useParams()
  const API =  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.mealId}`
  useEffect(() => {
    async function fetchData()
    {
      const raw = await fetch(API)
      const data = await raw.json()
      setLoading(false)
      setInfo(data.meals[0])
    }
    fetchData()
  },[])
  console.log(info)
  return (
    <>
    {loading ? 
    <>
      <LoadingBar /> 
      <Button onClick={() => navigate(`/browse/${params.categoryId}`)}>Go back</Button>
    </>
    : 
    <Button onClick={() => navigate(`/browse/${params.categoryId}`)}>Go back</Button>
    }
    
    </>
  )
}

export default RecipeDetails