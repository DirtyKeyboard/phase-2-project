import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Menu, Image } from 'semantic-ui-react'
import chefhatIcon from '../pictures/chefhatIcon.png';

const NavBar = () => {
  return (

    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='div'>
          <Image size='mini'src={chefhatIcon}  style={{ marginRight: '1.5em' }} />
        </Menu.Item>
        <Menu.Item as={NavLink} exact to="/" activeClassName="active">Home</Menu.Item>
        <Menu.Item as={NavLink} exact to="/browse" activeClassName="active">Browse Recipes</Menu.Item>
        <Menu.Item as={NavLink} exact to="/newrecipe" activeClassName="active">New Recipe</Menu.Item>
        <Menu.Item as={NavLink} exact to="/local" activeClassName="active">Your Recipes</Menu.Item>
        <Menu.Item as={NavLink} exact to="/favorites" activeClassName="active">View Favorites</Menu.Item>
      </Container>
    </Menu>


  )
}

export default NavBar;