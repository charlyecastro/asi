import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Axios from 'axios';
import Layout from "../components/layout"

function Home() {

  const [recipes, setRecipes] = useState([])

  const updateRecipes = (data) => {
    setRecipes(data)
    console.log(data)
    console.log(recipes)
  }

  const fetchRecipes = () => {
    Axios.get("http://localhost:80/recipes")
      .then(res => {
        console.log(res)
        return res.data
      })
      .catch(err => {
        console.log(err);
      })
      .then(data => {
        updateRecipes(data)
      })
  }

  useEffect(() => {
    fetchRecipes()
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
      {
        recipes.map(val => {
          <p>{val.name}</p>
        })
      }

      <footer>

      </footer>
    </Layout>
  )
}

export default Home