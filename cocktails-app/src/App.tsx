import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [categoriesData, setCategoriesData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get("https://cocktails.solvro.pl/api/v1/cocktails/categories").then()
        const data = response.data.data
        setCategoriesData(data)
      } catch(e){
        console.error(e)
      }
    }

    fetchData()
  } , [])

  return (
    <>
      <h1>Cocktails App</h1>
      {categoriesData.length > 0 ? (
        <ul>
          {categoriesData.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      ) : (
        <p>Loading categories...</p>
      )}
    </>
  )
}

export default App
