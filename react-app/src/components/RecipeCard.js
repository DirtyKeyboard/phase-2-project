import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import {useNavigate, useParams} from 'react-router-dom'

const RecipeCard = ({recipe}) => {
  const navigate = useNavigate()
  const params = useParams()
  const {strMealThumb, strMeal, idMeal} = recipe

  function handleClick()
  {
    // idMeal
    // params.categoryId
    navigate(`/browse/${params.categoryId}/${idMeal}`)
  }
  return (
    <Card onClick={handleClick}>
    <Image src={strMealThumb} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{strMeal}</Card.Header>
      </Card.Content>
  </Card>
  )
}

export default RecipeCard