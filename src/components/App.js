import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer';
import FoodForm from './FoodForm';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import FavoriteList from './FavoriteList';
import CategoryFilter from './CategoryFilter';
import { Route, Routes, useNavigate } from "react-router-dom";
import LocalRecipes from './LocalRecipes'
import LocalDetails from './LocalDetails'
import Home from './Home'

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
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/browse" element={<CategoryFilter cats={cats} />} />
        <Route exact path="/newrecipe" element={<FoodForm cats={cats} />} />
        <Route exact path="/favorites" element={<FavoriteList />} />
        <Route exact path="/browse/:categoryId" element={<RecipeList />} />
        <Route path="/browse/:categoryId/:mealId" element={<RecipeDetails setCurrentCat={setCurrentCat} goBack={() => navigate(`/browse/${currentCat}`)} />} />
        <Route path="/favorites/:mealId" element={<RecipeDetails setCurrentCat={(r) => { }} goBack={() => navigate(`/favorites`)} />} />
        <Route exact path="/local" element={<LocalRecipes />}/>
        <Route exact path="/local/:mealId" element={<LocalDetails />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
