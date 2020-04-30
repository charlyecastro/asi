import Head from 'next/head'
import { useState } from "react"
import Layout from "../components/layout"

export default function Publish() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [foodImage, setImage] = useState('')
    const [imgPath, setImgpath] = useState('')

    const updateImg = (e) => {
        setImage(e.target.files[0]);
        setImgpath(URL.createObjectURL(e.target.files[0]))

        // var reader = new FileReader();
        // var url = reader.readAsDataURL(foodImage);

        // reader.onloadend = (e) => {
        //     setImgpath([reader.result])
        // }
        // console.log(url)
    }

    const submitTest = (e) => {
        e.preventDefault()
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

            <div className="">
                <div className="form-container">
                    <main>

                        <h1 className="title">
                            Ready to publish
                </h1>


                        <p className="description">
                            share your recipe with others or family
                </p>
                    </main>

                    <img className="form-banner" src={imgPath} />
                    <form onSubmit={submitTest}>

                        <div>
                            <div />
                            {/* <label>Food Image</label> */}
                            <input onChange={e => updateImg(e)} name="foodImage" type="file" />
                        </div>



                        <div>
                            <label>Name of Food</label>
                            <input onChange={e => setName(e.target.value)} name="name" type="text" />
                        </div>

                        <div>
                            <label>Description</label>
                            <input onChange={e => setDescription(e.target.value)} name="description" type="text" />
                        </div>

                        <label>Category</label>
                        <div>
                            <label class="container">Breakfast
                        <input type="checkbox" />
                            </label>
                            <label class="container">Lunch
                        <input type="checkbox" />
                            </label>
                            <label class="container">Dinner
                        <input type="checkbox" />
                            </label>
                            <label class="container">Brunch
                        <input type="checkbox" />
                            </label>
                        </div>

                        <div>
                            <label>Author</label>
                            <input onChange={e => setAuthor(e.target.value)} name="author" type="text" />
                        </div>


                        <label>Share As</label>
                        <div className="radio-pair">
                            <input type="radio" id="male" name="gender" value="male" />
                            <label htmlFor="male">Private</label>
                        </div>
                        <div className="radio-pair">
                            <input type="radio" id="female" name="gender" value="female" />
                            <label htmlFor="female">Public</label>
                        </div>
                        <div>
                            <label>Ingredients</label>
                            <input name="ingredient" type="text" />
                            <button className="add-btn">+</button>
                        </div>


                        <button className="submit">SUBMIT</button>
                    </form>
                </div>
                {/* <button onClick={fetchRecipes}>SUBMIT</button> */}

                {/* <img src={newImage} style={{ width: "300px", height: "100%" }} /> */}
            </div>
        </Layout>
    )
}
