import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from "../../components/layout"

const Recipe = () => {

    const [recipe, setRecipe] = useState()
    const [recipeId, setRecipeId] = useState()
    const router = useRouter()
    // setRecipeId(router.query.slug)



    useEffect(() => {
        const {slug} = router.query
        // console.log(slug)
        fetch(`http://localhost:80/recipes/${slug}`, {
            method: 'GET',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRecipe(data)
            });
    }, []);

    return (
        <Layout>
            <Head>
                <title>ASI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {recipe ?
                <div className = "form-container">
                    <img className="form-banner" src={`http://localhost:80/${recipe.foodImg}`} />
                    <div className = "space-between">
                        <h1> {recipe.name}</h1>
                        <div className = "button-group">
                            <button className = "btn-outline">Like</button>
                            <button className = "btn-outline">Print</button>
                        </div>
                    </div>
            <p>RECIPE ID IS</p>
                    <p>1 Hr 15 Min | 8 Serving | 4 Likes</p>
                    <p className = "light-text">By {recipe.author}</p>
                    <h2>Summary</h2>
                    <p>{recipe.description}</p>
                    <h2>Ingredients</h2>
                    {recipe.ingredients.map((val, index) => {
                        return (<p key = {index}>{val}</p>)
                    })}
                    <h2>Directions</h2>

                </div>
                :
                <h1>loading...</h1>
            }
        </Layout>
    )
}

export default Recipe