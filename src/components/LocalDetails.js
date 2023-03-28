import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingBar from './LoadingBar'
import {Button, Icon, Image, Segment, Divider} from 'semantic-ui-react'
import {v4 as uuidv4} from 'uuid'

const LocalDetails = () => {
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState({})
    const [showVideo, setShowVideo] = useState(true)
    const navigate = useNavigate()
    const {mealId} = useParams();
    function goBack()
    {
        navigate('/local')
    }
    function getLink()
  {
    const b = info.strYoutube.indexOf('=') + 1
    const newLink = "https://youtube.com/embed/"+info.strYoutube.substring(b)
    return newLink;
  }
    useEffect(() => {
        async function fetchData() {
            const raw = await fetch(`http://localhost:4000/meals/${mealId}`)
            const data = await raw.json()
            setInfo(data)
            setLoading(false)
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
  return (
    <>
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
      <h1 className='bigHeading'>{info.strMeal}</h1>
      <Image src={info.strMealThumb} alt={info.strMeal} centered/>
      <Button color='youtube' onClick={() => {setShowVideo(!showVideo)}}><Icon name='youtube' />{showVideo?'Hide':'Show'} Video</Button>
      <br />
      {showVideo ? <iframe width="420" height="315" src={getLink()} /> : null}
      <h2>Region: {info.strArea}</h2>
      <em><h4>Tags: {info.strTags ? info.strTags.replace(",",", ") : 'None'}</h4></em>
      <div>
        <Button onClick={goBack} color="red" icon labelPosition='left'>
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

export default LocalDetails