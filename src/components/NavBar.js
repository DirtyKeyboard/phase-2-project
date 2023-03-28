import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Container,
  Menu
} from 'semantic-ui-react'

const NavBar = () => {
  return (
 
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as={NavLink} exact to="/" activeClassName="active">Home</Menu.Item>
          <Menu.Item as={NavLink} exact to="/browse" activeClassName="active">Browse Recipes</Menu.Item>
          <Menu.Item as={NavLink} exact to="/newrecipe" activeClassName="active">New Recipe</Menu.Item>
          <Menu.Item as={NavLink} exact to="/favorites" activeClassName="active">View Favorites</Menu.Item>
        </Container>
      </Menu>
   

  )
}

export default NavBar;