import Head from 'next/head'
import { useState } from "react"

export default function Publish() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [foodImage, setImage] = useState('')
    const [newImage, setNewImage] = useState()

    const submitTest = (e) => {
        e.preventDefault()

        console.log(name)
        console.log(description)
        console.log(author)
        console.log(foodImage)

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('author', author)
        formData.append('foodImg', foodImage)

        fetch('http://localhost:80/upload', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });

    }

    const fetchRecipes = () => {
        const prefix = "http://localhost:80/"
        fetch('http://localhost:80/recipes')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log(data[0].foodImg)
                let imgPath = prefix + data[0].foodImg 
                setNewImage(imgPath)
            });
    }

    return (
        <div className="container">
            <Head>
                <title>Publish</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>

                <h1 className="title">
                    Get ready to publish
        </h1>

                <p className="description">
                    share your recipe with others or family
                </p>
            </main>
            <form onSubmit={submitTest}>
                <div className="form-container">
                    <div>
                        <label>Name of Food</label>
                        <input onChange={e => setName(e.target.value)} name="name" type="text" />
                    </div>

                    <div>
                        <label>Description</label>
                        <input onChange={e => setDescription(e.target.value)} name="description" type="text" />
                    </div>

                    <div>
                        <label>Author</label>
                        <input onChange={e => setAuthor(e.target.value)} name="author" type="text" />
                    </div>

                    <div>
                        <label>Food Image</label>
                        <input onChange={e => setImage(e.target.files[0])} name="foodImage" type="file" />
                    </div>

                    <button>TEST IT</button>
                </div>
            </form>

            <button onClick={fetchRecipes}>Get Recipes</button>

            <img src = {newImage} style = {{width: "300px", height: "100%"}}/>
            <style jsx>{`
                .form-container {
                    margin: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
        `}</style>
        </div>
    )
}
