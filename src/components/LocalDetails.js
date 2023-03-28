import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingBar from './LoadingBar'
import {Button, Icon, Image, Segment, Divider, Container, Header} from 'semantic-ui-react'
import {v4 as uuidv4} from 'uuid'

//<Container verticalAlign='middle' style={{ margin: '5em 0 0 0', padding: '0 0 5em  0' }}  >
//<Header as='h1' textAlign='left'>
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
        <Button onClick={goBack} color="red" icon labelPosition='left'>
          <Icon name='left arrow' />
          Go Back
        </Button>
      </div>
      <Container textAlign='justified' text>
        <h4>Ingredients: </h4>
        <ul>
        {ingredients.map(el => {
          return (<li key={uuidv4()}>{el}</li>)
          })}
        </ul>
      <Divider fitted />
      <h4>Instructions:</h4>
        <p>{info.strInstructions}</p>
      </Container>
    </div>
            
        }
    </Container>
  )
}

export default LocalDetails