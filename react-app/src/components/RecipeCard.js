import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const RecipeCard = () => {
  return (
    <Card>
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Chicken Pot Pie</Card.Header>
      <Card.Meta>
        <span className='date'>Dinner</span>
      </Card.Meta>
      <Card.Description>
        Chicken, Pot, Pie
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
       Area • Tags
    </Card.Content>
  </Card>
  )
}

export default RecipeCard