import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import {useNavigate, useParams} from 'react-router-dom'

const RecipeCard = ({recipe, handleClick}) => {
  const navigate = useNavigate()
  const params = useParams()
  const {strMealThumb, strMeal, idMeal} = recipe
  
  return (
    <Card onClick={handleClick ? handleClick : () => navigate(`/browse/${params.categoryId}/${idMeal}`)}>
    <Image src={strMealThumb} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{strMeal}</Card.Header>
      </Card.Content>
  </Card>
  )
}

export default RecipeCard