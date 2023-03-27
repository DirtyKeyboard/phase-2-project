import React, { useState } from 'react'
import {
  Form,
  Input,
  TextArea,
  Button,
  Message
} from 'semantic-ui-react'
import RecipeCard from './RecipeCard'

// class FoodForm extends Component {
const FoodForm = () => {

  const [formData, setFormData] = useState({
    strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '', strMeasure1: '', strIngredient1: ''  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  function handleSubmit(e) {
    e.preventDefault()

    console.log(formData)

    const API = 'http://localhost:3001/meals'
    async function fetchData() {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      };
      const raw = await fetch(API, settings)
      const data = await raw.json()
      // setCats(data.categories)
      return data
    }
    fetchData()

    setFormData({ strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '', strMeasure1: '', strIngredient1: '' })
  }

  const [counter, setCounter] = useState(1);

  function addFormFields(e) {
    e.stopPropagation()
    setCounter(counter + 1);
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
        {Array.from(Array(counter)).map((c, index) => {
          return (
            <Form.Group inline  >
              <Form.Field
                control={Input}
                name={'strMeasure' + (index + 1)}
                label='Quantity'
                placeholder='Ingredient Quantity'
                value={formData[`strMeasure${counter+1}`]}
                onChange={handleChange}
              />
              <Form.Field
                control={Input}
                name={'strIngredient' + (index + 1)}
                label='Ingredient'
                placeholder='Ingredient'
                value={formData[`strIngredient${counter+1}`]}
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
        <Form.Field inline
          required
          control={Input}
          name='strCategory'
          label='Category'
          placeholder='Category'
          value={formData.strCategory}
          onChange={handleChange}
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
  <RecipeCard recipe={formData}/>
</div>

</>
  )
}



export default FoodForm