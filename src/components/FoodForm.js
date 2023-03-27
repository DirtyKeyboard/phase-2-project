import React, { Component } from 'react'
import {
  Form,
  Input,
  TextArea,
  Message
} from 'semantic-ui-react'

class FoodForm extends Component {

  state = { strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '', strMeasure1: '', strIngredient1: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { strMeal, strMealThumb, strYoutube, strTags, strArea, strCategory, strInstructions, strMeasure1, strIngredient1 } = this.state

    this.setState({ strMeal, strCategory, strArea, strInstructions, strMealThumb, strTags, strYoutube, strIngredient1, strMeasure1 })
    const newRecipe = this.state

    const API = 'http://localhost:3001/meals'
    async function fetchData() {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe)
      };
      const raw = await fetch(API, settings)
      const data = await raw.json()
      // setCats(data.categories)
      return data
    }
    fetchData()

    this.setState({ strMeal: '', strMealThumb: '', strYoutube: '', strTags: '', strArea: '', strCategory: '', strInstructions: '', strMeasure1: '', strIngredient1: '' })


  }

  handleClick = (e) =>
    alert('clicked add more ingredients.. finish handler!')

  render() {
    const { strMeal, strCategory, strArea, strInstructions, strMealThumb, strTags, strYoutube, strIngredient1, strMeasure1 } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input required
          // control={Input}
          name='strMeal'
          label='Recipe Title'
          placeholder='Recipe Title'
          value={strMeal}
          onChange={this.handleChange}
        />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='strMealThumb'
            label='Image'
            placeholder='Recipe Image URL'
            value={strMealThumb}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            name='strYoutube'
            label='YouTube Video'
            placeholder='Recipe YouTube Video URL'
            value={strYoutube}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal' grouped >
          <label>Ingredients</label>
          <Form.Group inline >
            <Form.Field
              control={Input}
              name='strMeasure1'
              label='Quantity'
              placeholder='Ingredient Quantity'
              value={strMeasure1}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              name='strIngredient1'
              label='Ingredient'
              placeholder='Ingredient'
              value={strIngredient1}
              onChange={this.handleChange}
            />
            <button
              class="ui button"
              onClick={this.handleClick}
            >+</button>
          </Form.Group>
        </Form.Group>
        <Form.Field
          control={TextArea}
          name='strInstructions'
          label='Instructions'
          placeholder='Recipe instructions...'
          value={strInstructions}
          onChange={this.handleChange}
        />
        <Form.Group grouped >
          <Form.Field inline
            control={Input}
            name='strCategory'
            label='Category'
            placeholder='Category'
            value={strCategory}
            onChange={this.handleChange}
          />
          <Form.Field inline
            control={Input}
            name='strArea'
            label='Region'
            placeholder='Region'
            value={strArea}
            onChange={this.handleChange}
          />
          <Input
            name='strTags'
            icon='tags'
            iconPosition='left'
            label={{ tag: true, content: 'Add Tags' }}
            labelPosition='right'
            placeholder='Enter tags'
            value={strTags}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Message
          success
          header='Form Completed'
          content="Your new recipe has been added"
        />
        <Form.Button content='Submit' />
      </Form>


    )
  }
}


export default FoodForm