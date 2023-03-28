import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import FoodForm from './FoodForm';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import FavoriteList from './FavoriteList';
import CategoryFilter from './CategoryFilter';
import { Route, Routes, useNavigate } from "react-router-dom";
import chefhat from './chefhat.jpg';

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
        <Route exact path="/" element={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ color: "red" }}>Find That Recipe</h1>
              <img src={chefhat} alt="Landing Page" style={{ maxWidth: "100%", maxHeight: "50vh" }} />
            </div>
          </div>
        } />
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
