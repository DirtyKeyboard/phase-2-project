import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const LocalCard = ({ recipe, deleteFood }) => {
    const {strMealThumb, strMeal, strDateAdded} = recipe
    const navigate = useNavigate()
    function handleCardClick(e)
    {
        navigate(`/local/${recipe.id}`)
    }
    async function handleButtonClick(e)
    {
        e.stopPropagation()
        let confirmAction = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmAction) {
            await fetch(`http://localhost:4000/meals/${recipe.id}`,{method: 'DELETE'})
            deleteFood(recipe.id)
        } 
    }
    return (
        <Card onClick={handleCardClick}>
            <Image src={strMealThumb} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{strMeal}</Card.Header>
            </Card.Content>
            <Card.Meta>
             <span className='date'>Added: {strDateAdded}</span>
            </Card.Meta>
            <Card.Content extra>
                <Button onClick={handleButtonClick} icon floated="right" color="red"><Icon name="delete" /></Button>
            </Card.Content>
        </Card>
    )
}

export default LocalCard