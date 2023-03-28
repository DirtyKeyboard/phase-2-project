import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecipeCard from './RecipeCard';
import { Card, Form, Input, TextArea, Button, Container, Header } from 'semantic-ui-react'
import LoadingBar from './LoadingBar'


const RecipeList = () => {

  const { categoryId } = useParams()
  const [foods, setFoods] = useState([])
  const [localFoods, setLocalFoods] = useState([])
  const [loading, setLoading] = useState(true);
  const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`;
  const LOCALDB = 'http://localhost:4000/meals'
  useEffect(() => {
    async function fetchData() {
      const localRaw = await fetch(LOCALDB)
      const localData = await localRaw.json()

      const raw = await fetch(API)
      const data = await raw.json()
      setFoods(data.meals)
      setLocalFoods(localData)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Container verticalAlign='middle' style={{ margin: '5em 0 0 0', padding: '0 0 5em  0' }}  >

      <Header as='h1' textAlign='left'>Browsing All: {categoryId}</Header>
      {loading ? <LoadingBar /> :
        <Card.Group centered itemsPerRow={4} stackable>
          {localFoods.map(el => (<RecipeCard key={el.idMeal} recipe={el} handleClick={() => alert('hi')} />))}
          {foods.map(el => (<RecipeCard key={el.idMeal} recipe={el} />))}
        </Card.Group>
      }
    </Container>
  )
}

export default RecipeList