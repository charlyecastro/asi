import { useState, useEffect } from 'react';
import Head from 'next/head'
import Axios from 'axios';
import Layout from "../components/layout"
import RecipeCard from "../components/recipeCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Home = () => {

  const [allRecipes, setAllRecipes] = useState([' '])

  useEffect(() => {
    fetch('http://localhost:80/recipes', {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setAllRecipes(data)
      });
  }, []);

  return (
    <Layout>

      <Head>
        <title>ASI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home-banner">
        <h1 className = "hero-text"> Share Your Food</h1>
        <h3> Explore food, store food and learn more about food</h3>
        <div className="search-container">
          <input placeholder="search food" /> 
          <button type = "submit"><FontAwesomeIcon icon={faSearch} size='2x' className = "icon"/></button>
          


        </div>
      </div>

      <main>
        <h1>Recipes	&#128523;</h1>
        	{/* 128524	 */}

        <div className="grid">

          {
            allRecipes.map((val) => {
              return (
                <RecipeCard key={val._id} data={val} />
              )
            })
          }
        </div>
      </main>

      <footer>

      </footer>
    </Layout>
  )
}

export default Home