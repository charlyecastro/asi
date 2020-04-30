import Head from 'next/head'
import { useState } from "react"
import Layout from "../components/layout"

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
        <Layout>
            <Head>
                <title>Publish</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>

                <h1 className="title">
                    Ready to publish
                </h1>

                <p className="description">
                    share your recipe with others or family
                </p>
            </main>
            {/* <div className="form-container"> */}
            <form onSubmit={submitTest}>

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
                <h2>Share As</h2>
                <div>
                    <input type="radio" id="male" name="gender" value="male" />
                    <label for="male">Private</label>
                </div>
                <div>
                    <input type="radio" id="female" name="gender" value="female" />
                    <label for="female">Public</label>
                </div>
                <div>
                    <h2>Ingredients</h2>
                    <input/>
                    <button>add ingredient</button>
                </div>


                <button className = "submit">SUBMIT</button>
            </form>
            {/* </div> */}
            {/* <button onClick={fetchRecipes}>SUBMIT</button> */}

            {/* <img src={newImage} style={{ width: "300px", height: "100%" }} /> */}
        </Layout>
    )
}
