import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import {useNavigate, useParams} from 'react-router-dom'

const FavoriteCard = ({recipe, handleClick, unFav}) => {
  const navigate = useNavigate()
  const params = useParams()
  const {strMealThumb, strMeal, idMeal} = recipe

  function handleClick()
  {
    navigate(`/favorites/${idMeal}`)
  }
  function handleButtonClick(e)
  {
    e.stopPropagation()
    const resp = window.confirm("Are you sure you want to un favorite this recipe?")
    if (resp)
        {
            unFav(recipe.id)
        }
  }
  return (
    <Card onClick={handleClick}>
    <Image src={strMealThumb} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{strMeal}</Card.Header>
      </Card.Content>
      <Card.Content extra>
                <Button onClick={handleButtonClick} icon size="small" circular floated="right" color="red">Remove</Button>
      </Card.Content>
  </Card>
  )
}

export default FavoriteCard