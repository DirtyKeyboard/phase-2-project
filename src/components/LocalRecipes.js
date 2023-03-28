import React, {useState, useEffect} from 'react'
import { Card, Message } from 'semantic-ui-react'
import LocalCard from './LocalCard'

const LocalRecipes = () => {
    const LOCAL = "http://localhost:4000/meals"
    const [foods, setFoods] = useState([])
    useEffect(() => {
        async function fetchData()
        {
            const raw = await fetch(LOCAL)
            const data = await raw.json()
            setFoods(data)
        }
        fetchData()
    },[])
    function deleteFood(foodId)
    {
        const newFoods = foods.filter(el => (el.id !== foodId))
        setFoods(newFoods)
    }
  return (
    <>
    <h1>Your Recipes</h1>
    <Card.Group>
        {foods.map(el => (<LocalCard key={el.id} recipe={el} deleteFood={deleteFood}/>))}
        {foods.length === 0 ? <Message>
            <Message.Header>Nothing to show!</Message.Header>
            <p>
              It looks like you have not created any recipes yet, if you would like to create a new recipe, you can click <a href="/newrecipe">here</a>
            </p>
          </Message> : null}
    </Card.Group>
    </>
  )
}

export default LocalRecipes