import React from 'react'
import {Form, Button} from 'semantic-ui-react'

const FoodForm = () => {
  return (
    <Form>
        <Form.Field>
            <label>Input 1</label>
            <input placeholder='placeholder...' />
        </Form.Field>
        <Form.Field>
            <label>Input 2</label>
            <input placeholder='placeholder...' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default FoodForm