import React from 'react'
import { Card } from 'semantic-ui-react'
import CategoryCard from './CategoryCard'

const CategoryFilter = ({cats}) => {
    
  

  return (
    <Card.Group>
        {cats.map(el => (<CategoryCard key={el.idCategory} category={el}/>) )}
    </Card.Group>
  )
}

export default CategoryFilter