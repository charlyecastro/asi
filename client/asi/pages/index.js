import { useState, useEffect } from 'react';
import Head from 'next/head'
import Axios from 'axios';
import Layout from "../components/layout"
import RecipeCard from "../components/recipeCard"

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
        <h1> Share Your Food</h1>
        <h3> Explore food, store food and learn more about food</h3>
        <input placeholder="search food" />
      </div>

      <main>

      </main>
      <h4>Recipes</h4>
      <div className="grid">

        {
          allRecipes.map((val) => {
            return (
              <RecipeCard key = {val._id} data = {val}/>
            )

          })
        }
      </div>
      <footer>

      </footer>
    </Layout>
  )
}

export default Home