import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from './LoadingBar';
import RecipeCard from './RecipeCard';
import { Card, Container, Header, Message, Input, Divider } from 'semantic-ui-react';
import FavoriteCard from './FavoriteCard';

const FavoriteList = () => {
  const API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
  const navigate = useNavigate()
  const DB = "http://localhost:4000/favorites"
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  useEffect(() => {
    async function fetchData() {
      const raw = await fetch(DB)
      const data = await raw.json()
      setData(data)
      setLoading(false)
    }
    fetchData()
  }, [])
  async function unFav(favId)
  {
    await fetch(`${DB}/${favId}`, {method:'DELETE'})
    const newData = data.filter(el => (el.id !== favId))
    setData(newData)
  }
  return (
    <Container verticalAlign='middle' style={{ margin: '5em 0 0 0', padding: '0 0 5em  0' }}  >
      <Header as='h1' textAlign='left'>Favorites</Header>
      {data.lenght === 0 ? 
      <>
      <Input type="text" icon="search" fluid placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Divider/>
      </>
      :
      null}
      

      {loading ? <LoadingBar /> : null}
      <Card.Group centered itemsPerRow={4} stackable>
        {loading ? null : 

          search === "" ? 
          data.map(el => (<FavoriteCard key={el.id} recipe={el} unFav={unFav}/>))
          :
          data.map(el => {
            if (el.strMeal.toLowerCase().includes(search.toLowerCase()))
            return <FavoriteCard key={el.id} recipe={el} unFav={unFav}/>})
        }
         {data.length === 0 ? <Message>
            <Message.Header>Nothing to show!</Message.Header>
            <p>
              It looks like you don't have any recipes favorited, to view our recipes, you can click <a href="/browse">here</a>
            </p>
          </Message>
          : null}
      </Card.Group>
    </Container>
  )
}

export default FavoriteList