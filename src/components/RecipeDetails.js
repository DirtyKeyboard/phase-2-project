import React, {useState, useEffect} from 'react'
import {Button, Image, Divider, Segment, Icon, Container, Header} from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import LoadingBar from './LoadingBar'
import {v4 as uuidv4} from 'uuid';

const RecipeDetails = ({goBack, setCurrentCat}) => {
  const [favorites, setFavorites] = useState([])
  const [showVideo, setShowVideo] = useState(true)
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const API =  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.mealId}`
  const DB = 'http://localhost:4000/favorites'
  setCurrentCat(params.categoryId)
  useEffect(() => {
    async function fetchData()
    {
      const rawApi = await fetch(API)
      const dataApi = await rawApi.json()
      const rawDb = await fetch(DB)
      const dataDb = await rawDb.json();

      setLoading(false)
      setInfo(dataApi.meals[0])
      setFavorites(dataDb)
    }
    fetchData()
  },[])
  const ingredients = [];
  let done = false;
  let i = 1;
  while(!done)
  {
    if (info["strIngredient"+i])
    {
      ingredients.push(info["strMeasure"+i] + " " + info["strIngredient"+i])
      i++;
    }
    else
      done = true;
  }

  function getLink()
  {
    const b = info.strYoutube.indexOf('=') + 1
    const newLink = "https://youtube.com/embed/"+info.strYoutube.substring(b)
    return newLink;
  }

  let isThisAFavorite = false;
  favorites.forEach(el => {
    if (el.idMeal === info.idMeal)
      isThisAFavorite = true;
  })

  async function handleFavorite()
  {
    if (!isThisAFavorite)
    {
      const newFav = {idMeal: info.idMeal, strMeal: info.strMeal, strMealThumb: info.strMealThumb} //HANDLES ADDING NEW OBJECTS
      const resp = await fetch(DB, {method:'POST', headers:{"Content-Type": "application/json"}, body: JSON.stringify(newFav)})
      const respJson = await resp.json()
      setFavorites([...favorites, respJson])
    }
    else
    {
      let idToRemove = -1;
      favorites.forEach(el => {
        if (el.idMeal === info.idMeal)
          idToRemove = el.id;
      })
      await fetch(DB+`/${idToRemove}`, {method: 'DELETE'})
      const newFavorites = favorites.filter(el => (el.idMeal !== info.idMeal))
      setFavorites(newFavorites)
    }
  }
  return (
    <Container verticalAlign='middle' style={{ margin: '5em 0 0 0', padding: '0 0 5em  0' }}  >
    {loading ? 
    <>
      <LoadingBar /> 
      <Button onClick={goBack} color="red" icon labelPosition='left'>
          <Icon name='left arrow' />
          Go Back
        </Button>
    </>
    : 
   
    <div className='container'>
      <Header as='h1' textAlign='center'>{info.strMeal}</Header>
      <Image src={info.strMealThumb} alt={info.strMeal} centered/>
      <Button color='youtube' onClick={() => {setShowVideo(!showVideo)}}><Icon name='youtube' />{showVideo?'Hide':'Show'} Video</Button>
      <br />
      {showVideo ? <iframe width="420" height="315" src={getLink()} /> : null}
      <Header as='h2'>Region: {info.strArea}</Header>
      <em><Header as='h4'>Tags: {info.strTags ? info.strTags.replace(",",", ") : 'None'}</Header></em>
      <div>
        {isThisAFavorite ?
        <Button onClick={handleFavorite} basic color="red" icon labelPosition='left'>
          <Icon name='delete' />
          Remove From Favorites
          </Button> :
        <Button onClick={handleFavorite} color="yellow" icon labelPosition='left'>
        <Icon name='star' />
        Add To Favorites
        </Button>}
        
        <Button onClick={goBack} color="red" icon labelPosition='left'>
          <Icon name='left arrow' />
          Go Back
        </Button>
      </div>
      <Container textAlign='justified' text>
        <Header as='h4'>Ingredients: </Header>
        <ul>
        {ingredients.map(el => {
          return (<li key={uuidv4()}>{el}</li>)
          })}
        </ul>
      <Divider fitted />
      <Header as='h4'>Instructions:</Header>
        <p>{info.strInstructions}</p>
      </Container>
    </div>

    }
    </Container>
  )
}

export default RecipeDetails