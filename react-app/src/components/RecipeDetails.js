import React, {useState, useEffect} from 'react'
import {Button, Image, Divider, Segment, Icon} from 'semantic-ui-react'
import {useNavigate, useParams} from 'react-router-dom'
import LoadingBar from './LoadingBar'
import {v4 as uuidv4} from 'uuid';

const RecipeDetails = ({recipeId}) => {
  const [showVideo, setShowVideo] = useState(true)
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const params = useParams()
  const API =  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.mealId}`
  useEffect(() => {
    async function fetchData()
    {
      const raw = await fetch(API)
      const data = await raw.json()
      setLoading(false)
      setInfo(data.meals[0])
    }
    fetchData()
  },[])
  console.log(info)
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
  if (!loading)
{  
  
}




  // ingredients.push(info.strMeasure1 + " of " + info.strIngredient1)
  // ingredients.push(info.strMeasure2 + " of " + info.strIngredient2)
  // ingredients.push(info.strMeasure3 + " of " + info.strIngredient3)
  // ingredients.push(info.strMeasure4 + " of " + info.strIngredient4)
  // ingredients.push(info.strMeasure5 + " of " + info.strIngredient5)
  // ingredients.push(info.strMeasure6 + " of " + info.strIngredient6)
  // ingredients.push(info.strMeasure7 + " of " + info.strIngredient7)
  // ingredients.push(info.strMeasure8 + " of " + info.strIngredient8)
  // ingredients.push(info.strMeasure9 + " of " + info.strIngredient9)
  // ingredients.push(info.strMeasure10 + " of " + info.strIngredient10)
  // ingredients.push(info.strMeasure11 + " of " + info.strIngredient11)
  // ingredients.push(info.strMeasure12 + " of " + info.strIngredient12)
  // ingredients.push(info.strMeasure13 + " of " + info.strIngredient13)
  // ingredients.push(info.strMeasure14 + " of " + info.strIngredient14)
  // ingredients.push(info.strMeasure15 + " of " + info.strIngredient15)

  function getLink()
  {
    const b = info.strYoutube.indexOf('=') + 1
    const newLink = "https://youtube.com/embed/"+info.strYoutube.substring(b)
    return newLink;
  }
  return (
    <>
    {loading ? 
    <>
      <LoadingBar /> 
      <Button onClick={() => navigate(`/browse/${params.categoryId}`)}>Go Back</Button>
    </>
    : 
    <div className='container'>
      <h1 className='bigHeading'>{info.strMeal}</h1>
      <Image src={info.strMealThumb} alt={info.strMeal} centered/>
      <Button color='youtube' onClick={() => {setShowVideo(!showVideo)}}><Icon name='youtube' />{showVideo?'Hide':'Show'} Video</Button>
      <br />
      {showVideo ? <iframe width="420" height="315" src={getLink()} /> : null}
      <h2>Region: {info.strArea}</h2>
      <em><h4>Tags: {info.strTags ? info.strTags.replace(",",", ") : 'None'}</h4></em>
      <div>
        <Button onClick={() => console.log('Clicked favorite for id: ' + info.idMeal)} color="yellow" icon labelPosition='left'>
          <Icon name='star' />
          Add To Favorites
          </Button>
        <Button onClick={() => navigate(`/browse/${params.categoryId}`)} color="red" icon labelPosition='red'>
          <Icon name='left arrow' />
          Go Back
        </Button>
      </div>
      <Segment>
        <h4>Ingredients: </h4>
        <ul>
        {ingredients.map(el => {
          return (<li key={uuidv4()}>{el}</li>)
          })}
        </ul>
      <Divider fitted />
      <h4>Instructions:</h4>
        <p>{info.strInstructions}</p>
      </Segment>
    </div>
    }
    </>
  )
}

export default RecipeDetails