import React from "react"
import PropTypes from "prop-types"

const RecipeCard = ( {data : {foodImg, name, author }}) => {

    return (
        <div className="recipe-card">
            <img src={`http://localhost:80/${foodImg}`} />
            <div className="recipe-card-text">
                <h2>{name}</h2>
                <p>By {author}</p>
            </div>
        </div>

    )
}

export default RecipeCard