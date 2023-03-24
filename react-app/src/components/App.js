import NavBar from './NavBar'
import FoodForm from './FoodForm';
import Recipe from './Recipe';
import RecipeList from './RecipeList'
import RecipeDetails from './RecipeDetails' //Clicking on a recipe card routes to it's details
import ShoppingCart from './ShoppingCart';

import {Route, Routes} from "react-router-dom"



function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<h1>Landing Page</h1>} />
        <Route exact path="/browse" element={<h1>Browse All Recipes</h1>} />
        <Route exact path="/newrecipe" element={<FoodForm />} />
        <Route exact path="/cart" element={<h1>Shopping Cart</h1>} />
      </Routes>
    </div>
  );
}

export default App;
