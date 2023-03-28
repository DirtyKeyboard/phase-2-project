import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from './LoadingBar';
import RecipeCard from './RecipeCard';
import { Card, Message } from 'semantic-ui-react';

const FavoriteList = () => {
  const API =  'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
  const navigate = useNavigate() 
  const DB = "http://localhost:4000/favorites"
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData()
    {
      const raw = await fetch(DB)
      const data = await raw.json()
      setData(data)
      setLoading(false)
    }
    fetchData()
  },[])
  return (
    <>
    <h1>Favorites</h1>
    {loading? <LoadingBar /> : null}
    <Card.Group>
      {loading ? null :
      data.map(el => (<RecipeCard key={el.id} recipe={el}
      handleClick={() => navigate(`/favorites/${el.idMeal}`)}/>))
      }
      {data.length === 0 ? <Message>
            <Message.Header>Nothing to show!</Message.Header>
            <p>
              It looks like you don't have any recipes favorited, to view our recipes, you can click <a href="/browse">here</a>
            </p>
          </Message>
          : null}
    </Card.Group>
    </>
  )
}

export default FavoriteList