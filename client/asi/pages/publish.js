import Head from 'next/head'
import { useState } from "react"
import Layout from "../components/layout"

export default function Publish() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [foodImage, setImage] = useState('')
    const [imgPath, setImgpath] = useState('')
    const [inputList, setInputList] = useState([" "])

    const updateImg = (e) => {
        setImage(e.target.files[0]);
        setImgpath(URL.createObjectURL(e.target.files[0]))
    }

    const updateList = () => {
        setInputList(inputList => [...inputList, " "])
    }

    const updateContentList = index => e => {
        let updatedArray = Array.from(inputList)
        updatedArray[index] = e.target.value
        setInputList(updatedArray)
    }

    const submitTest = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('author', author)
        formData.append('ingredients', JSON.stringify(inputList))
        formData.append('foodImg', foodImage)
        console.log(inputList)

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
                            Ready to publish </h1>
                        <p className="description">
                            share your recipe with others or family</p>
                    </main>
                    <img className="form-banner" src={imgPath} />
                    <form onSubmit={submitTest}>
                        <input onChange={e => updateImg(e)} name="foodImage" type="file" id= "files" />
                        {/* <label for="files">Choose an Image file</label> */}
                        <div className="input-item">
                            <label>Name of Food</label>
                            <input placeholder="Tacos al Pastor" onChange={e => setName(e.target.value)} name="name" type="text" />
                        </div>
                        <div className="input-item">
                            <label>Description</label>
                            <input placeholder="Tacos al Pastor are tacos made with spit-grilled pork" onChange={e => setDescription(e.target.value)} name="description" type="text" />
                        </div>
                        <div className="input-item">
                            <label>Category</label>
                            <div className="check-group">
                                <input type="checkbox" />
                                <label>Breakfast</label>
                                <input type="checkbox" />
                                <label>Lunch</label>
                                <input type="checkbox" />
                                <label>Dinner</label>
                                <input type="checkbox" />
                                <label>Brunch</label>
                            </div>
                        </div>

                        <div className="input-item">
                            <label>Author</label>
                            <input placeholder="Carlos Vela"  onChange={e => setAuthor(e.target.value)} name="author" type="text" />
                        </div>
                        <div className="input-item">
                            <label>Share As</label>
                            <div className="radio-pair">
                                <input type="radio" id="male" name="gender" value="male" />
                                <label htmlFor="male">Private</label>
                            </div>
                            <div className="radio-pair">
                                <input type="radio" id="female" name="gender" value="female" />
                                <label htmlFor="female">Public</label>
                            </div>
                        </div>
                        <div className="input-item">
                            <label>Ingredients</label>
                            {inputList
                                .map((val, index) => {
                                    return <input name="ingredient" type="text" key={index} placeholder="2 pounds of pork"
                                        onChange={
                                            updateContentList(index)
                                        }
                                    />
                                })}
                            <button type="button" className="add-btn" onClick={updateList}>+</button>
                        </div>
                        <button className="submit">submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
