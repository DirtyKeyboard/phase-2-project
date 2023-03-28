import React, {useState, useEffect} from 'react'
import { Card, Message, Container, Header, Input, Divider } from 'semantic-ui-react'
import LocalCard from './LocalCard'

////<Container verticalAlign='middle' style={{ margin: '5em 0 0 0', padding: '0 0 5em  0' }}  >
//<Header as='h1' textAlign='left'>
const LocalRecipes = () => {
    const LOCAL = "http://localhost:4000/meals"
    const [foods, setFoods] = useState([])
    const [search, setSearch] = useState("")
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
    <Container verticalAlign='middle' style={{ margin: '5em 0 0 0', padding: '0 0 5em  0' }}  >
    <Header as='h1' textAlign='left'>Your Recipes</Header>
    {foods.length === 0 ? null : 
    <>
      <Input type="text" icon="search" fluid placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Divider/>
    </>}
    <Card.Group centered itemsPerRow={4} stackable>
        {search === "" ? foods.map(el => (<LocalCard key={el.id} recipe={el} deleteFood={deleteFood}/>)) :
        foods.map(el => {
        if (el.strMeal.toLowerCase().includes(search.toLowerCase()))
          return <LocalCard key={el.id} recipe={el} deleteFood={deleteFood}/>
        })}
        {foods.length === 0 ? <Message>
            <Message.Header>Nothing to show!</Message.Header>
            <p>
              It looks like you have not created any recipes yet, if you would like to create a new recipe, you can click <a href="/newrecipe">here</a>
            </p>
          </Message> : null}
    </Card.Group>
    </Container>
  )
}

export default LocalRecipes