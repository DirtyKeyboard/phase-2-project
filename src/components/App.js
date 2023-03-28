import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import FoodForm from './FoodForm';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import FavoriteList from './FavoriteList';
import CategoryFilter from './CategoryFilter';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import LocalRecipes from './LocalRecipes'
import LocalDetails from './LocalDetails';

function App() {
  const navigate = useNavigate()
  const [currentCat, setCurrentCat] = useState("");
  const [cats, setCats] = useState([]);

  const API = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  useEffect(() => {
    async function fetchData() {
      const raw = await fetch(API)
      const data = await raw.json()
      setCats(data.categories)
    }
    fetchData()
  }, [])

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<h1>Landing Page</h1>} />
        <Route exact path="/browse" element={<CategoryFilter cats={cats} />} />
        <Route exact path="/newrecipe" element={<FoodForm cats={cats} />} />
        <Route exact path="/favorites" element={<FavoriteList />} />
        <Route exact path="/browse/:categoryId" element={<RecipeList />} />
        <Route path="/browse/:categoryId/:mealId" element={<RecipeDetails setCurrentCat={setCurrentCat} goBack={() => navigate(`/browse/${currentCat}`)} />} />
        <Route path="/favorites/:mealId" element={<RecipeDetails setCurrentCat={(r) => { }} goBack={() => navigate(`/favorites`)} />} />
        <Route exact path="/local" element={<LocalRecipes />}/>
        <Route exact path="/local/:mealId" element={<LocalDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
