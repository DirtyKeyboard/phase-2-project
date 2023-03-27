import React, { useState } from 'react'
import {
  Form,
  Input,
  TextArea,
  Button,
  Select
} from 'semantic-ui-react'
import RecipeCard from './RecipeCard'

// class FoodForm extends Component {
const FoodForm = () => {
  const categoryOptions = [
    {
      key: 'beef',
      text: 'beef',
      value: 'beef'
    },
    {
      key: 'chicken',
      text: 'chicken',
      value: 'chicken'
    },
    {
      key: 'dessert',
      text: 'dessert',
      value: 'dessert'
    },
    {
      key: 'lamb',
      text: 'lamb',
      value: 'lamb'
    },
    {
      key: 'miscellaneous',
      text: 'miscellaneous',
      value: 'miscellaneous'
    },
    {
      key: 'pasta',
      text: 'pasta',
      value: 'pasta'
    },
    {
      key: 'pork',
      text: 'pork',
      value: 'pork'
    },
    {
      key: 'seafood',
      text: 'seafood',
      value: 'seafood'
    },
    {
      key: 'side',
      text: 'side',
      value: 'side'
    },
    {
      key: 'starter',
      text: 'starter',
      value: 'starter'
    },
    {
      key: 'vegan',
      text: 'vegan',
      value: 'vegan'
    },
    {
      key: 'vegetarian',
      text: 'vegetarian',
      value: 'vegetarian'
    },
    {
      key: 'breakfast',
      text: 'breakfast',
      value: 'breakfast'
    },
    {
      key: 'goat',
      text: 'goat',
      value: 'goat'
    }
  ]
  const [counter, setCounter] = useState(1);
  const [formData, setFormData] = useState({
    strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '' })

  function addFormFields(e) {
    e.stopPropagation()
    setCounter(counter + 1);
  }

  function subtractFormFields(e) {
    if (counter > 1)
    {
      e.stopPropagation()
      setCounter(counter - 1);
    }
  }

 function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleDropChange(e) {
    setFormData({...formData, strCategory: e.target.childNodes[0].innerText})
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formData.strCategory !== '')
    {
      const API = 'http://localhost:4000/meals'
      async function fetchData() {
        const settings = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( formData)
        };
        const raw = await fetch(API, settings)
        const data = await raw.json()
        return data
      }
      fetchData()
  
      setFormData({ strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '',strMeasure1:'',strIngredient1:'' })
      setCounter(1)
    }
    else
      alert('Please select a category')
  }


  return (
    <>
    <Form onSubmit={handleSubmit}  >
      <Form.Field
        required
        control={Input}
        name='strMeal'
        label='Recipe Title'
        placeholder='Recipe Title'
        value={formData.strMeal}
        onChange={handleChange}
      />
      <Form.Group widths='equal'>
        <Form.Field
          control={Input}
          name='strMealThumb'
          label='Image'
          placeholder='Recipe Image URL'
          value={formData.strMealThumb}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          name='strYoutube'
          label='YouTube Video'
          placeholder='Recipe YouTube Video URL'
          value={formData.strYoutube}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group widths='equal' grouped >
        <label>Ingredients</label>
        <Button type="button" onClick={addFormFields}>+</Button>
        <Button type="button" onClick={subtractFormFields}>-</Button>
        {Array.from(Array(counter)).map((c, index) => {
          return (
            <Form.Group inline key={index} >
              <Form.Field
                control={Input}
                name={'strMeasure' + (index + 1)}
                label='Quantity'
                placeholder='Ingredient Quantity'
                value={formData[`strMeasure${index+1}`]|| ""}
                onChange={ handleChange}
              />
              <Form.Field
                control={Input}
                name={'strIngredient' + (index + 1)}
                label='Ingredient'
                placeholder='Ingredient'
                value={formData[`strIngredient${index+1}`]|| ""}
                onChange={handleChange}
              />
            </Form.Group>
          );
        })}
      </Form.Group>
      <Form.Field
        required
        control={TextArea}
        name='strInstructions'
        label='Instructions'
        placeholder='Recipe instructions...'
        value={formData.strInstructions}
        onChange={handleChange}
      />
      <Form.Group grouped >
            <Select
          placeholder='Select Category'
          options={categoryOptions}
          onChange={handleDropChange}
          value={formData.strCategory}
        />
        <Form.Field inline
          control={Input}
          name='strArea'
          label='Region'
          placeholder='Region'
          value={formData.strArea}
          onChange={handleChange}
        />
        <Input
          name='strTags'
          icon='tags'
          iconPosition='left'
          label={{ tag: true, content: 'Tags' }}
          labelPosition='right'
          placeholder='Enter comma delimited tags'
          value={formData.strTags}
          onChange={handleChange}
        />
      </Form.Group>
      
      <Button type='submit'>Submit</Button>
    </Form>

<div>
  <RecipeCard recipe={formData} handleClick={() => console.log('Clicked demo card!')}/>
</div>

</>
  )
}



export default FoodForm