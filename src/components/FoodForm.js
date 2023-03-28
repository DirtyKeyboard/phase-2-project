import React, { useState } from 'react'
import {
  Form,
  Input,
  TextArea,
  Button,
  Container,
} from 'semantic-ui-react'
import RecipeCard from './RecipeCard'

// class FoodForm extends Component {
const FoodForm = ({ cats }) => {

  const categoryOptions = cats.map(el => ({ key: el.strCategory, text: el.strCategory, value: el.strCategory }))

  const [counter, setCounter] = useState(1);
  const [formData, setFormData] = useState({ strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '' })

  function addFormFields(e) {
    e.stopPropagation()
    setCounter(counter + 1);
  }

  function subtractFormFields(e) {
    if (counter > 1) {
      e.stopPropagation()
      setCounter(counter - 1);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleDropChange(e) {
    setFormData({ ...formData, strCategory: e.target.childNodes[0].innerText })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formData.strCategory !== '') {
      const API = 'http://localhost:4000/meals'
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
        return data
      }
      fetchData()

      setFormData({ strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '', strMeasure1: '', strIngredient1: '' })
      setCounter(1)
    }
    else
      alert('Please select a category')
  }

  const style = {
    label: {
      marginTop: '0.2em',
      marginBottom: '0.2em'
    },
    h2: {
      margin: '4em 0em 2em',
    }
  }

  return (
    <Container textAlign='left' verticalAlign='middle' style={{ margin: '7em 6em 0 6em', padding: '0 0 5em  0' }}  >
      <Form onSubmit={handleSubmit} size='large' >
        <Form.Field style={style.label}
          required
          control={Input}
          name='strMeal'
          label='Recipe Title'
          placeholder='Recipe Title'
          value={formData.strMeal}
          onChange={handleChange}
        />
        <Form.Group widths='equal'>
          <Form.Field style={style.label}
            control={Input}
            name='strMealThumb'
            label='Image'
            placeholder='Recipe Image URL'
            icon='picture'
            iconPosition='left'
            value={formData.strMealThumb}
            onChange={handleChange}
          />
          <Form.Field style={style.label}
            control={Input}
            name='strYoutube'
            label='YouTube Video'
            placeholder='Recipe YouTube Video URL'
            icon='youtube'
            iconPosition='left'
            value={formData.strYoutube}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal' grouped >
          <label >Ingredients</label>
          <Button type="button" style={{ marginBottom: '0.5em', marginLeft: '0.5em', padding: '0.5em  0.8em' }} onClick={addFormFields}>+</Button>
          <Button type="button" style={{ marginBottom: '0.5em', marginLeft: '0.2em', padding: '0.5em  0.8em' }} onClick={subtractFormFields}>-</Button>
          {Array.from(Array(counter)).map((c, index) => {
            return (
              <Form.Group inline key={index} style={{ marginBottom: '0.5em' }}>
                <Form.Field style={style.label}
                  control={Input}
                  name={'strMeasure' + (index + 1)}
                  label={'Quantity ' + (index + 1)}
                  placeholder='Ingredient Quantity'
                  value={formData[`strMeasure${index + 1}`] || ""}
                  onChange={handleChange}
                />
                <Form.Field style={style.label}
                  control={Input}
                  name={'strIngredient' + (index + 1)}
                  label={'Ingredient ' + (index + 1)}
                  placeholder='Ingredient'
                  value={formData[`strIngredient${index + 1}`] || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            );
          })}
        </Form.Group>
        <Form.Field style={style.label}
          required
          control={TextArea}
          name='strInstructions'
          label='Instructions'
          placeholder='Recipe instructions...'
          value={formData.strInstructions}
          onChange={handleChange}
        />
        <Form.Group inline widths='equal'>
          <Form.Select fluid style={style.label}
            label='Category'
            placeholder='Select Category'
            options={categoryOptions}
            onChange={handleDropChange}
            value={formData.strCategory}
          />

          <Form.Field fluid style={style.label}
            control={Input}
            name='strArea'
            label='Region'
            placeholder='Region'
            value={formData.strArea}
            onChange={handleChange}
          />

          <Form.Field fluid style={style.label}
            control={Input}
            name='strTags'
            icon='tags'
            iconPosition='left'
            label='Tags'
            // label={{ tag: true, content: 'Tags' }}
            // labelPosition='right'
            placeholder='Enter comma delimited tags'
            value={formData.strTags}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type='submit' style={{ marginBottom: '0.5em' }}>Submit</Button>
      </Form>

      <div>
        <RecipeCard recipe={formData} handleClick={() => console.log('Clicked demo card!')} />
      </div>
    </Container >

  )
}



export default FoodForm