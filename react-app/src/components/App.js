import {useState} from 'react'
import NavBar from './NavBar'
import FoodForm from './FoodForm';
import RecipeList from './RecipeList'
import RecipeDetails from './RecipeDetails' //Clicking on a recipe card routes to it's details
import ShoppingCart from './ShoppingCart';
import CategoryFilter from './CategoryFilter'
import {Route, Routes, useParams} from "react-router-dom"

/*
API NOTES
https://www.themealdb.com/api/json/v1/1/list.php?c=list -- List of Food Cats.
https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast -- Returns Foods, Filtered by Cat.
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52965 -- Returns Single Food by ID


Returns array of meals
data.meals[0].idMeal --> Gets first elements ID
Data Format:
meals: [
      idMeal: "52965",
      "strMeal": "Breakfast Potatoes",
      "strDrinkAlternate": null,
      "strCategory": "Breakfast",
      "strArea": "Canadian",
      "strInstructions": "List of instructions"
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1550441882.jpg",
      "strTags": "Breakfast,Brunch,",
      "strYoutube": "https://www.youtube.com/watch?v=BoD0TIO9nE4",

      "strIngredient1": "Potatoes",
      "strIngredient2": "Olive Oil",
      "strIngredient3": "Bacon",
      "strIngredient4": "Garlic Clove",
      "strIngredient5": "Maple Syrup",
      "strIngredient6": "Parsley",
      "strIngredient7": "Salt",
      "strIngredient8": "Pepper",
      "strIngredient9": "Allspice",
      "strIngredient10": "",
      "strIngredient11": "",


      "strMeasure1": "3 Medium",
      "strMeasure2": "1 tbs",
      "strMeasure3": "2 strips",
      "strMeasure4": "Minced",
      "strMeasure5": "1 tbs",
      "strMeasure6": "Garnish",
      "strMeasure7": "Pinch",
      "strMeasure8": "Pinch",
      "strMeasure9": "To taste",
      "strMeasure10": " ",
      "strMeasure11": " ",
]
*/


function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<h1>Landing Page</h1>} />
        <Route exact path="/browse" element={<CategoryFilter/>} />
        <Route exact path="/newrecipe" element={<FoodForm />} />
        <Route exact path="/favorites" element={<h1>Favs</h1>} />
        <Route exact path="/browse/:categoryId" element={<RecipeList/>} />
        <Route path="/browse/:categoryId/:mealId" element={<RecipeDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
