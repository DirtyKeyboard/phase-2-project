import React from 'react'
import { Card, Container, Header } from 'semantic-ui-react'
import CategoryCard from './CategoryCard'

const CategoryFilter = ({ cats }) => {



  return (
    <Container verticalAlign='middle' style={{ margin: '6em 0 2em 0', minHeight: "80vh" }}  >
      <Header as='h1' textAlign='left'>Browsing All Categories</Header>
      <Card.Group centered itemsPerRow={4} stackable>
        {cats.map(el => (<CategoryCard key={el.idCategory} category={el} />))}
      </Card.Group>
    </Container>
  )
}

export default CategoryFilter