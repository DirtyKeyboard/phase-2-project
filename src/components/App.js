import React, {useState} from 'react'
import NavBar from './NavBar'
import FoodForm from './FoodForm';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import FavoriteList from './FavoriteList';
import CategoryFilter from './CategoryFilter';
import {Route, Routes, useNavigate, useParams} from "react-router-dom";


function App() {
  const [currentCat, setCurrentCat] = useState("");
  const navigate = useNavigate()
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<h1>Landing Page</h1>} />
        <Route exact path="/browse" element={<CategoryFilter/>} />
        <Route exact path="/newrecipe" element={<FoodForm />} />
        <Route exact path="/favorites" element={<FavoriteList />} />
        <Route exact path="/browse/:categoryId" element={<RecipeList />} />
        <Route path="/browse/:categoryId/:mealId" element={<RecipeDetails setCurrentCat={setCurrentCat} goBack={() => navigate(`/browse/${currentCat}`)} />} />
        <Route path="/favorites/:mealId" element={<RecipeDetails setCurrentCat={(r) => {}} goBack={() => navigate(`/favorites`)}/>} />
      </Routes>
    </div>
  );
}

export default App;
