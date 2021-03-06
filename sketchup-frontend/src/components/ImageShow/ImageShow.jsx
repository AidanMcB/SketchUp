import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { LikeButton } from './LikeButton'

export function ImageShow(props){
    let [ image, setImage ] = useState({})
    let history = useHistory()

    let params = useParams()
    // console.log(props)
    // console.log(params)
    let selectedImage = params.id 

    //return an empty array to prevent repeat requests
    useEffect(()=> {
        fetch(`http://localhost:3000/images/${selectedImage}`)
            .then( resp => resp.json())
            .then( image => setImage(image))
    }, [] )

    const handleDelete = () => {
        fetch(`http://localhost:3000/images/${selectedImage}`, {
            method: "DELETE"
        })
            .then( () => {
                history.push('/index')
            })
    }

    const handleLikes = (likes) => {
        console.log(likes)
        fetch(`http://localhost:3000/images/${selectedImage}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                likes: likes
            })
        })
      
    } 


    //check for undefined image AND undefined image.user
    if(image === undefined || image.user === undefined){
        image = {title: "default", url: "default", likes: 0, user: {username: "default", password: "default"}}
    }
    //hardcode the size of the containers and make the image fluid
    return (
        //  <div className="ui card" >
        // console.log(image.likes),    
        <div >
            <div className="content">
                <div className="header"></div>
            </div>
            <div className="content">
            <img alt='' class="ui avatar image" src='https://avatarfiles.alphacoders.com/916/91685.jpg'></img>
                <h2>{image.user.username}</h2>
                <div className='header' >
                    <p>{image.title}</p>
                    <img alt='' src={image.url}
                        class="ui big centered image"
                    />
                </div>
                {/* <button className="ui blue button" onClick={handleLikes}>Likes: {image.likes}</button> */}
                <LikeButton handleLikes={handleLikes} likes={image.likes}  />
            </div>
            <div className="content">
                <button className="ui red button" onClick={handleDelete}>Delete</button>
                {/* <button 
                onClick={() => history.push(`/edit/${image.id}`)}
                className="ui green button"
                >Edit</button> */}
                <button 
                onClick={() => history.push('/')}
                className='ui green button'
                >Home</button>
            </div>
        </div> 
    )
}


