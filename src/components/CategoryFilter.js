import React, {useState, useEffect} from 'react'
import { Card } from 'semantic-ui-react'
import CategoryCard from './CategoryCard'

const CategoryFilter = () => {
    
    const [cats, setCats] = useState([]);
    const API = 'https://www.themealdb.com/api/json/v1/1/categories.php'
    useEffect(() => {
        async function fetchData() {
            const raw = await fetch(API)
            const data = await raw.json()
            setCats(data.categories)
        }
        fetchData()
    },[])
  return (
    <Card.Group>
        {cats.map(el => (<CategoryCard key={el.idCategory} category={el}/>) )}
    </Card.Group>
  )
}

export default CategoryFilter