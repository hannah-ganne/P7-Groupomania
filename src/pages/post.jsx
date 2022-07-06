import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Dropdown from '../components/Dropdown'
import dots from '../assets/dots.png'
import '../utils/style/post.css'
import image from '../assets/design.jpg'
import Button from '../components/Button'
import Comment from '../components/Comment'

export default function Read() {

    return (
        <section className="post">
            <small>HR | NEWS</small>
            <h1>Single Element Loaders: The Dots</h1>
            <div className="post-info-container">
                <div className="post-info">
                    <Avatar />
                    <p>by <span className="bold">Sarah</span> from <span className="bold">HR</span> on 22/06/22</p>
                </div>
                <img src={dots} className="dots" alt="three dots" />
            </div>
            <div className="post-contents">
                <img src={image} alt="main image of the post" />
                <p>
                We're looking at loaders in this series. More than that, we're breaking down some common loader patterns and how to re-create them with nothing more than a single div. So far, we've picked apart the classic spinning loader. Now, let's look at another one you're likely well aware of: the dots.
                Dot loaders are all over the place. They're neat because they usually consist of three dots that sort of look like a text ellipsis (…) that dances around.
                </p>
            </div>
            <div className="like">
                LIKE <span className="bold">5</span> | DISLIKE <span className='bold'>0</span>
            </div>
            <div className="comments">
                <div className="comment-input">
                    <Avatar />
                    <input type="text" placeholder='Leave a comment'></input>
                    <Button className="btn red" name="send" />
                </div>
                <Comment />
                <Comment />
                <Comment />
            </div>
        </section>
    )
}