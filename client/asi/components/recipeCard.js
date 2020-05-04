import React from "react"
import PropTypes from "prop-types"
import Link from 'next/link'

const RecipeCard = ({ data: { foodImg, name, author } }) => {

    return (
        
            <Link href="/recipe">
                <a className="recipe-card">
                    <img src={`http://localhost:80/${foodImg}`} />
                    <div className="recipe-card-text">
                        <h2>{name}</h2>
                        <p>By {author}</p>
                    </div>
                </a>
            </Link>
    )
}

export default RecipeCard