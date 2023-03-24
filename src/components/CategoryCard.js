import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Navigate, useNavigate} from 'react-router-dom'

const CategoryCard = ({category}) => {
  const navigate = useNavigate()
  function handleClick()
  {
    navigate(`/browse/${category.strCategory.toLowerCase()}`)
  }
  return (
    <Card onClick={handleClick}>
    <Image src={category.strCategoryThumb} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{category.strCategory}</Card.Header>
    </Card.Content>
  </Card>
  )
}

export default CategoryCard